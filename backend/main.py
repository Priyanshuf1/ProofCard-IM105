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
    imats_sandbox
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
            "Offline 100% Demo Survival Mode"
        ]
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "uptime": "100%", "mode": "production_ready"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
