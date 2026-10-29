import base64
import json
import os
import hashlib
from typing import Dict, Any, Tuple

# Try importing cryptography for Ed25519; fallback to secure HMAC-SHA256 with server-managed secret
try:
    from cryptography.hazmat.primitives.asymmetric import ed25519
    from cryptography.hazmat.primitives import serialization
    HAS_CRYPTOGRAPHY = True
except ImportError:
    HAS_CRYPTOGRAPHY = False


class CryptoVerificationService:
    """
    Publicly Verifiable Credential Signer & Verifier.

    Architecture:
    - Asymmetric Digital Signatures (Ed25519) allow ANY third-party or employer
      to verify a candidate's Pariksha Card using the Authority's PUBLIC key.
    - The server's PRIVATE key is never exposed to clients, QR codes, or public verifiers.
    - If the cryptography library is unavailable in the environment, it uses a
      server-side secret key with an HMAC-SHA256 receipt, strictly keeping the secret on server.
    """

    _private_key = None
    _public_key = None
    _server_secret = os.environ.get("PARIKSHA_SIGNING_SECRET", "pariksha-internal-authority-key-v1").encode()

    @classmethod
    def initialize_keys(cls):
        """Initializes or loads the authority's Ed25519 keypair."""
        if HAS_CRYPTOGRAPHY and cls._private_key is None:
            # Generate an in-memory keypair for the authority instance
            # In production, this can be loaded from an environment variable or KMS
            cls._private_key = ed25519.Ed25519PrivateKey.generate()
            cls._public_key = cls._private_key.public_key()

    @classmethod
    def get_public_key_pem(cls) -> str:
        """Returns the public key in PEM format for independent verification."""
        cls.initialize_keys()
        if HAS_CRYPTOGRAPHY and cls._public_key:
            pem = cls._public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            )
            return pem.decode("utf-8")
        return "PARIKSHA-PUBLIC-KEY-ED25519-FALLBACK-V1"

    @classmethod
    def canonicalize_payload(cls, payload: Dict[str, Any]) -> bytes:
        """Deterministically encodes candidate proof metrics to prevent canonicalization attacks."""
        normalized = {
            "candidate_id": str(payload.get("candidate_id", "")),
            "authenticity_score": int(payload.get("authenticity_score", 0)),
            "viva_score": float(payload.get("viva_score", 0.0)),
            "verified_skills": sorted(payload.get("verified_skills", [])),
            "issuer": "Pariksha Authority (IM-105)",
            "timestamp": payload.get("timestamp", "2026-10-29T00:00:00Z")
        }
        return json.dumps(normalized, sort_keys=True, separators=(",", ":")).encode("utf-8")

    @classmethod
    def sign_pariksha_card(cls, payload: Dict[str, Any]) -> Dict[str, Any]:
        """
        Digitally signs the candidate's Pariksha Card.
        Returns the signature, algorithm, and verification metadata.
        """
        cls.initialize_keys()
        canonical_bytes = cls.canonicalize_payload(payload)

        if HAS_CRYPTOGRAPHY and cls._private_key:
            signature = cls._private_key.sign(canonical_bytes)
            sig_b64 = base64.b64encode(signature).decode("utf-8")
            return {
                "algorithm": "Ed25519",
                "signature": sig_b64,
                "payload_digest": f"SHA256:{hashlib.sha256(canonical_bytes).hexdigest()}",
                "public_key_pem": cls.get_public_key_pem(),
                "verifiable_offline": True,
                "verification_protocol": "W3C-Compatible Ed25519 Digital Signature"
            }
        else:
            # Fallback to server-managed HMAC-SHA256
            import hmac
            sig = hmac.new(cls._server_secret, canonical_bytes, hashlib.sha256).hexdigest()
            return {
                "algorithm": "HMAC-SHA256-ServerVerified",
                "signature": f"HMAC:{sig}",
                "payload_digest": f"SHA256:{hashlib.sha256(canonical_bytes).hexdigest()}",
                "public_key_pem": "Verify via GET /api/proofcard/verify-signature",
                "verifiable_offline": False,
                "verification_protocol": "Server-Protected HMAC Receipt"
            }

    @classmethod
    def verify_signature(cls, payload: Dict[str, Any], signature_b64: str) -> bool:
        """
        Independently verifies a signature against the payload using the public key.
        The server private key is NOT required or involved in verification.
        """
        cls.initialize_keys()
        canonical_bytes = cls.canonicalize_payload(payload)

        if HAS_CRYPTOGRAPHY and cls._public_key:
            try:
                sig_bytes = base64.b64decode(signature_b64)
                cls._public_key.verify(sig_bytes, canonical_bytes)
                return True
            except Exception:
                return False
        else:
            import hmac
            clean_sig = signature_b64.replace("HMAC:", "").strip()
            expected = hmac.new(cls._server_secret, canonical_bytes, hashlib.sha256).hexdigest()
            return hmac.compare_digest(expected, clean_sig)
