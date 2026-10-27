import sys

# Prevent Windows ProactorEventLoop from terminating the server socket on client disconnects (WinError 64 / 10054)
if sys.platform == "win32":
    import asyncio
    from asyncio.proactor_events import BaseProactorEventLoop, logger
    import asyncio.trsock as trsock
    import asyncio.exceptions as exceptions

    def _patched_start_serving(self, protocol_factory, sock,
                               sslcontext=None, server=None, backlog=100,
                               ssl_handshake_timeout=None,
                               ssl_shutdown_timeout=None):
        def loop(f=None):
            try:
                if f is not None:
                    conn, addr = f.result()
                    if self._debug:
                        logger.debug("%r got a new connection from %r: %r",
                                     server, addr, conn)
                    protocol = protocol_factory()
                    if sslcontext is not None:
                        self._make_ssl_transport(
                            conn, protocol, sslcontext, server_side=True,
                            extra={'peername': addr}, server=server,
                            ssl_handshake_timeout=ssl_handshake_timeout,
                            ssl_shutdown_timeout=ssl_shutdown_timeout)
                    else:
                        self._make_socket_transport(
                            conn, protocol,
                            extra={'peername': addr}, server=server)
                if self.is_closed():
                    return
                f = self._proactor.accept(sock)
            except OSError as exc:
                if getattr(exc, 'winerror', None) in (64, 121, 10053, 10054):
                    if sock.fileno() != -1 and not self.is_closed():
                        try:
                            new_f = self._proactor.accept(sock)
                            self._accept_futures[sock.fileno()] = new_f
                            new_f.add_done_callback(loop)
                        except Exception:
                            pass
                    return
                if sock.fileno() != -1:
                    self.call_exception_handler({
                        'message': 'Accept failed on a socket',
                        'exception': exc,
                        'socket': trsock.TransportSocket(sock),
                    })
                    sock.close()
                elif self._debug:
                    logger.debug("Accept failed on socket %r",
                                 sock, exc_info=True)
            except exceptions.CancelledError:
                sock.close()
            else:
                self._accept_futures[sock.fileno()] = f
                f.add_done_callback(loop)

        self.call_soon(loop)

    BaseProactorEventLoop._start_serving = _patched_start_serving

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import (
    zip_upload,
    github_analysis,
    recruiter_battle,
    viva,
    bias_mirror,
    proofcard,
    batch_operations,
    imats_sandbox,
    readiness,
    deployment
)

app = FastAPI(
    title="ProofCard API — Deviathon 2.0 (Integraminds IM-105)",
    description=(
        "Next-generation talent verification platform: forensic AST parsing, "
        "Winnowing YouTube tutorial clone detection, temporal Git-DNA analysis, "
        "dynamic code viva, and recruiter bias mirror."
    ),
    version="2.0.0"
)

# Enable CORS for seamless local frontend dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all routers
app.include_router(zip_upload.router)
app.include_router(github_analysis.router)
app.include_router(recruiter_battle.router)
app.include_router(viva.router)
app.include_router(bias_mirror.router)
app.include_router(proofcard.router)
app.include_router(batch_operations.router)
app.include_router(batch_operations.imats_router)
app.include_router(imats_sandbox.router)
app.include_router(readiness.router)
app.include_router(deployment.router)

@app.get("/")
def root():
    return {
        "project": "ProofCard",
        "competition": "Deviathon 2.0",
        "problem_statement": "IM-105 (Integraminds)",
        "tagline": "Proof of skill, not a template resume",
        "status": "online",
        "docs_url": "/docs",
        "modules": [
            "Local ZIP & GitHub Ingestion",
            "AST Structural & Radon Complexity",
            "Winnowing Tutorial Clone Detection (20 templates)",
            "Git-DNA Temporal Forensics",
            "Dynamic Code Viva & Conceptual Scorer",
            "Recruiter JD Battle Matrix",
            "Recruiter Bias Mirror & Equal Opportunity Audit",
            "Deployment Readiness Contract",
            "Offline 100% Demo Survival Mode"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "uptime": "100%", "mode": "production_ready"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
