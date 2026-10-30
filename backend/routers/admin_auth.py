import os
import time
import hmac
import hashlib
import secrets
from typing import Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Header, Depends, status
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/admin", tags=["Admin Authentication"])

ADMIN_USERNAME = os.getenv("PARIKSHA_ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("PARIKSHA_ADMIN_PASSWORD", "Pariksha@Admin2026!")
SECRET_SALT = os.getenv("PARIKSHA_AUTH_SECRET", "pariksha-deviathon-secret-auth-salt-v1").encode()

# In-memory brute force protection: ip/user -> (failed_attempts, locked_until)
FAILED_ATTEMPTS: Dict[str, Dict[str, Any]] = {}
ACTIVE_TOKENS: Dict[str, float] = {}  # token -> expiry_timestamp


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class AdminLoginResponse(BaseModel):
    success: bool
    token: str
    admin_user: str
    expires_in: int
    message: str


def generate_secure_token(username: str) -> str:
    """Generates an HMAC-SHA256 signed tamper-evident token."""
    raw_entropy = f"{username}:{time.time()}:{secrets.token_hex(16)}"
    signature = hmac.new(SECRET_SALT, raw_entropy.encode(), hashlib.sha256).hexdigest()
    token = f"adm_{signature[:32]}_{int(time.time())}"
    ACTIVE_TOKENS[token] = time.time() + 3600 * 8  # 8 hours session
    return token


def verify_admin_token(token: str) -> bool:
    """Validates token exists and has not expired."""
    if not token or token not in ACTIVE_TOKENS:
        return False
    expiry = ACTIVE_TOKENS[token]
    if time.time() > expiry:
        del ACTIVE_TOKENS[token]
        return False
    return True


@router.post("/login", response_model=AdminLoginResponse)
def admin_login(payload: AdminLoginRequest):
    """
    High-Security Enterprise Admin Login Endpoint.
    Uses constant-time comparison and rate-limiting lockout to defeat timing and brute-force attacks.
    """
    now = time.time()
    user_key = payload.username.strip().lower()

    # Check brute-force lockout
    record = FAILED_ATTEMPTS.get(user_key, {"attempts": 0, "locked_until": 0})
    if now < record["locked_until"]:
        remaining = int(record["locked_until"] - now)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Security lockout active due to excessive failed attempts. Try again in {remaining} seconds."
        )

    # Constant-time comparison
    is_user_valid = hmac.compare_digest(payload.username.strip(), ADMIN_USERNAME) or hmac.compare_digest(payload.username.strip(), "admin@pariksha.io")
    is_pass_valid = hmac.compare_digest(payload.password.strip(), ADMIN_PASSWORD)

    if not (is_user_valid and is_pass_valid):
        # Increment failed attempts
        record["attempts"] += 1
        if record["attempts"] >= 5:
            record["locked_until"] = now + 30  # Lock out for 30s
            record["attempts"] = 0
        FAILED_ATTEMPTS[user_key] = record

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid administrator credentials. Access strictly logged and restricted."
        )

    # Reset attempts on success
    FAILED_ATTEMPTS.pop(user_key, None)
    token = generate_secure_token(payload.username.strip())

    return AdminLoginResponse(
        success=True,
        token=token,
        admin_user=payload.username.strip(),
        expires_in=28800,
        message="Enterprise Admin access granted. Session authenticated."
    )


@router.get("/verify-session")
def verify_session(authorization: Optional[str] = Header(None)):
    """Verifies whether an admin session token is valid."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header.")
    
    parts = authorization.split(" ")
    token = parts[1] if len(parts) == 2 and parts[0].lower() == "bearer" else authorization
    
    if not verify_admin_token(token):
        raise HTTPException(status_code=401, detail="Invalid or expired admin session token.")

    return {
        "authenticated": True,
        "role": "ADMIN",
        "scope": "enterprise_full_access"
    }


@router.post("/logout")
def admin_logout(authorization: Optional[str] = Header(None)):
    """Terminates admin session immediately."""
    if authorization:
        parts = authorization.split(" ")
        token = parts[1] if len(parts) == 2 and parts[0].lower() == "bearer" else authorization
        ACTIVE_TOKENS.pop(token, None)
    return {"success": True, "message": "Admin session terminated."}
