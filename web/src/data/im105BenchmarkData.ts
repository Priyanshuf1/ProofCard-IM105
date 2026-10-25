// IM-105 Benchmark Dataset: 400 Anonymised Freshers & 30 Job Descriptions
import { CandidateProfile } from '../types';

export const IM105_COHORT_400: CandidateProfile[] = [
  {
    "candidate_id": "cand_fresher_001",
    "name": "Priyanshu Awasthi & Team",
    "anonymised_name": "Fresher #001 \u00b7 Priyanshu Awasthi & Team",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-001/data-core",
    "project_type": "Data Engineering & Telemetry / Fullstack AI",
    "primary_language": "Go",
    "verified_skills": [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "scikit-learn",
      "Docker"
    ],
    "total_loc": 21526,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 96,
      "problem_solving_score": 94,
      "composite_assessment": 95
    },
    "git_dna": {
      "total_commits": 157,
      "time_span_days": 32,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 8,
      "authenticity_score": 96,
      "summary": "157 commits across 32 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/python_module.ts",
      "src/fastapi_module.ts",
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 157 organic commits over 32 days with 38% refactoring ratio. Outstanding viva defense: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_001_fa95729080c9"
    }
  },
  {
    "candidate_id": "cand_fresher_002",
    "name": "Mohit Gupta",
    "anonymised_name": "Fresher Candidate #002 (M. Gupta)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-002/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 5149,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_2",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 51,
      "aptitude_score": 74,
      "problem_solving_score": 50,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "2 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 80% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_002_c04b3841d2e1"
    }
  },
  {
    "candidate_id": "cand_fresher_003",
    "name": "Shreya Patel",
    "anonymised_name": "Fresher Candidate #003 (S. Patel)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-003/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 20718,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_3",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 69,
      "problem_solving_score": 51,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.86,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 26,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "1 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 65% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_003_ba0cd8823e20"
    }
  },
  {
    "candidate_id": "cand_fresher_004",
    "name": "Ananya Awasthi",
    "anonymised_name": "Fresher Candidate #004 (A. Awasthi)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-004/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 32492,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 78,
      "problem_solving_score": 92,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 99,
      "time_span_days": 72,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 6,
      "authenticity_score": 79,
      "summary": "99 commits across 72 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 99 organic commits over 72 days with 27% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_004_a509f0321a06"
    }
  },
  {
    "candidate_id": "cand_fresher_005",
    "name": "Swati Trivedi",
    "anonymised_name": "Fresher Candidate #005 (S. Trivedi)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-005/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 10573,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 80,
      "problem_solving_score": 82,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 84,
      "time_span_days": 55,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 3,
      "authenticity_score": 84,
      "summary": "84 commits across 55 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 84 organic commits over 55 days with 37% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_005_b64f8952b265"
    }
  },
  {
    "candidate_id": "cand_fresher_006",
    "name": "Rahul Tripathi",
    "anonymised_name": "Fresher Candidate #006 (R. Tripathi)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-006/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 14887,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 83,
      "problem_solving_score": 88,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 64,
      "time_span_days": 47,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 14,
      "authenticity_score": 88,
      "summary": "64 commits across 47 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 64 organic commits over 47 days with 36% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_006_14cd8f8f1f18"
    }
  },
  {
    "candidate_id": "cand_fresher_007",
    "name": "Meera Singh",
    "anonymised_name": "Fresher Candidate #007 (M. Singh)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-007/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 24091,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 87,
      "problem_solving_score": 70,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 136,
      "time_span_days": 90,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 11,
      "authenticity_score": 80,
      "summary": "136 commits across 90 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 136 organic commits over 90 days with 27% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_007_2109670af0c8"
    }
  },
  {
    "candidate_id": "cand_fresher_008",
    "name": "Deepika Chatterjee",
    "anonymised_name": "Fresher Candidate #008 (D. Chatterjee)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-008/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 29379,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_8",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 48,
      "aptitude_score": 70,
      "problem_solving_score": 49,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 3 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 74% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_008_0da558848553"
    }
  },
  {
    "candidate_id": "cand_fresher_009",
    "name": "Akanksha Banerjee",
    "anonymised_name": "Fresher Candidate #009 (A. Banerjee)",
    "college": "IIT Roorkee",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-009/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 30570,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 71,
      "problem_solving_score": 77,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 181,
      "time_span_days": 55,
      "burst_ratio": 0.4,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 7,
      "authenticity_score": 92,
      "summary": "181 commits across 55 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 181 organic commits over 55 days with 21% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_009_38dd634d32de"
    }
  },
  {
    "candidate_id": "cand_fresher_010",
    "name": "Vikram Verma",
    "anonymised_name": "Fresher Candidate #010 (V. Verma)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-010/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 24405,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 94,
      "problem_solving_score": 93,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 168,
      "time_span_days": 35,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 6,
      "authenticity_score": 80,
      "summary": "168 commits across 35 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 168 organic commits over 35 days with 39% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_010_f8722aa8539c"
    }
  },
  {
    "candidate_id": "cand_fresher_011",
    "name": "Varun Joshi",
    "anonymised_name": "Fresher Candidate #011 (V. Joshi)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-011/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 24994,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 70,
      "problem_solving_score": 72,
      "composite_assessment": 74
    },
    "git_dna": {
      "total_commits": 91,
      "time_span_days": 42,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 12,
      "authenticity_score": 90,
      "summary": "91 commits across 42 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 91 organic commits over 42 days with 19% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_011_3417a31d3008"
    }
  },
  {
    "candidate_id": "cand_fresher_012",
    "name": "Meera Verma",
    "anonymised_name": "Fresher Candidate #012 (M. Verma)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-012/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 28260,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 95,
      "problem_solving_score": 85,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 82,
      "time_span_days": 83,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 10,
      "authenticity_score": 84,
      "summary": "82 commits across 83 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 82 organic commits over 83 days with 40% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_012_5dd900457856"
    }
  },
  {
    "candidate_id": "cand_fresher_013",
    "name": "Kavya Patel",
    "anonymised_name": "Fresher Candidate #013 (K. Patel)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-013/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 16500,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 76,
      "problem_solving_score": 87,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 53,
      "time_span_days": 21,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 6,
      "authenticity_score": 90,
      "summary": "53 commits across 21 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 53 organic commits over 21 days with 26% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_013_150c68622651"
    }
  },
  {
    "candidate_id": "cand_fresher_014",
    "name": "Nikhil Kumar",
    "anonymised_name": "Fresher Candidate #014 (N. Kumar)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-014/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 17573,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 77,
      "aptitude_score": 83,
      "problem_solving_score": 85,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 40,
      "time_span_days": 83,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 6,
      "authenticity_score": 93,
      "summary": "40 commits across 83 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 40 organic commits over 83 days with 41% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_014_a07bfa5cdf7f"
    }
  },
  {
    "candidate_id": "cand_fresher_015",
    "name": "Kunal Awasthi",
    "anonymised_name": "Fresher Candidate #015 (K. Awasthi)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-015/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 19566,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_15",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 68,
      "problem_solving_score": 63,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 21,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "4 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 79% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_015_f16b3620e25c"
    }
  },
  {
    "candidate_id": "cand_fresher_016",
    "name": "Isha Awasthi",
    "anonymised_name": "Fresher Candidate #016 (I. Awasthi)",
    "college": "IIIT Hyderabad",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-016/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 32654,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 82,
      "problem_solving_score": 73,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 42,
      "time_span_days": 79,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 13,
      "authenticity_score": 92,
      "summary": "42 commits across 79 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 42 organic commits over 79 days with 22% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_016_c15e39d44948"
    }
  },
  {
    "candidate_id": "cand_fresher_017",
    "name": "Siddharth Tripathi",
    "anonymised_name": "Fresher Candidate #017 (S. Tripathi)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-017/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 23809,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 82,
      "problem_solving_score": 74,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 161,
      "time_span_days": 54,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 6,
      "authenticity_score": 94,
      "summary": "161 commits across 54 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 161 organic commits over 54 days with 23% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_017_f350dd66ec34"
    }
  },
  {
    "candidate_id": "cand_fresher_018",
    "name": "Amit Mehta",
    "anonymised_name": "Fresher Candidate #018 (A. Mehta)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-018/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 6969,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 81,
      "problem_solving_score": 79,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 46,
      "time_span_days": 82,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 4,
      "authenticity_score": 94,
      "summary": "46 commits across 82 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 46 organic commits over 82 days with 24% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_018_e221f90b3e50"
    }
  },
  {
    "candidate_id": "cand_fresher_019",
    "name": "Deepika Chawla",
    "anonymised_name": "Fresher Candidate #019 (D. Chawla)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-019/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 8701,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 79,
      "problem_solving_score": 89,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 54,
      "time_span_days": 31,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 5,
      "authenticity_score": 93,
      "summary": "54 commits across 31 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 54 organic commits over 31 days with 39% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_019_8186806ae120"
    }
  },
  {
    "candidate_id": "cand_fresher_020",
    "name": "Rahul Deshmukh",
    "anonymised_name": "Fresher Candidate #020 (R. Deshmukh)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-020/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 16278,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 75,
      "problem_solving_score": 93,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 136,
      "time_span_days": 49,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 0,
      "authenticity_score": 77,
      "summary": "136 commits across 49 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 136 organic commits over 49 days with 26% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_020_0786a59d261d"
    }
  },
  {
    "candidate_id": "cand_fresher_021",
    "name": "Nikhil Kapoor",
    "anonymised_name": "Fresher Candidate #021 (N. Kapoor)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-021/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 9976,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 76,
      "problem_solving_score": 91,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 169,
      "time_span_days": 32,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 3,
      "authenticity_score": 87,
      "summary": "169 commits across 32 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 169 organic commits over 32 days with 19% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_021_a3acce7620a3"
    }
  },
  {
    "candidate_id": "cand_fresher_022",
    "name": "Divya Kapoor",
    "anonymised_name": "Fresher Candidate #022 (D. Kapoor)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-022/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 28366,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 91,
      "problem_solving_score": 93,
      "composite_assessment": 94
    },
    "git_dna": {
      "total_commits": 73,
      "time_span_days": 66,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 9,
      "authenticity_score": 83,
      "summary": "73 commits across 66 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 73 organic commits over 66 days with 36% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_022_a8c0fd3e5291"
    }
  },
  {
    "candidate_id": "cand_fresher_023",
    "name": "Aditya Kumar",
    "anonymised_name": "Fresher Candidate #023 (A. Kumar)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-023/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 14856,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 91,
      "problem_solving_score": 76,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 79,
      "time_span_days": 72,
      "burst_ratio": 0.35,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 6,
      "authenticity_score": 91,
      "summary": "79 commits across 72 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 79 organic commits over 72 days with 38% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_023_df23c08f1878"
    }
  },
  {
    "candidate_id": "cand_fresher_024",
    "name": "Aditya Verma",
    "anonymised_name": "Fresher Candidate #024 (A. Verma)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-024/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 16039,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 73,
      "problem_solving_score": 89,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 112,
      "time_span_days": 17,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 7,
      "authenticity_score": 88,
      "summary": "112 commits across 17 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 112 organic commits over 17 days with 41% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_024_375cae4e3f65"
    }
  },
  {
    "candidate_id": "cand_fresher_025",
    "name": "Isha Bhatia",
    "anonymised_name": "Fresher Candidate #025 (I. Bhatia)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-025/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 25951,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 93,
      "problem_solving_score": 93,
      "composite_assessment": 93
    },
    "git_dna": {
      "total_commits": 93,
      "time_span_days": 19,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.18,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 11,
      "authenticity_score": 94,
      "summary": "93 commits across 19 days. Refactor ratio: 18%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 93 organic commits over 19 days with 18% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_025_ca2f1e8eee1e"
    }
  },
  {
    "candidate_id": "cand_fresher_026",
    "name": "Gaurav Bhatia",
    "anonymised_name": "Fresher Candidate #026 (G. Bhatia)",
    "college": "IIT Roorkee",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-026/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 23588,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 76,
      "problem_solving_score": 83,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 157,
      "time_span_days": 53,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 11,
      "authenticity_score": 79,
      "summary": "157 commits across 53 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 157 organic commits over 53 days with 26% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_026_b7910cf6bc72"
    }
  },
  {
    "candidate_id": "cand_fresher_027",
    "name": "Arjun Banerjee",
    "anonymised_name": "Fresher Candidate #027 (A. Banerjee)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-027/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 18550,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 91,
      "problem_solving_score": 76,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 81,
      "time_span_days": 69,
      "burst_ratio": 0.49,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 10,
      "authenticity_score": 85,
      "summary": "81 commits across 69 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 81 organic commits over 69 days with 33% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_027_5ff2cea60dd1"
    }
  },
  {
    "candidate_id": "cand_fresher_028",
    "name": "Pooja Deshmukh",
    "anonymised_name": "Fresher Candidate #028 (P. Deshmukh)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-028/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 15380,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 72,
      "problem_solving_score": 84,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 85,
      "time_span_days": 39,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 12,
      "authenticity_score": 83,
      "summary": "85 commits across 39 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 85 organic commits over 39 days with 19% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_028_bf97b1b1af42"
    }
  },
  {
    "candidate_id": "cand_fresher_029",
    "name": "Kavya Chawla",
    "anonymised_name": "Fresher Candidate #029 (K. Chawla)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-029/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 3445,
    "authenticity_score": 34,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_29",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.66,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 67,
      "aptitude_score": 66,
      "problem_solving_score": 54,
      "composite_assessment": 63
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 37,
      "test_files_detected": 0,
      "authenticity_score": 34,
      "summary": "1 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (34% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 66% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_029_6a93c929ceab"
    }
  },
  {
    "candidate_id": "cand_fresher_030",
    "name": "Siddharth Patel",
    "anonymised_name": "Fresher Candidate #030 (S. Patel)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-030/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 16547,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 97,
      "problem_solving_score": 85,
      "composite_assessment": 93
    },
    "git_dna": {
      "total_commits": 141,
      "time_span_days": 78,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 5,
      "authenticity_score": 95,
      "summary": "141 commits across 78 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 141 organic commits over 78 days with 40% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_030_ef3e00dcbddb"
    }
  },
  {
    "candidate_id": "cand_fresher_031",
    "name": "Siddharth Trivedi",
    "anonymised_name": "Fresher Candidate #031 (S. Trivedi)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-031/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 14351,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 74,
      "problem_solving_score": 77,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 47,
      "time_span_days": 50,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 4,
      "authenticity_score": 84,
      "summary": "47 commits across 50 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 47 organic commits over 50 days with 26% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_031_91364d110527"
    }
  },
  {
    "candidate_id": "cand_fresher_032",
    "name": "Rahul Verma",
    "anonymised_name": "Fresher Candidate #032 (R. Verma)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-032/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 32691,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 85,
      "problem_solving_score": 70,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 135,
      "time_span_days": 63,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 12,
      "authenticity_score": 77,
      "summary": "135 commits across 63 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 135 organic commits over 63 days with 32% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_032_4a0b26b27d07"
    }
  },
  {
    "candidate_id": "cand_fresher_033",
    "name": "Varun Joshi",
    "anonymised_name": "Fresher Candidate #033 (V. Joshi)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-033/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 27953,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 91,
      "problem_solving_score": 91,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 84,
      "time_span_days": 76,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 0,
      "authenticity_score": 93,
      "summary": "84 commits across 76 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 84 organic commits over 76 days with 28% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_033_a4b93d1ee85d"
    }
  },
  {
    "candidate_id": "cand_fresher_034",
    "name": "Pooja Reddy",
    "anonymised_name": "Fresher Candidate #034 (P. Reddy)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-034/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 10324,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_34",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 55,
      "problem_solving_score": 41,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "1 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 70% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_034_8db40f242607"
    }
  },
  {
    "candidate_id": "cand_fresher_035",
    "name": "Isha Gupta",
    "anonymised_name": "Fresher Candidate #035 (I. Gupta)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-035/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 4048,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_35",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 56,
      "aptitude_score": 57,
      "problem_solving_score": 60,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 44,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "4 commits across 1 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 80% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_035_89d149d05778"
    }
  },
  {
    "candidate_id": "cand_fresher_036",
    "name": "Aditi Sharma",
    "anonymised_name": "Fresher Candidate #036 (A. Sharma)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-036/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 33379,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 77,
      "aptitude_score": 89,
      "problem_solving_score": 89,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 149,
      "time_span_days": 28,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 8,
      "authenticity_score": 83,
      "summary": "149 commits across 28 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 149 organic commits over 28 days with 23% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_036_d2ffb4996c4c"
    }
  },
  {
    "candidate_id": "cand_fresher_037",
    "name": "Pooja Mishra",
    "anonymised_name": "Fresher Candidate #037 (P. Mishra)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-037/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 21474,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 79,
      "problem_solving_score": 91,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 78,
      "time_span_days": 23,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 14,
      "authenticity_score": 88,
      "summary": "78 commits across 23 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 78 organic commits over 23 days with 38% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_037_64df9c8151dd"
    }
  },
  {
    "candidate_id": "cand_fresher_038",
    "name": "Aayushi Awasthi",
    "anonymised_name": "Fresher Candidate #038 (A. Awasthi)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-038/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 6813,
    "authenticity_score": 22,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_38",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.78,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 64,
      "problem_solving_score": 62,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.86,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 33,
      "test_files_detected": 0,
      "authenticity_score": 22,
      "summary": "4 commits across 2 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (22% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 78% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_038_be595ac5ee3a"
    }
  },
  {
    "candidate_id": "cand_fresher_039",
    "name": "Arjun Pandey",
    "anonymised_name": "Fresher Candidate #039 (A. Pandey)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-039/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 10939,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 99,
      "problem_solving_score": 72,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 147,
      "time_span_days": 69,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 6,
      "authenticity_score": 93,
      "summary": "147 commits across 69 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 147 organic commits over 69 days with 32% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_039_18e93643b7ce"
    }
  },
  {
    "candidate_id": "cand_fresher_040",
    "name": "Siddharth Reddy",
    "anonymised_name": "Fresher Candidate #040 (S. Reddy)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-040/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 20012,
    "authenticity_score": 17,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_40",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.83,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 72,
      "problem_solving_score": 48,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 17,
      "summary": "2 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (17% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 83% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_040_6133210c9cf8"
    }
  },
  {
    "candidate_id": "cand_fresher_041",
    "name": "Abhishek Gupta",
    "anonymised_name": "Fresher Candidate #041 (A. Gupta)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-041/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 20856,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 79,
      "problem_solving_score": 91,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 153,
      "time_span_days": 71,
      "burst_ratio": 0.49,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 14,
      "authenticity_score": 83,
      "summary": "153 commits across 71 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 153 organic commits over 71 days with 20% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_041_f6b536a11b5a"
    }
  },
  {
    "candidate_id": "cand_fresher_042",
    "name": "Ritika Kapoor",
    "anonymised_name": "Fresher Candidate #042 (R. Kapoor)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-042/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 24415,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 87,
      "problem_solving_score": 94,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 97,
      "time_span_days": 53,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 4,
      "authenticity_score": 98,
      "summary": "97 commits across 53 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 97 organic commits over 53 days with 21% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_042_70dfcf585bd5"
    }
  },
  {
    "candidate_id": "cand_fresher_043",
    "name": "Kavya Gupta",
    "anonymised_name": "Fresher Candidate #043 (K. Gupta)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-043/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 5947,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 92,
      "problem_solving_score": 87,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 100,
      "time_span_days": 26,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.25,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 7,
      "authenticity_score": 92,
      "summary": "100 commits across 26 days. Refactor ratio: 25%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 100 organic commits over 26 days with 25% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_043_0e8d3881b6c4"
    }
  },
  {
    "candidate_id": "cand_fresher_044",
    "name": "Aditi Awasthi",
    "anonymised_name": "Fresher Candidate #044 (A. Awasthi)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-044/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 5538,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_44",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 58,
      "problem_solving_score": 55,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "4 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 70% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_044_444d4401f9ad"
    }
  },
  {
    "candidate_id": "cand_fresher_045",
    "name": "Kunal Nair",
    "anonymised_name": "Fresher Candidate #045 (K. Nair)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-045/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 9195,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_45",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 75,
      "problem_solving_score": 59,
      "composite_assessment": 66
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 44,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "2 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 79% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_045_3233fab39b55"
    }
  },
  {
    "candidate_id": "cand_fresher_046",
    "name": "Abhishek Joshi",
    "anonymised_name": "Fresher Candidate #046 (A. Joshi)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-046/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 23440,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 92,
      "aptitude_score": 76,
      "problem_solving_score": 78,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 173,
      "time_span_days": 21,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 6,
      "authenticity_score": 89,
      "summary": "173 commits across 21 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 173 organic commits over 21 days with 36% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_046_15662aa0e895"
    }
  },
  {
    "candidate_id": "cand_fresher_047",
    "name": "Pooja Malhotra",
    "anonymised_name": "Fresher Candidate #047 (P. Malhotra)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-047/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 4132,
    "authenticity_score": 34,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_47",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.66,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 54,
      "aptitude_score": 72,
      "problem_solving_score": 54,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.85,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 34,
      "summary": "4 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (34% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 66% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_047_faa4542e212c"
    }
  },
  {
    "candidate_id": "cand_fresher_048",
    "name": "Meera Chatterjee",
    "anonymised_name": "Fresher Candidate #048 (M. Chatterjee)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-048/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 20451,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 93,
      "problem_solving_score": 96,
      "composite_assessment": 93
    },
    "git_dna": {
      "total_commits": 66,
      "time_span_days": 48,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 7,
      "authenticity_score": 93,
      "summary": "66 commits across 48 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 66 organic commits over 48 days with 20% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_048_9aaf622859b5"
    }
  },
  {
    "candidate_id": "cand_fresher_049",
    "name": "Simran Patel",
    "anonymised_name": "Fresher Candidate #049 (S. Patel)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-049/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 4792,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 78,
      "problem_solving_score": 70,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 154,
      "time_span_days": 70,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 8,
      "authenticity_score": 92,
      "summary": "154 commits across 70 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 154 organic commits over 70 days with 19% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_049_480a951a1015"
    }
  },
  {
    "candidate_id": "cand_fresher_050",
    "name": "Aayushi Tripathi",
    "anonymised_name": "Fresher Candidate #050 (A. Tripathi)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-050/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 17201,
    "authenticity_score": 27,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_50",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.73,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 65,
      "problem_solving_score": 42,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 31,
      "test_files_detected": 0,
      "authenticity_score": 27,
      "summary": "4 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (27% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 73% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_050_b52e61bdcc0b"
    }
  },
  {
    "candidate_id": "cand_fresher_051",
    "name": "Anushka Mehta",
    "anonymised_name": "Fresher Candidate #051 (A. Mehta)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-051/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 33591,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 80,
      "problem_solving_score": 73,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 101,
      "time_span_days": 65,
      "burst_ratio": 0.49,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 8,
      "authenticity_score": 98,
      "summary": "101 commits across 65 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 101 organic commits over 65 days with 31% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_051_33e389256ff1"
    }
  },
  {
    "candidate_id": "cand_fresher_052",
    "name": "Akanksha Sharma",
    "anonymised_name": "Fresher Candidate #052 (A. Sharma)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-052/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 16156,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 99,
      "problem_solving_score": 79,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 120,
      "time_span_days": 77,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 11,
      "authenticity_score": 82,
      "summary": "120 commits across 77 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 120 organic commits over 77 days with 36% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_052_4b0a31ada516"
    }
  },
  {
    "candidate_id": "cand_fresher_053",
    "name": "Karan Sharma",
    "anonymised_name": "Fresher Candidate #053 (K. Sharma)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-053/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 29067,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 73,
      "problem_solving_score": 90,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 31,
      "time_span_days": 84,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 4,
      "authenticity_score": 85,
      "summary": "31 commits across 84 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 31 organic commits over 84 days with 23% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_053_93d99cd51a9f"
    }
  },
  {
    "candidate_id": "cand_fresher_054",
    "name": "Sameer Chawla",
    "anonymised_name": "Fresher Candidate #054 (S. Chawla)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-054/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 10852,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 97,
      "problem_solving_score": 72,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 144,
      "time_span_days": 84,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 14,
      "authenticity_score": 91,
      "summary": "144 commits across 84 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 144 organic commits over 84 days with 23% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_054_483505eb88c5"
    }
  },
  {
    "candidate_id": "cand_fresher_055",
    "name": "Manish Saxena",
    "anonymised_name": "Fresher Candidate #055 (M. Saxena)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-055/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 30295,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 84,
      "problem_solving_score": 80,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 153,
      "time_span_days": 33,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 11,
      "authenticity_score": 94,
      "summary": "153 commits across 33 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 153 organic commits over 33 days with 30% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_055_63b0c479691f"
    }
  },
  {
    "candidate_id": "cand_fresher_056",
    "name": "Siddharth Tripathi",
    "anonymised_name": "Fresher Candidate #056 (S. Tripathi)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-056/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 30445,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 97,
      "problem_solving_score": 73,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 126,
      "time_span_days": 33,
      "burst_ratio": 0.4,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 12,
      "authenticity_score": 91,
      "summary": "126 commits across 33 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 126 organic commits over 33 days with 19% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_056_cf2931b3b4e2"
    }
  },
  {
    "candidate_id": "cand_fresher_057",
    "name": "Sneha Saxena",
    "anonymised_name": "Fresher Candidate #057 (S. Saxena)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-057/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 29729,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 92,
      "aptitude_score": 72,
      "problem_solving_score": 80,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 47,
      "time_span_days": 74,
      "burst_ratio": 0.48,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 9,
      "authenticity_score": 96,
      "summary": "47 commits across 74 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 47 organic commits over 74 days with 24% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_057_e947ad612880"
    }
  },
  {
    "candidate_id": "cand_fresher_058",
    "name": "Shreya Mehta",
    "anonymised_name": "Fresher Candidate #058 (S. Mehta)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-058/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 24865,
    "authenticity_score": 19,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_58",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.81,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 48,
      "aptitude_score": 74,
      "problem_solving_score": 60,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 23,
      "test_files_detected": 0,
      "authenticity_score": 19,
      "summary": "3 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (19% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 81% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_058_cb0ba6c81abf"
    }
  },
  {
    "candidate_id": "cand_fresher_059",
    "name": "Simran Kumar",
    "anonymised_name": "Fresher Candidate #059 (S. Kumar)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-059/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 7536,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 75,
      "problem_solving_score": 75,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 119,
      "time_span_days": 61,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 13,
      "authenticity_score": 77,
      "summary": "119 commits across 61 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 119 organic commits over 61 days with 24% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_059_416829d04248"
    }
  },
  {
    "candidate_id": "cand_fresher_060",
    "name": "Yash Joshi",
    "anonymised_name": "Fresher Candidate #060 (Y. Joshi)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-060/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 6976,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 91,
      "problem_solving_score": 87,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 146,
      "time_span_days": 46,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 10,
      "authenticity_score": 80,
      "summary": "146 commits across 46 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 146 organic commits over 46 days with 34% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_060_9b779bb07e60"
    }
  },
  {
    "candidate_id": "cand_fresher_061",
    "name": "Simran Choudhury",
    "anonymised_name": "Fresher Candidate #061 (S. Choudhury)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-061/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 11474,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 79,
      "problem_solving_score": 92,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 78,
      "time_span_days": 63,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 8,
      "authenticity_score": 90,
      "summary": "78 commits across 63 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 78 organic commits over 63 days with 21% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_061_fb40686b8b40"
    }
  },
  {
    "candidate_id": "cand_fresher_062",
    "name": "Kunal Chatterjee",
    "anonymised_name": "Fresher Candidate #062 (K. Chatterjee)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-062/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 29270,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 91,
      "problem_solving_score": 91,
      "composite_assessment": 93
    },
    "git_dna": {
      "total_commits": 183,
      "time_span_days": 59,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 14,
      "authenticity_score": 85,
      "summary": "183 commits across 59 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 183 organic commits over 59 days with 23% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_062_2a7c6139da50"
    }
  },
  {
    "candidate_id": "cand_fresher_063",
    "name": "Sneha Trivedi",
    "anonymised_name": "Fresher Candidate #063 (S. Trivedi)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-063/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 19475,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_63",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 51,
      "aptitude_score": 54,
      "problem_solving_score": 65,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 31,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 65% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_063_bd057a5985c6"
    }
  },
  {
    "candidate_id": "cand_fresher_064",
    "name": "Abhishek Saxena",
    "anonymised_name": "Fresher Candidate #064 (A. Saxena)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-064/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 33910,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 93,
      "problem_solving_score": 91,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 114,
      "time_span_days": 28,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 6,
      "authenticity_score": 91,
      "summary": "114 commits across 28 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 114 organic commits over 28 days with 20% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_064_2bc643decbba"
    }
  },
  {
    "candidate_id": "cand_fresher_065",
    "name": "Mohit Choudhury",
    "anonymised_name": "Fresher Candidate #065 (M. Choudhury)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-065/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 9461,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_65",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 56,
      "aptitude_score": 53,
      "problem_solving_score": 61,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 35,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 74% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_065_bb415b4357d7"
    }
  },
  {
    "candidate_id": "cand_fresher_066",
    "name": "Priyanshu Banerjee",
    "anonymised_name": "Fresher Candidate #066 (P. Banerjee)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-066/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 5605,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 79,
      "problem_solving_score": 85,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 146,
      "time_span_days": 52,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 0,
      "authenticity_score": 83,
      "summary": "146 commits across 52 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 146 organic commits over 52 days with 21% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_066_58f4efe1962e"
    }
  },
  {
    "candidate_id": "cand_fresher_067",
    "name": "Siddharth Kapoor",
    "anonymised_name": "Fresher Candidate #067 (S. Kapoor)",
    "college": "IIIT Hyderabad",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-067/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 15173,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 85,
      "problem_solving_score": 89,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 135,
      "time_span_days": 89,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 4,
      "authenticity_score": 98,
      "summary": "135 commits across 89 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 135 organic commits over 89 days with 22% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_067_1459d55a31dd"
    }
  },
  {
    "candidate_id": "cand_fresher_068",
    "name": "Aditi Chawla",
    "anonymised_name": "Fresher Candidate #068 (A. Chawla)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-068/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 32897,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 76,
      "problem_solving_score": 73,
      "composite_assessment": 77
    },
    "git_dna": {
      "total_commits": 122,
      "time_span_days": 83,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 0,
      "authenticity_score": 87,
      "summary": "122 commits across 83 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 122 organic commits over 83 days with 33% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_068_bf8529a79c38"
    }
  },
  {
    "candidate_id": "cand_fresher_069",
    "name": "Vikram Deshmukh",
    "anonymised_name": "Fresher Candidate #069 (V. Deshmukh)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-069/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 12566,
    "authenticity_score": 19,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_69",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.81,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 56,
      "problem_solving_score": 47,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 44,
      "test_files_detected": 0,
      "authenticity_score": 19,
      "summary": "2 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (19% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 81% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_069_7a307689feb9"
    }
  },
  {
    "candidate_id": "cand_fresher_070",
    "name": "Harsh Banerjee",
    "anonymised_name": "Fresher Candidate #070 (H. Banerjee)",
    "college": "IIT Madras",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-070/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 3517,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 75,
      "problem_solving_score": 78,
      "composite_assessment": 75
    },
    "git_dna": {
      "total_commits": 34,
      "time_span_days": 30,
      "burst_ratio": 0.25,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 8,
      "authenticity_score": 81,
      "summary": "34 commits across 30 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 34 organic commits over 30 days with 37% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_070_068d6581297d"
    }
  },
  {
    "candidate_id": "cand_fresher_071",
    "name": "Anushka Saxena",
    "anonymised_name": "Fresher Candidate #071 (A. Saxena)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-071/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 18886,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 99,
      "problem_solving_score": 91,
      "composite_assessment": 96
    },
    "git_dna": {
      "total_commits": 179,
      "time_span_days": 27,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 14,
      "authenticity_score": 87,
      "summary": "179 commits across 27 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 179 organic commits over 27 days with 23% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_071_1f1715ca756f"
    }
  },
  {
    "candidate_id": "cand_fresher_072",
    "name": "Amit Trivedi",
    "anonymised_name": "Fresher Candidate #072 (A. Trivedi)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-072/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 22544,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 78,
      "problem_solving_score": 89,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 153,
      "time_span_days": 70,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 4,
      "authenticity_score": 89,
      "summary": "153 commits across 70 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 153 organic commits over 70 days with 20% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_072_ea453e504313"
    }
  },
  {
    "candidate_id": "cand_fresher_073",
    "name": "Mohit Chawla",
    "anonymised_name": "Fresher Candidate #073 (M. Chawla)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-073/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 15892,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_73",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 73,
      "problem_solving_score": 46,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "1 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 69% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_073_4df5518cbd1f"
    }
  },
  {
    "candidate_id": "cand_fresher_074",
    "name": "Meera Bhatia",
    "anonymised_name": "Fresher Candidate #074 (M. Bhatia)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-074/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 4597,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 72,
      "problem_solving_score": 96,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 137,
      "time_span_days": 54,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 10,
      "authenticity_score": 79,
      "summary": "137 commits across 54 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 137 organic commits over 54 days with 27% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_074_ae9363e9b1b9"
    }
  },
  {
    "candidate_id": "cand_fresher_075",
    "name": "Nikhil Patel",
    "anonymised_name": "Fresher Candidate #075 (N. Patel)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-075/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 21474,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 71,
      "problem_solving_score": 79,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 171,
      "time_span_days": 56,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 9,
      "authenticity_score": 94,
      "summary": "171 commits across 56 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 171 organic commits over 56 days with 28% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_075_1ee9c37a6f32"
    }
  },
  {
    "candidate_id": "cand_fresher_076",
    "name": "Divya Patel",
    "anonymised_name": "Fresher Candidate #076 (D. Patel)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-076/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 22172,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 94,
      "problem_solving_score": 96,
      "composite_assessment": 93
    },
    "git_dna": {
      "total_commits": 117,
      "time_span_days": 85,
      "burst_ratio": 0.36,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 9,
      "authenticity_score": 83,
      "summary": "117 commits across 85 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 117 organic commits over 85 days with 36% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_076_50ef0dddea73"
    }
  },
  {
    "candidate_id": "cand_fresher_077",
    "name": "Priyanshu Banerjee",
    "anonymised_name": "Fresher Candidate #077 (P. Banerjee)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-077/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 4080,
    "authenticity_score": 36,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_77",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.64,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 71,
      "problem_solving_score": 52,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.85,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 24,
      "test_files_detected": 0,
      "authenticity_score": 36,
      "summary": "3 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (36% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 64% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_077_14798a455bdc"
    }
  },
  {
    "candidate_id": "cand_fresher_078",
    "name": "Priyanshu Verma",
    "anonymised_name": "Fresher Candidate #078 (P. Verma)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-078/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 26521,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 74,
      "problem_solving_score": 75,
      "composite_assessment": 74
    },
    "git_dna": {
      "total_commits": 122,
      "time_span_days": 53,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 4,
      "authenticity_score": 86,
      "summary": "122 commits across 53 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 122 organic commits over 53 days with 37% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_078_c13f3600e33c"
    }
  },
  {
    "candidate_id": "cand_fresher_079",
    "name": "Vikram Chatterjee",
    "anonymised_name": "Fresher Candidate #079 (V. Chatterjee)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-079/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 23660,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 85,
      "problem_solving_score": 86,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 83,
      "time_span_days": 79,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 13,
      "authenticity_score": 89,
      "summary": "83 commits across 79 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 83 organic commits over 79 days with 28% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_079_940ba6a05f04"
    }
  },
  {
    "candidate_id": "cand_fresher_080",
    "name": "Aditi Malhotra",
    "anonymised_name": "Fresher Candidate #080 (A. Malhotra)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-080/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 6033,
    "authenticity_score": 18,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_80",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.82,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 63,
      "problem_solving_score": 45,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 18,
      "summary": "3 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (18% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 82% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_080_2374fa9d66eb"
    }
  },
  {
    "candidate_id": "cand_fresher_081",
    "name": "Deepika Chawla",
    "anonymised_name": "Fresher Candidate #081 (D. Chawla)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-081/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 15052,
    "authenticity_score": 13,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_81",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.87,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 63,
      "problem_solving_score": 58,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 13,
      "summary": "1 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (13% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 87% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_081_6197a0d268f2"
    }
  },
  {
    "candidate_id": "cand_fresher_082",
    "name": "Anushka Mishra",
    "anonymised_name": "Fresher Candidate #082 (A. Mishra)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-082/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 18969,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_82",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 58,
      "aptitude_score": 68,
      "problem_solving_score": 52,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 1 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 74% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_082_2c87dd795f09"
    }
  },
  {
    "candidate_id": "cand_fresher_083",
    "name": "Kunal Mishra",
    "anonymised_name": "Fresher Candidate #083 (K. Mishra)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-083/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 6639,
    "authenticity_score": 78,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 90,
      "problem_solving_score": 96,
      "composite_assessment": 95
    },
    "git_dna": {
      "total_commits": 57,
      "time_span_days": 81,
      "burst_ratio": 0.4,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 14,
      "authenticity_score": 78,
      "summary": "57 commits across 81 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (78% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 78% Git-DNA originality across 57 organic commits over 81 days with 40% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_083_b97f3ca943da"
    }
  },
  {
    "candidate_id": "cand_fresher_084",
    "name": "Sneha Singh",
    "anonymised_name": "Fresher Candidate #084 (S. Singh)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-084/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 22869,
    "authenticity_score": 14,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_84",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.86,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 71,
      "problem_solving_score": 58,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 14,
      "summary": "4 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (14% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 86% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_084_2b824a5af74a"
    }
  },
  {
    "candidate_id": "cand_fresher_085",
    "name": "Yash Mehta",
    "anonymised_name": "Fresher Candidate #085 (Y. Mehta)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-085/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 3664,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 84,
      "problem_solving_score": 71,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 105,
      "time_span_days": 49,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 0,
      "authenticity_score": 91,
      "summary": "105 commits across 49 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 105 organic commits over 49 days with 26% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_085_d2a453201d55"
    }
  },
  {
    "candidate_id": "cand_fresher_086",
    "name": "Tanvi Verma",
    "anonymised_name": "Fresher Candidate #086 (T. Verma)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-086/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 7968,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 88,
      "problem_solving_score": 90,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 176,
      "time_span_days": 84,
      "burst_ratio": 0.54,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 0,
      "authenticity_score": 88,
      "summary": "176 commits across 84 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 176 organic commits over 84 days with 36% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_086_49579603b682"
    }
  },
  {
    "candidate_id": "cand_fresher_087",
    "name": "Swati Nair",
    "anonymised_name": "Fresher Candidate #087 (S. Nair)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-087/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 21782,
    "authenticity_score": 34,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_87",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.66,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 66,
      "problem_solving_score": 56,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 34,
      "summary": "2 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (34% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 66% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_087_9dcbb40d2c4e"
    }
  },
  {
    "candidate_id": "cand_fresher_088",
    "name": "Gaurav Choudhury",
    "anonymised_name": "Fresher Candidate #088 (G. Choudhury)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-088/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 33401,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 93,
      "problem_solving_score": 91,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 41,
      "time_span_days": 56,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 7,
      "authenticity_score": 97,
      "summary": "41 commits across 56 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 41 organic commits over 56 days with 20% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_088_e90f5f98c00d"
    }
  },
  {
    "candidate_id": "cand_fresher_089",
    "name": "Manish Verma",
    "anonymised_name": "Fresher Candidate #089 (M. Verma)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-089/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 5987,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 80,
      "problem_solving_score": 96,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 61,
      "time_span_days": 90,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 13,
      "authenticity_score": 96,
      "summary": "61 commits across 90 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 61 organic commits over 90 days with 20% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_089_22f28fb78aab"
    }
  },
  {
    "candidate_id": "cand_fresher_090",
    "name": "Vikram Trivedi",
    "anonymised_name": "Fresher Candidate #090 (V. Trivedi)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-090/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 29470,
    "authenticity_score": 17,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_90",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.83,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 49,
      "aptitude_score": 52,
      "problem_solving_score": 49,
      "composite_assessment": 50
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 45,
      "test_files_detected": 0,
      "authenticity_score": 17,
      "summary": "3 commits across 2 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (17% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 83% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_090_77364e1620cc"
    }
  },
  {
    "candidate_id": "cand_fresher_091",
    "name": "Sneha Saxena",
    "anonymised_name": "Fresher Candidate #091 (S. Saxena)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-091/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 25431,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 98,
      "problem_solving_score": 75,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 180,
      "time_span_days": 62,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 12,
      "authenticity_score": 95,
      "summary": "180 commits across 62 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 180 organic commits over 62 days with 22% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_091_7c866fcb6961"
    }
  },
  {
    "candidate_id": "cand_fresher_092",
    "name": "Aditi Bhatia",
    "anonymised_name": "Fresher Candidate #092 (A. Bhatia)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-092/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 16237,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 91,
      "problem_solving_score": 88,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 164,
      "time_span_days": 44,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 6,
      "authenticity_score": 90,
      "summary": "164 commits across 44 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 164 organic commits over 44 days with 37% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_092_6ca8747561d4"
    }
  },
  {
    "candidate_id": "cand_fresher_093",
    "name": "Tanvi Joshi",
    "anonymised_name": "Fresher Candidate #093 (T. Joshi)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-093/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 29691,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 94,
      "aptitude_score": 97,
      "problem_solving_score": 86,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 92,
      "time_span_days": 20,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 4,
      "authenticity_score": 95,
      "summary": "92 commits across 20 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 92 organic commits over 20 days with 39% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_093_6387e16b1593"
    }
  },
  {
    "candidate_id": "cand_fresher_094",
    "name": "Tanvi Verma",
    "anonymised_name": "Fresher Candidate #094 (T. Verma)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-094/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 14053,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 82,
      "problem_solving_score": 86,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 51,
      "time_span_days": 42,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 9,
      "authenticity_score": 80,
      "summary": "51 commits across 42 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 51 organic commits over 42 days with 39% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_094_0bf6cf1470b1"
    }
  },
  {
    "candidate_id": "cand_fresher_095",
    "name": "Shreya Verma",
    "anonymised_name": "Fresher Candidate #095 (S. Verma)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-095/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 16499,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 92,
      "problem_solving_score": 85,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 65,
      "time_span_days": 31,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 5,
      "authenticity_score": 98,
      "summary": "65 commits across 31 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 65 organic commits over 31 days with 40% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_095_edbe63bbe5ce"
    }
  },
  {
    "candidate_id": "cand_fresher_096",
    "name": "Vikram Sharma",
    "anonymised_name": "Fresher Candidate #096 (V. Sharma)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-096/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 27814,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 83,
      "problem_solving_score": 90,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 136,
      "time_span_days": 28,
      "burst_ratio": 0.48,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 0,
      "authenticity_score": 95,
      "summary": "136 commits across 28 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 136 organic commits over 28 days with 24% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_096_41a3ff9455b9"
    }
  },
  {
    "candidate_id": "cand_fresher_097",
    "name": "Ananya Patel",
    "anonymised_name": "Fresher Candidate #097 (A. Patel)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-097/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 15450,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 77,
      "problem_solving_score": 88,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 175,
      "time_span_days": 44,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.25,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 0,
      "authenticity_score": 96,
      "summary": "175 commits across 44 days. Refactor ratio: 25%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 175 organic commits over 44 days with 25% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_097_07f7369e7e2f"
    }
  },
  {
    "candidate_id": "cand_fresher_098",
    "name": "Vikram Saxena",
    "anonymised_name": "Fresher Candidate #098 (V. Saxena)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-098/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 13501,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 93,
      "problem_solving_score": 70,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 33,
      "time_span_days": 63,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 8,
      "authenticity_score": 92,
      "summary": "33 commits across 63 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 33 organic commits over 63 days with 19% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_098_315aee85b810"
    }
  },
  {
    "candidate_id": "cand_fresher_099",
    "name": "Divya Malhotra",
    "anonymised_name": "Fresher Candidate #099 (D. Malhotra)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-099/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 22500,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 92,
      "problem_solving_score": 85,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 39,
      "time_span_days": 59,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 13,
      "authenticity_score": 86,
      "summary": "39 commits across 59 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 39 organic commits over 59 days with 38% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_099_c719e0872b2f"
    }
  },
  {
    "candidate_id": "cand_fresher_100",
    "name": "Neha Verma",
    "anonymised_name": "Fresher Candidate #100 (N. Verma)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-100/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 2999,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_100",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 65,
      "problem_solving_score": 48,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 44,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 63% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_100_7c560f4c8182"
    }
  },
  {
    "candidate_id": "cand_fresher_101",
    "name": "Kavya Mishra",
    "anonymised_name": "Fresher Candidate #101 (K. Mishra)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-101/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 32087,
    "authenticity_score": 25,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_101",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.75,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 67,
      "aptitude_score": 65,
      "problem_solving_score": 51,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 45,
      "test_files_detected": 0,
      "authenticity_score": 25,
      "summary": "4 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (25% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 75% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_101_eca54ca8fa8c"
    }
  },
  {
    "candidate_id": "cand_fresher_102",
    "name": "Abhishek Chatterjee",
    "anonymised_name": "Fresher Candidate #102 (A. Chatterjee)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-102/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 7260,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 92,
      "problem_solving_score": 83,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 103,
      "time_span_days": 55,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 10,
      "authenticity_score": 81,
      "summary": "103 commits across 55 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 103 organic commits over 55 days with 26% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_102_559ce1b2b7ef"
    }
  },
  {
    "candidate_id": "cand_fresher_103",
    "name": "Divya Reddy",
    "anonymised_name": "Fresher Candidate #103 (D. Reddy)",
    "college": "IIT Roorkee",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-103/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 24019,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 97,
      "problem_solving_score": 89,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 47,
      "time_span_days": 65,
      "burst_ratio": 0.36,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 3,
      "authenticity_score": 84,
      "summary": "47 commits across 65 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 47 organic commits over 65 days with 37% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_103_e0f38fc0cef6"
    }
  },
  {
    "candidate_id": "cand_fresher_104",
    "name": "Aditi Singh",
    "anonymised_name": "Fresher Candidate #104 (A. Singh)",
    "college": "IIT Roorkee",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-104/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 13824,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 74,
      "problem_solving_score": 86,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 182,
      "time_span_days": 33,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 4,
      "authenticity_score": 94,
      "summary": "182 commits across 33 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 182 organic commits over 33 days with 41% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_104_3ebfa6d57f1f"
    }
  },
  {
    "candidate_id": "cand_fresher_105",
    "name": "Isha Trivedi",
    "anonymised_name": "Fresher Candidate #105 (I. Trivedi)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-105/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 31831,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 79,
      "problem_solving_score": 92,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 127,
      "time_span_days": 85,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 6,
      "authenticity_score": 91,
      "summary": "127 commits across 85 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 127 organic commits over 85 days with 37% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_105_ac4babf1045e"
    }
  },
  {
    "candidate_id": "cand_fresher_106",
    "name": "Kavya Patel",
    "anonymised_name": "Fresher Candidate #106 (K. Patel)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-106/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 29697,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_106",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 59,
      "problem_solving_score": 49,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 3 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 74% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_106_60e2c8e02ac6"
    }
  },
  {
    "candidate_id": "cand_fresher_107",
    "name": "Arjun Choudhury",
    "anonymised_name": "Fresher Candidate #107 (A. Choudhury)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-107/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 3954,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 89,
      "problem_solving_score": 72,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 34,
      "time_span_days": 60,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 11,
      "authenticity_score": 83,
      "summary": "34 commits across 60 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 34 organic commits over 60 days with 27% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_107_8f2898661af8"
    }
  },
  {
    "candidate_id": "cand_fresher_108",
    "name": "Kunal Chawla",
    "anonymised_name": "Fresher Candidate #108 (K. Chawla)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-108/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 27367,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 98,
      "problem_solving_score": 96,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 60,
      "time_span_days": 54,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 8,
      "authenticity_score": 94,
      "summary": "60 commits across 54 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 60 organic commits over 54 days with 29% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_108_7d3a6a2dfb89"
    }
  },
  {
    "candidate_id": "cand_fresher_109",
    "name": "Ayush Kumar",
    "anonymised_name": "Fresher Candidate #109 (A. Kumar)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-109/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 29519,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 86,
      "problem_solving_score": 79,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 160,
      "time_span_days": 33,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 6,
      "authenticity_score": 77,
      "summary": "160 commits across 33 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 160 organic commits over 33 days with 22% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_109_bebcbb224c2b"
    }
  },
  {
    "candidate_id": "cand_fresher_110",
    "name": "Riya Gupta",
    "anonymised_name": "Fresher Candidate #110 (R. Gupta)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-110/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 23385,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_110",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 54,
      "problem_solving_score": 45,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 39,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "1 commits across 3 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 69% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_110_2432074a290a"
    }
  },
  {
    "candidate_id": "cand_fresher_111",
    "name": "Swati Mehta",
    "anonymised_name": "Fresher Candidate #111 (S. Mehta)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-111/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 30930,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 92,
      "aptitude_score": 70,
      "problem_solving_score": 85,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 39,
      "time_span_days": 87,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 12,
      "authenticity_score": 76,
      "summary": "39 commits across 87 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 39 organic commits over 87 days with 23% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_111_04c023706b00"
    }
  },
  {
    "candidate_id": "cand_fresher_112",
    "name": "Tanvi Trivedi",
    "anonymised_name": "Fresher Candidate #112 (T. Trivedi)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-112/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 21679,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 76,
      "problem_solving_score": 80,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 104,
      "time_span_days": 72,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 10,
      "authenticity_score": 97,
      "summary": "104 commits across 72 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 104 organic commits over 72 days with 19% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_112_1eb5e950ac96"
    }
  },
  {
    "candidate_id": "cand_fresher_113",
    "name": "Isha Chawla",
    "anonymised_name": "Fresher Candidate #113 (I. Chawla)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-113/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 4972,
    "authenticity_score": 28,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_113",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.72,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 57,
      "problem_solving_score": 44,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 21,
      "test_files_detected": 0,
      "authenticity_score": 28,
      "summary": "1 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (28% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 72% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_113_69652cb19fe7"
    }
  },
  {
    "candidate_id": "cand_fresher_114",
    "name": "Tanvi Joshi",
    "anonymised_name": "Fresher Candidate #114 (T. Joshi)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-114/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 18097,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 98,
      "problem_solving_score": 79,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 175,
      "time_span_days": 54,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 10,
      "authenticity_score": 81,
      "summary": "175 commits across 54 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 175 organic commits over 54 days with 22% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_114_385f64cb4c96"
    }
  },
  {
    "candidate_id": "cand_fresher_115",
    "name": "Vikram Joshi",
    "anonymised_name": "Fresher Candidate #115 (V. Joshi)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-115/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 15920,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 70,
      "problem_solving_score": 73,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 100,
      "time_span_days": 77,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 7,
      "authenticity_score": 77,
      "summary": "100 commits across 77 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 100 organic commits over 77 days with 38% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_115_e5196778f01f"
    }
  },
  {
    "candidate_id": "cand_fresher_116",
    "name": "Riya Pandey",
    "anonymised_name": "Fresher Candidate #116 (R. Pandey)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-116/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 19817,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_116",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 61,
      "aptitude_score": 64,
      "problem_solving_score": 64,
      "composite_assessment": 63
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 28,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "2 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 70% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_116_8d934107b190"
    }
  },
  {
    "candidate_id": "cand_fresher_117",
    "name": "Yash Deshmukh",
    "anonymised_name": "Fresher Candidate #117 (Y. Deshmukh)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-117/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 12713,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 74,
      "problem_solving_score": 92,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 121,
      "time_span_days": 32,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 3,
      "authenticity_score": 86,
      "summary": "121 commits across 32 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 121 organic commits over 32 days with 30% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_117_57f724e148ba"
    }
  },
  {
    "candidate_id": "cand_fresher_118",
    "name": "Abhishek Reddy",
    "anonymised_name": "Fresher Candidate #118 (A. Reddy)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-118/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 19243,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 96,
      "problem_solving_score": 86,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 69,
      "time_span_days": 64,
      "burst_ratio": 0.55,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 8,
      "authenticity_score": 95,
      "summary": "69 commits across 64 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 69 organic commits over 64 days with 36% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_118_60f09e326bc4"
    }
  },
  {
    "candidate_id": "cand_fresher_119",
    "name": "Aayushi Mishra",
    "anonymised_name": "Fresher Candidate #119 (A. Mishra)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-119/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 33488,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 85,
      "problem_solving_score": 78,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 177,
      "time_span_days": 53,
      "burst_ratio": 0.49,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 3,
      "authenticity_score": 79,
      "summary": "177 commits across 53 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 177 organic commits over 53 days with 35% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_119_09fa2f252c81"
    }
  },
  {
    "candidate_id": "cand_fresher_120",
    "name": "Aayushi Malhotra",
    "anonymised_name": "Fresher Candidate #120 (A. Malhotra)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-120/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 8051,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_120",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 72,
      "problem_solving_score": 43,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "4 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 65% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_120_8ef04848843a"
    }
  },
  {
    "candidate_id": "cand_fresher_121",
    "name": "Simran Mehta",
    "anonymised_name": "Fresher Candidate #121 (S. Mehta)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-121/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 33148,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 82,
      "problem_solving_score": 80,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 43,
      "time_span_days": 31,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 10,
      "authenticity_score": 95,
      "summary": "43 commits across 31 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 43 organic commits over 31 days with 31% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_121_edf46d8b7893"
    }
  },
  {
    "candidate_id": "cand_fresher_122",
    "name": "Amit Kapoor",
    "anonymised_name": "Fresher Candidate #122 (A. Kapoor)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-122/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 24901,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 94,
      "aptitude_score": 76,
      "problem_solving_score": 92,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 99,
      "time_span_days": 85,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 7,
      "authenticity_score": 82,
      "summary": "99 commits across 85 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 99 organic commits over 85 days with 41% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_122_689174921777"
    }
  },
  {
    "candidate_id": "cand_fresher_123",
    "name": "Isha Nair",
    "anonymised_name": "Fresher Candidate #123 (I. Nair)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-123/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 33103,
    "authenticity_score": 29,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_123",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.71,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 54,
      "aptitude_score": 51,
      "problem_solving_score": 49,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 29,
      "summary": "4 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (29% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 71% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_123_f69f5ee8e196"
    }
  },
  {
    "candidate_id": "cand_fresher_124",
    "name": "Vikram Choudhury",
    "anonymised_name": "Fresher Candidate #124 (V. Choudhury)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-124/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 23749,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_124",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 57,
      "problem_solving_score": 41,
      "composite_assessment": 50
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 36,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "3 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 80% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_124_23f4d31b610e"
    }
  },
  {
    "candidate_id": "cand_fresher_125",
    "name": "Meera Trivedi",
    "anonymised_name": "Fresher Candidate #125 (M. Trivedi)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-125/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 8335,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 85,
      "problem_solving_score": 90,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 63,
      "time_span_days": 14,
      "burst_ratio": 0.54,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 13,
      "authenticity_score": 91,
      "summary": "63 commits across 14 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 63 organic commits over 14 days with 41% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_125_c17a33792f54"
    }
  },
  {
    "candidate_id": "cand_fresher_126",
    "name": "Isha Mishra",
    "anonymised_name": "Fresher Candidate #126 (I. Mishra)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-126/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 18032,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_126",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 62,
      "problem_solving_score": 65,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "2 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 65% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_126_873255e82ab2"
    }
  },
  {
    "candidate_id": "cand_fresher_127",
    "name": "Tanvi Awasthi",
    "anonymised_name": "Fresher Candidate #127 (T. Awasthi)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-127/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 12635,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_127",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 51,
      "aptitude_score": 75,
      "problem_solving_score": 43,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "4 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 79% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_127_2ca60ff062c0"
    }
  },
  {
    "candidate_id": "cand_fresher_128",
    "name": "Amit Trivedi",
    "anonymised_name": "Fresher Candidate #128 (A. Trivedi)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-128/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 14934,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 80,
      "problem_solving_score": 72,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 77,
      "time_span_days": 36,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 9,
      "authenticity_score": 85,
      "summary": "77 commits across 36 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 77 organic commits over 36 days with 33% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_128_1cb672731db9"
    }
  },
  {
    "candidate_id": "cand_fresher_129",
    "name": "Arjun Singh",
    "anonymised_name": "Fresher Candidate #129 (A. Singh)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-129/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 24500,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_129",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 53,
      "aptitude_score": 70,
      "problem_solving_score": 51,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 27,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 74% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_129_543f3577eab3"
    }
  },
  {
    "candidate_id": "cand_fresher_130",
    "name": "Rohan Deshmukh",
    "anonymised_name": "Fresher Candidate #130 (R. Deshmukh)",
    "college": "IIT Kharagpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-130/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 21648,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 84,
      "problem_solving_score": 93,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 58,
      "time_span_days": 51,
      "burst_ratio": 0.36,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 10,
      "authenticity_score": 92,
      "summary": "58 commits across 51 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 58 organic commits over 51 days with 23% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_130_3100ed837276"
    }
  },
  {
    "candidate_id": "cand_fresher_131",
    "name": "Anushka Chawla",
    "anonymised_name": "Fresher Candidate #131 (A. Chawla)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-131/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 19745,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 75,
      "aptitude_score": 71,
      "problem_solving_score": 96,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 180,
      "time_span_days": 24,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 12,
      "authenticity_score": 82,
      "summary": "180 commits across 24 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 180 organic commits over 24 days with 31% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_131_9850113cbc2c"
    }
  },
  {
    "candidate_id": "cand_fresher_132",
    "name": "Kavya Tripathi",
    "anonymised_name": "Fresher Candidate #132 (K. Tripathi)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-132/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 15412,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 74,
      "problem_solving_score": 86,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 80,
      "time_span_days": 88,
      "burst_ratio": 0.4,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 3,
      "authenticity_score": 90,
      "summary": "80 commits across 88 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 80 organic commits over 88 days with 40% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_132_454e2494e199"
    }
  },
  {
    "candidate_id": "cand_fresher_133",
    "name": "Aayushi Awasthi",
    "anonymised_name": "Fresher Candidate #133 (A. Awasthi)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-133/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 32397,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 99,
      "problem_solving_score": 72,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 176,
      "time_span_days": 23,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 0,
      "authenticity_score": 76,
      "summary": "176 commits across 23 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 176 organic commits over 23 days with 26% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_133_b0f8b56e7858"
    }
  },
  {
    "candidate_id": "cand_fresher_134",
    "name": "Aditi Mishra",
    "anonymised_name": "Fresher Candidate #134 (A. Mishra)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-134/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 5687,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 92,
      "aptitude_score": 97,
      "problem_solving_score": 81,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 124,
      "time_span_days": 62,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 5,
      "authenticity_score": 88,
      "summary": "124 commits across 62 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 124 organic commits over 62 days with 41% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_134_ba364da880d6"
    }
  },
  {
    "candidate_id": "cand_fresher_135",
    "name": "Deepika Joshi",
    "anonymised_name": "Fresher Candidate #135 (D. Joshi)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-135/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 32517,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 78,
      "problem_solving_score": 76,
      "composite_assessment": 77
    },
    "git_dna": {
      "total_commits": 167,
      "time_span_days": 68,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 8,
      "authenticity_score": 85,
      "summary": "167 commits across 68 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 167 organic commits over 68 days with 38% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_135_ec59b6bb7a0f"
    }
  },
  {
    "candidate_id": "cand_fresher_136",
    "name": "Aditi Deshmukh",
    "anonymised_name": "Fresher Candidate #136 (A. Deshmukh)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-136/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 14981,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_136",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 73,
      "problem_solving_score": 41,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "4 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 69% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_136_66304f32ff73"
    }
  },
  {
    "candidate_id": "cand_fresher_137",
    "name": "Meera Kapoor",
    "anonymised_name": "Fresher Candidate #137 (M. Kapoor)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-137/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 23433,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 98,
      "problem_solving_score": 74,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 175,
      "time_span_days": 54,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 6,
      "authenticity_score": 85,
      "summary": "175 commits across 54 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 175 organic commits over 54 days with 37% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_137_3d3d59169f62"
    }
  },
  {
    "candidate_id": "cand_fresher_138",
    "name": "Meera Bhatia",
    "anonymised_name": "Fresher Candidate #138 (M. Bhatia)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-138/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 24616,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 86,
      "problem_solving_score": 80,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 170,
      "time_span_days": 77,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 9,
      "authenticity_score": 81,
      "summary": "170 commits across 77 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 170 organic commits over 77 days with 26% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_138_d2e35413053e"
    }
  },
  {
    "candidate_id": "cand_fresher_139",
    "name": "Anushka Singh",
    "anonymised_name": "Fresher Candidate #139 (A. Singh)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-139/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 9757,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 74,
      "problem_solving_score": 82,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 64,
      "time_span_days": 73,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 11,
      "authenticity_score": 83,
      "summary": "64 commits across 73 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 64 organic commits over 73 days with 31% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_139_7abd2f5e85ac"
    }
  },
  {
    "candidate_id": "cand_fresher_140",
    "name": "Rahul Mehta",
    "anonymised_name": "Fresher Candidate #140 (R. Mehta)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-140/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 28166,
    "authenticity_score": 38,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_140",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.62,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 52,
      "problem_solving_score": 46,
      "composite_assessment": 48
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 44,
      "test_files_detected": 0,
      "authenticity_score": 38,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (38% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 62% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_140_b58ddb3dcd64"
    }
  },
  {
    "candidate_id": "cand_fresher_141",
    "name": "Ayush Pandey",
    "anonymised_name": "Fresher Candidate #141 (A. Pandey)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-141/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 21605,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_141",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 57,
      "problem_solving_score": 62,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "2 commits across 1 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 79% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_141_a289b354d385"
    }
  },
  {
    "candidate_id": "cand_fresher_142",
    "name": "Rahul Joshi",
    "anonymised_name": "Fresher Candidate #142 (R. Joshi)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-142/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 17184,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 75,
      "aptitude_score": 95,
      "problem_solving_score": 93,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 164,
      "time_span_days": 59,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 10,
      "authenticity_score": 88,
      "summary": "164 commits across 59 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 164 organic commits over 59 days with 27% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_142_ccd2cc08392a"
    }
  },
  {
    "candidate_id": "cand_fresher_143",
    "name": "Rahul Choudhury",
    "anonymised_name": "Fresher Candidate #143 (R. Choudhury)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-143/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 14246,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 80,
      "problem_solving_score": 77,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 94,
      "time_span_days": 84,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 5,
      "authenticity_score": 80,
      "summary": "94 commits across 84 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 94 organic commits over 84 days with 32% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_143_b15d4f3c121d"
    }
  },
  {
    "candidate_id": "cand_fresher_144",
    "name": "Siddharth Nair",
    "anonymised_name": "Fresher Candidate #144 (S. Nair)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-144/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 31844,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 85,
      "problem_solving_score": 75,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 145,
      "time_span_days": 35,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 0,
      "authenticity_score": 91,
      "summary": "145 commits across 35 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 145 organic commits over 35 days with 26% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_144_827ad6738eb5"
    }
  },
  {
    "candidate_id": "cand_fresher_145",
    "name": "Rohan Saxena",
    "anonymised_name": "Fresher Candidate #145 (R. Saxena)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-145/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 23648,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 89,
      "problem_solving_score": 90,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 87,
      "time_span_days": 22,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.18,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 8,
      "authenticity_score": 89,
      "summary": "87 commits across 22 days. Refactor ratio: 18%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 87 organic commits over 22 days with 18% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_145_f69bb693f8b1"
    }
  },
  {
    "candidate_id": "cand_fresher_146",
    "name": "Sameer Sharma",
    "anonymised_name": "Fresher Candidate #146 (S. Sharma)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-146/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 5306,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_146",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 58,
      "aptitude_score": 75,
      "problem_solving_score": 45,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 23,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "3 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 65% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_146_87387fca42be"
    }
  },
  {
    "candidate_id": "cand_fresher_147",
    "name": "Abhishek Singh",
    "anonymised_name": "Fresher Candidate #147 (A. Singh)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-147/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 11629,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_147",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 72,
      "problem_solving_score": 47,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 80% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_147_d44c5d8da9c3"
    }
  },
  {
    "candidate_id": "cand_fresher_148",
    "name": "Vikram Trivedi",
    "anonymised_name": "Fresher Candidate #148 (V. Trivedi)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-148/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 12655,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 85,
      "aptitude_score": 90,
      "problem_solving_score": 95,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 149,
      "time_span_days": 21,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 0,
      "authenticity_score": 88,
      "summary": "149 commits across 21 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 149 organic commits over 21 days with 35% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_148_c8e6de12abfb"
    }
  },
  {
    "candidate_id": "cand_fresher_149",
    "name": "Sneha Saxena",
    "anonymised_name": "Fresher Candidate #149 (S. Saxena)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-149/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 7677,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 91,
      "problem_solving_score": 71,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 149,
      "time_span_days": 48,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 11,
      "authenticity_score": 98,
      "summary": "149 commits across 48 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 149 organic commits over 48 days with 20% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_149_9f5988a87fc4"
    }
  },
  {
    "candidate_id": "cand_fresher_150",
    "name": "Priyanshu Gupta",
    "anonymised_name": "Fresher Candidate #150 (P. Gupta)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-150/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 24387,
    "authenticity_score": 19,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_150",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.81,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 54,
      "problem_solving_score": 65,
      "composite_assessment": 63
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 43,
      "test_files_detected": 0,
      "authenticity_score": 19,
      "summary": "4 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (19% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 81% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_150_fc9842f89165"
    }
  },
  {
    "candidate_id": "cand_fresher_151",
    "name": "Vikram Saxena",
    "anonymised_name": "Fresher Candidate #151 (V. Saxena)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-151/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 2770,
    "authenticity_score": 38,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_151",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.62,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 57,
      "aptitude_score": 74,
      "problem_solving_score": 50,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 38,
      "summary": "3 commits across 3 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (38% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 62% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_151_ead5091f4b55"
    }
  },
  {
    "candidate_id": "cand_fresher_152",
    "name": "Aditya Reddy",
    "anonymised_name": "Fresher Candidate #152 (A. Reddy)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-152/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 6853,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 72,
      "problem_solving_score": 78,
      "composite_assessment": 75
    },
    "git_dna": {
      "total_commits": 177,
      "time_span_days": 62,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 14,
      "authenticity_score": 89,
      "summary": "177 commits across 62 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 177 organic commits over 62 days with 33% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_152_ea918b38d0fe"
    }
  },
  {
    "candidate_id": "cand_fresher_153",
    "name": "Harsh Pandey",
    "anonymised_name": "Fresher Candidate #153 (H. Pandey)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-153/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 18591,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_153",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 67,
      "problem_solving_score": 57,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 33,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 74% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_153_b5acc5e47b2f"
    }
  },
  {
    "candidate_id": "cand_fresher_154",
    "name": "Sneha Sharma",
    "anonymised_name": "Fresher Candidate #154 (S. Sharma)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-154/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 7356,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 88,
      "problem_solving_score": 86,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 31,
      "time_span_days": 51,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 11,
      "authenticity_score": 86,
      "summary": "31 commits across 51 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 31 organic commits over 51 days with 37% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_154_3192faddf4c5"
    }
  },
  {
    "candidate_id": "cand_fresher_155",
    "name": "Pooja Singh",
    "anonymised_name": "Fresher Candidate #155 (P. Singh)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-155/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 22281,
    "authenticity_score": 25,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_155",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.75,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 53,
      "aptitude_score": 57,
      "problem_solving_score": 63,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 35,
      "test_files_detected": 0,
      "authenticity_score": 25,
      "summary": "4 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (25% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 75% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_155_0718be63fd16"
    }
  },
  {
    "candidate_id": "cand_fresher_156",
    "name": "Swati Banerjee",
    "anonymised_name": "Fresher Candidate #156 (S. Banerjee)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-156/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 12307,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 74,
      "problem_solving_score": 79,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 125,
      "time_span_days": 56,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 13,
      "authenticity_score": 88,
      "summary": "125 commits across 56 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 125 organic commits over 56 days with 28% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_156_daccd9f6250d"
    }
  },
  {
    "candidate_id": "cand_fresher_157",
    "name": "Ritika Mehta",
    "anonymised_name": "Fresher Candidate #157 (R. Mehta)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-157/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 32341,
    "authenticity_score": 32,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_157",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.68,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 57,
      "aptitude_score": 61,
      "problem_solving_score": 43,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 38,
      "test_files_detected": 0,
      "authenticity_score": 32,
      "summary": "2 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (32% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 68% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_157_d70e568d2351"
    }
  },
  {
    "candidate_id": "cand_fresher_158",
    "name": "Kavya Tripathi",
    "anonymised_name": "Fresher Candidate #158 (K. Tripathi)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-158/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 15206,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_158",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 75,
      "problem_solving_score": 65,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "2 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 74% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_158_63f1480bbb57"
    }
  },
  {
    "candidate_id": "cand_fresher_159",
    "name": "Sameer Singh",
    "anonymised_name": "Fresher Candidate #159 (S. Singh)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-159/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 15506,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 99,
      "problem_solving_score": 92,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 124,
      "time_span_days": 23,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 11,
      "authenticity_score": 98,
      "summary": "124 commits across 23 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 124 organic commits over 23 days with 32% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_159_a9657be78d61"
    }
  },
  {
    "candidate_id": "cand_fresher_160",
    "name": "Aditi Choudhury",
    "anonymised_name": "Fresher Candidate #160 (A. Choudhury)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-160/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 33480,
    "authenticity_score": 78,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 90,
      "problem_solving_score": 82,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 91,
      "time_span_days": 59,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 13,
      "authenticity_score": 78,
      "summary": "91 commits across 59 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (78% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 78% Git-DNA originality across 91 organic commits over 59 days with 33% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_160_8ea21da38399"
    }
  },
  {
    "candidate_id": "cand_fresher_161",
    "name": "Nikhil Patel",
    "anonymised_name": "Fresher Candidate #161 (N. Patel)",
    "college": "IIT Kharagpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-161/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 6739,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 92,
      "problem_solving_score": 86,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 176,
      "time_span_days": 87,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 13,
      "authenticity_score": 92,
      "summary": "176 commits across 87 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 176 organic commits over 87 days with 27% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_161_3032237f3581"
    }
  },
  {
    "candidate_id": "cand_fresher_162",
    "name": "Priyanshu Nair",
    "anonymised_name": "Fresher Candidate #162 (P. Nair)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-162/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 4998,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_162",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 61,
      "problem_solving_score": 55,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "3 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 84% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_162_5c3fc6822c76"
    }
  },
  {
    "candidate_id": "cand_fresher_163",
    "name": "Simran Mehta",
    "anonymised_name": "Fresher Candidate #163 (S. Mehta)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-163/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 15771,
    "authenticity_score": 32,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_163",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.68,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 50,
      "aptitude_score": 60,
      "problem_solving_score": 57,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 32,
      "summary": "2 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (32% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 68% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_163_acddba46107f"
    }
  },
  {
    "candidate_id": "cand_fresher_164",
    "name": "Meera Joshi",
    "anonymised_name": "Fresher Candidate #164 (M. Joshi)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-164/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 27883,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 92,
      "problem_solving_score": 95,
      "composite_assessment": 94
    },
    "git_dna": {
      "total_commits": 143,
      "time_span_days": 89,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.18,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 7,
      "authenticity_score": 95,
      "summary": "143 commits across 89 days. Refactor ratio: 18%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 143 organic commits over 89 days with 18% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_164_173eb27011bf"
    }
  },
  {
    "candidate_id": "cand_fresher_165",
    "name": "Aayushi Patel",
    "anonymised_name": "Fresher Candidate #165 (A. Patel)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-165/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 14662,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 82,
      "problem_solving_score": 89,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 57,
      "time_span_days": 47,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 8,
      "authenticity_score": 82,
      "summary": "57 commits across 47 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 57 organic commits over 47 days with 30% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_165_17e32c460919"
    }
  },
  {
    "candidate_id": "cand_fresher_166",
    "name": "Karan Choudhury",
    "anonymised_name": "Fresher Candidate #166 (K. Choudhury)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-166/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 14032,
    "authenticity_score": 34,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_166",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.66,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 54,
      "aptitude_score": 53,
      "problem_solving_score": 45,
      "composite_assessment": 51
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 34,
      "summary": "1 commits across 3 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (34% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 66% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_166_55c9a54af2de"
    }
  },
  {
    "candidate_id": "cand_fresher_167",
    "name": "Harsh Saxena",
    "anonymised_name": "Fresher Candidate #167 (H. Saxena)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-167/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 6397,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 77,
      "aptitude_score": 85,
      "problem_solving_score": 79,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 152,
      "time_span_days": 82,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 11,
      "authenticity_score": 89,
      "summary": "152 commits across 82 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 152 organic commits over 82 days with 33% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_167_47d6902def83"
    }
  },
  {
    "candidate_id": "cand_fresher_168",
    "name": "Isha Reddy",
    "anonymised_name": "Fresher Candidate #168 (I. Reddy)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-168/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 7280,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 84,
      "problem_solving_score": 85,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 171,
      "time_span_days": 78,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 14,
      "authenticity_score": 82,
      "summary": "171 commits across 78 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 171 organic commits over 78 days with 28% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_168_55102e1fb20c"
    }
  },
  {
    "candidate_id": "cand_fresher_169",
    "name": "Aayushi Sharma",
    "anonymised_name": "Fresher Candidate #169 (A. Sharma)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-169/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 5509,
    "authenticity_score": 29,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_169",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.71,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 67,
      "problem_solving_score": 56,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 38,
      "test_files_detected": 0,
      "authenticity_score": 29,
      "summary": "2 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (29% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 71% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_169_75efe0ffe864"
    }
  },
  {
    "candidate_id": "cand_fresher_170",
    "name": "Karan Chatterjee",
    "anonymised_name": "Fresher Candidate #170 (K. Chatterjee)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-170/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 16536,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 97,
      "problem_solving_score": 71,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 167,
      "time_span_days": 41,
      "burst_ratio": 0.55,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 6,
      "authenticity_score": 77,
      "summary": "167 commits across 41 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 167 organic commits over 41 days with 20% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_170_eb9061de698f"
    }
  },
  {
    "candidate_id": "cand_fresher_171",
    "name": "Divya Verma",
    "anonymised_name": "Fresher Candidate #171 (D. Verma)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-171/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 8570,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_171",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 54,
      "problem_solving_score": 65,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 26,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "3 commits across 3 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 70% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_171_438d176992b5"
    }
  },
  {
    "candidate_id": "cand_fresher_172",
    "name": "Rohan Tripathi",
    "anonymised_name": "Fresher Candidate #172 (R. Tripathi)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-172/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 33348,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 73,
      "problem_solving_score": 74,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 102,
      "time_span_days": 87,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 13,
      "authenticity_score": 86,
      "summary": "102 commits across 87 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 102 organic commits over 87 days with 39% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_172_a6bf438cf4e9"
    }
  },
  {
    "candidate_id": "cand_fresher_173",
    "name": "Rohan Chatterjee",
    "anonymised_name": "Fresher Candidate #173 (R. Chatterjee)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-173/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 16610,
    "authenticity_score": 22,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_173",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.78,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 63,
      "problem_solving_score": 52,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 22,
      "summary": "4 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (22% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 78% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_173_f39136833aa7"
    }
  },
  {
    "candidate_id": "cand_fresher_174",
    "name": "Vikram Joshi",
    "anonymised_name": "Fresher Candidate #174 (V. Joshi)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-174/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 24648,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 90,
      "problem_solving_score": 91,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 176,
      "time_span_days": 14,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 0,
      "authenticity_score": 91,
      "summary": "176 commits across 14 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 176 organic commits over 14 days with 38% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_174_8dae80586825"
    }
  },
  {
    "candidate_id": "cand_fresher_175",
    "name": "Ananya Kapoor",
    "anonymised_name": "Fresher Candidate #175 (A. Kapoor)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-175/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 3305,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 94,
      "problem_solving_score": 71,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 114,
      "time_span_days": 84,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 8,
      "authenticity_score": 86,
      "summary": "114 commits across 84 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 114 organic commits over 84 days with 32% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_175_a989bbf90a8f"
    }
  },
  {
    "candidate_id": "cand_fresher_176",
    "name": "Amit Sharma",
    "anonymised_name": "Fresher Candidate #176 (A. Sharma)",
    "college": "IIT Madras",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-176/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 13984,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 78,
      "problem_solving_score": 72,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 61,
      "time_span_days": 52,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 13,
      "authenticity_score": 89,
      "summary": "61 commits across 52 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 61 organic commits over 52 days with 40% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_176_02d2e12660c3"
    }
  },
  {
    "candidate_id": "cand_fresher_177",
    "name": "Rohan Joshi",
    "anonymised_name": "Fresher Candidate #177 (R. Joshi)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-177/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 24593,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 70,
      "problem_solving_score": 70,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 28,
      "time_span_days": 41,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 13,
      "authenticity_score": 98,
      "summary": "28 commits across 41 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 28 organic commits over 41 days with 21% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_177_1ad7a48a5661"
    }
  },
  {
    "candidate_id": "cand_fresher_178",
    "name": "Karan Bhatia",
    "anonymised_name": "Fresher Candidate #178 (K. Bhatia)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-178/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 30455,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_178",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 57,
      "aptitude_score": 74,
      "problem_solving_score": 64,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 24,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "1 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 65% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_178_f5781a0915c8"
    }
  },
  {
    "candidate_id": "cand_fresher_179",
    "name": "Harsh Verma",
    "anonymised_name": "Fresher Candidate #179 (H. Verma)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-179/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 6387,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 98,
      "problem_solving_score": 73,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 82,
      "time_span_days": 33,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 6,
      "authenticity_score": 90,
      "summary": "82 commits across 33 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 82 organic commits over 33 days with 33% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_179_90f1a292cefa"
    }
  },
  {
    "candidate_id": "cand_fresher_180",
    "name": "Ayush Pandey",
    "anonymised_name": "Fresher Candidate #180 (A. Pandey)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-180/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 30499,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 97,
      "problem_solving_score": 91,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 49,
      "time_span_days": 45,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 14,
      "authenticity_score": 83,
      "summary": "49 commits across 45 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 49 organic commits over 45 days with 32% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_180_ed898c1ba589"
    }
  },
  {
    "candidate_id": "cand_fresher_181",
    "name": "Rahul Saxena",
    "anonymised_name": "Fresher Candidate #181 (R. Saxena)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-181/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 30921,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_181",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 52,
      "problem_solving_score": 56,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "4 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 63% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_181_f1a2bfbdc4f7"
    }
  },
  {
    "candidate_id": "cand_fresher_182",
    "name": "Gaurav Mehta",
    "anonymised_name": "Fresher Candidate #182 (G. Mehta)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-182/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 18400,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 95,
      "problem_solving_score": 82,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 148,
      "time_span_days": 23,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 3,
      "authenticity_score": 97,
      "summary": "148 commits across 23 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 148 organic commits over 23 days with 20% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_182_26603455ebc1"
    }
  },
  {
    "candidate_id": "cand_fresher_183",
    "name": "Akanksha Bhatia",
    "anonymised_name": "Fresher Candidate #183 (A. Bhatia)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-183/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 21016,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 80,
      "problem_solving_score": 82,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 67,
      "time_span_days": 49,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 5,
      "authenticity_score": 93,
      "summary": "67 commits across 49 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 67 organic commits over 49 days with 20% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_183_4b93d2a1fd17"
    }
  },
  {
    "candidate_id": "cand_fresher_184",
    "name": "Varun Chawla",
    "anonymised_name": "Fresher Candidate #184 (V. Chawla)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-184/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 24996,
    "authenticity_score": 15,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_184",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.85,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 50,
      "aptitude_score": 53,
      "problem_solving_score": 40,
      "composite_assessment": 48
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 24,
      "test_files_detected": 0,
      "authenticity_score": 15,
      "summary": "1 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (15% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 85% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_184_822282354541"
    }
  },
  {
    "candidate_id": "cand_fresher_185",
    "name": "Aarav Kumar",
    "anonymised_name": "Fresher Candidate #185 (A. Kumar)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-185/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 12777,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 98,
      "problem_solving_score": 70,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 123,
      "time_span_days": 30,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 4,
      "authenticity_score": 84,
      "summary": "123 commits across 30 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 123 organic commits over 30 days with 39% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_185_26e01363e8a1"
    }
  },
  {
    "candidate_id": "cand_fresher_186",
    "name": "Aditya Saxena",
    "anonymised_name": "Fresher Candidate #186 (A. Saxena)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-186/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 5579,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 91,
      "problem_solving_score": 93,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 42,
      "time_span_days": 77,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 4,
      "authenticity_score": 92,
      "summary": "42 commits across 77 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 42 organic commits over 77 days with 22% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_186_d59b3fe8726d"
    }
  },
  {
    "candidate_id": "cand_fresher_187",
    "name": "Akanksha Sharma",
    "anonymised_name": "Fresher Candidate #187 (A. Sharma)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-187/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 9156,
    "authenticity_score": 24,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_187",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.76,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 70,
      "problem_solving_score": 53,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 30,
      "test_files_detected": 0,
      "authenticity_score": 24,
      "summary": "2 commits across 1 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (24% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 76% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_187_ef91f9b076da"
    }
  },
  {
    "candidate_id": "cand_fresher_188",
    "name": "Siddharth Bhatia",
    "anonymised_name": "Fresher Candidate #188 (S. Bhatia)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-188/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 30537,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 82,
      "problem_solving_score": 72,
      "composite_assessment": 75
    },
    "git_dna": {
      "total_commits": 58,
      "time_span_days": 78,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 11,
      "authenticity_score": 94,
      "summary": "58 commits across 78 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 58 organic commits over 78 days with 19% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_188_755123d40e86"
    }
  },
  {
    "candidate_id": "cand_fresher_189",
    "name": "Tanvi Mishra",
    "anonymised_name": "Fresher Candidate #189 (T. Mishra)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-189/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 27224,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_189",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 65,
      "problem_solving_score": 64,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 26,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "3 commits across 3 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 79% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_189_0b89e1df9b44"
    }
  },
  {
    "candidate_id": "cand_fresher_190",
    "name": "Deepika Malhotra",
    "anonymised_name": "Fresher Candidate #190 (D. Malhotra)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-190/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 5206,
    "authenticity_score": 32,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_190",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.68,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 73,
      "problem_solving_score": 49,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.85,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 26,
      "test_files_detected": 0,
      "authenticity_score": 32,
      "summary": "1 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (32% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 68% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_190_6ce78b87d1b8"
    }
  },
  {
    "candidate_id": "cand_fresher_191",
    "name": "Abhishek Malhotra",
    "anonymised_name": "Fresher Candidate #191 (A. Malhotra)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-191/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 18361,
    "authenticity_score": 78,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 88,
      "problem_solving_score": 73,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 87,
      "time_span_days": 80,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 14,
      "authenticity_score": 78,
      "summary": "87 commits across 80 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (78% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 78% Git-DNA originality across 87 organic commits over 80 days with 39% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_191_1f45aa6e1716"
    }
  },
  {
    "candidate_id": "cand_fresher_192",
    "name": "Kunal Verma",
    "anonymised_name": "Fresher Candidate #192 (K. Verma)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-192/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 10711,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 80,
      "problem_solving_score": 84,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 102,
      "time_span_days": 47,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 14,
      "authenticity_score": 80,
      "summary": "102 commits across 47 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 102 organic commits over 47 days with 40% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_192_4d4177f06eb5"
    }
  },
  {
    "candidate_id": "cand_fresher_193",
    "name": "Ananya Gupta",
    "anonymised_name": "Fresher Candidate #193 (A. Gupta)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-193/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 16982,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_193",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 51,
      "aptitude_score": 64,
      "problem_solving_score": 49,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 28,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "3 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 74% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_193_fb039e420eb1"
    }
  },
  {
    "candidate_id": "cand_fresher_194",
    "name": "Karan Verma",
    "anonymised_name": "Fresher Candidate #194 (K. Verma)",
    "college": "IIT Kharagpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-194/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 2818,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_194",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 54,
      "aptitude_score": 58,
      "problem_solving_score": 45,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "2 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 84% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_194_40ea37f63491"
    }
  },
  {
    "candidate_id": "cand_fresher_195",
    "name": "Simran Kapoor",
    "anonymised_name": "Fresher Candidate #195 (S. Kapoor)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-195/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 24288,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 82,
      "problem_solving_score": 81,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 31,
      "time_span_days": 21,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.42,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 0,
      "authenticity_score": 80,
      "summary": "31 commits across 21 days. Refactor ratio: 42%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 31 organic commits over 21 days with 42% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_195_7fdcc778173e"
    }
  },
  {
    "candidate_id": "cand_fresher_196",
    "name": "Ayush Tripathi",
    "anonymised_name": "Fresher Candidate #196 (A. Tripathi)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-196/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 32081,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 71,
      "problem_solving_score": 75,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 60,
      "time_span_days": 25,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 3,
      "authenticity_score": 82,
      "summary": "60 commits across 25 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 60 organic commits over 25 days with 38% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_196_a7fb9d5fcad5"
    }
  },
  {
    "candidate_id": "cand_fresher_197",
    "name": "Nikhil Pandey",
    "anonymised_name": "Fresher Candidate #197 (N. Pandey)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-197/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 9853,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 89,
      "problem_solving_score": 89,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 82,
      "time_span_days": 37,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 0,
      "authenticity_score": 81,
      "summary": "82 commits across 37 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 82 organic commits over 37 days with 29% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_197_dc6d96f33abb"
    }
  },
  {
    "candidate_id": "cand_fresher_198",
    "name": "Sameer Bhatia",
    "anonymised_name": "Fresher Candidate #198 (S. Bhatia)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-198/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 27845,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_198",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 75,
      "problem_solving_score": 57,
      "composite_assessment": 66
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "2 commits across 3 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 84% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_198_1c6178b51ab6"
    }
  },
  {
    "candidate_id": "cand_fresher_199",
    "name": "Shreya Chawla",
    "anonymised_name": "Fresher Candidate #199 (S. Chawla)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-199/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 3719,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 94,
      "problem_solving_score": 78,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 110,
      "time_span_days": 63,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 3,
      "authenticity_score": 94,
      "summary": "110 commits across 63 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 110 organic commits over 63 days with 19% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_199_3d21924f5ef4"
    }
  },
  {
    "candidate_id": "cand_fresher_200",
    "name": "Abhishek Choudhury",
    "anonymised_name": "Fresher Candidate #200 (A. Choudhury)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-200/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 7570,
    "authenticity_score": 19,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_200",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.81,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 57,
      "aptitude_score": 61,
      "problem_solving_score": 45,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 27,
      "test_files_detected": 0,
      "authenticity_score": 19,
      "summary": "1 commits across 1 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (19% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 81% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_200_18390056ba00"
    }
  },
  {
    "candidate_id": "cand_fresher_201",
    "name": "Ayush Mehta",
    "anonymised_name": "Fresher Candidate #201 (A. Mehta)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-201/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 7552,
    "authenticity_score": 23,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_201",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.77,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 67,
      "problem_solving_score": 49,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 35,
      "test_files_detected": 0,
      "authenticity_score": 23,
      "summary": "2 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (23% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 77% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_201_b7f358615d20"
    }
  },
  {
    "candidate_id": "cand_fresher_202",
    "name": "Aditi Verma",
    "anonymised_name": "Fresher Candidate #202 (A. Verma)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-202/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 6640,
    "authenticity_score": 12,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_202",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.88,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 55,
      "aptitude_score": 51,
      "problem_solving_score": 40,
      "composite_assessment": 49
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 38,
      "test_files_detected": 0,
      "authenticity_score": 12,
      "summary": "2 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (12% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 88% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_202_4da58cf67654"
    }
  },
  {
    "candidate_id": "cand_fresher_203",
    "name": "Harsh Patel",
    "anonymised_name": "Fresher Candidate #203 (H. Patel)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-203/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 33278,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 85,
      "aptitude_score": 95,
      "problem_solving_score": 90,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 178,
      "time_span_days": 26,
      "burst_ratio": 0.35,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 14,
      "authenticity_score": 97,
      "summary": "178 commits across 26 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 178 organic commits over 26 days with 26% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_203_c3f44efd0ccd"
    }
  },
  {
    "candidate_id": "cand_fresher_204",
    "name": "Isha Kumar",
    "anonymised_name": "Fresher Candidate #204 (I. Kumar)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-204/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 32886,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 70,
      "problem_solving_score": 92,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 72,
      "time_span_days": 62,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 0,
      "authenticity_score": 83,
      "summary": "72 commits across 62 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 72 organic commits over 62 days with 35% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_204_e78a19c8dc78"
    }
  },
  {
    "candidate_id": "cand_fresher_205",
    "name": "Kunal Tripathi",
    "anonymised_name": "Fresher Candidate #205 (K. Tripathi)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-205/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 22646,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 80,
      "problem_solving_score": 75,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 172,
      "time_span_days": 27,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 6,
      "authenticity_score": 95,
      "summary": "172 commits across 27 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 172 organic commits over 27 days with 21% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_205_082594922d1d"
    }
  },
  {
    "candidate_id": "cand_fresher_206",
    "name": "Manish Reddy",
    "anonymised_name": "Fresher Candidate #206 (M. Reddy)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-206/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 13309,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 85,
      "aptitude_score": 85,
      "problem_solving_score": 82,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 55,
      "time_span_days": 14,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 5,
      "authenticity_score": 87,
      "summary": "55 commits across 14 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 55 organic commits over 14 days with 29% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_206_291f21b4f2cc"
    }
  },
  {
    "candidate_id": "cand_fresher_207",
    "name": "Shreya Patel",
    "anonymised_name": "Fresher Candidate #207 (S. Patel)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-207/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 30895,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_207",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 60,
      "problem_solving_score": 45,
      "composite_assessment": 50
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.89,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "3 commits across 1 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 63% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_207_f2788df027cc"
    }
  },
  {
    "candidate_id": "cand_fresher_208",
    "name": "Pooja Pandey",
    "anonymised_name": "Fresher Candidate #208 (P. Pandey)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-208/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 8535,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 73,
      "problem_solving_score": 80,
      "composite_assessment": 75
    },
    "git_dna": {
      "total_commits": 35,
      "time_span_days": 69,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 5,
      "authenticity_score": 95,
      "summary": "35 commits across 69 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 35 organic commits over 69 days with 22% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_208_1184bf75de36"
    }
  },
  {
    "candidate_id": "cand_fresher_209",
    "name": "Anushka Chawla",
    "anonymised_name": "Fresher Candidate #209 (A. Chawla)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-209/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 4671,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 70,
      "problem_solving_score": 83,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 52,
      "time_span_days": 20,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 3,
      "authenticity_score": 85,
      "summary": "52 commits across 20 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 52 organic commits over 20 days with 31% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_209_826b5c4739b5"
    }
  },
  {
    "candidate_id": "cand_fresher_210",
    "name": "Swati Nair",
    "anonymised_name": "Fresher Candidate #210 (S. Nair)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-210/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 22832,
    "authenticity_score": 14,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_210",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.86,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 66,
      "aptitude_score": 58,
      "problem_solving_score": 42,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 37,
      "test_files_detected": 0,
      "authenticity_score": 14,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (14% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 86% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_210_fb70010a75b5"
    }
  },
  {
    "candidate_id": "cand_fresher_211",
    "name": "Shreya Kumar",
    "anonymised_name": "Fresher Candidate #211 (S. Kumar)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-211/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 24621,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_211",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 54,
      "problem_solving_score": 64,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "4 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 80% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_211_e6fe782e55f3"
    }
  },
  {
    "candidate_id": "cand_fresher_212",
    "name": "Sneha Verma",
    "anonymised_name": "Fresher Candidate #212 (S. Verma)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-212/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 20566,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 97,
      "problem_solving_score": 85,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 169,
      "time_span_days": 21,
      "burst_ratio": 0.5,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 11,
      "authenticity_score": 94,
      "summary": "169 commits across 21 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 169 organic commits over 21 days with 38% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_212_21e7a3009030"
    }
  },
  {
    "candidate_id": "cand_fresher_213",
    "name": "Ritika Mishra",
    "anonymised_name": "Fresher Candidate #213 (R. Mishra)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-213/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 5934,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 95,
      "problem_solving_score": 76,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 65,
      "time_span_days": 29,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 5,
      "authenticity_score": 92,
      "summary": "65 commits across 29 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 65 organic commits over 29 days with 29% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_213_fc37593d1963"
    }
  },
  {
    "candidate_id": "cand_fresher_214",
    "name": "Nikhil Verma",
    "anonymised_name": "Fresher Candidate #214 (N. Verma)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-214/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 19889,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 87,
      "problem_solving_score": 82,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 180,
      "time_span_days": 47,
      "burst_ratio": 0.35,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 4,
      "authenticity_score": 96,
      "summary": "180 commits across 47 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 180 organic commits over 47 days with 35% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_214_f2f41e10a7c4"
    }
  },
  {
    "candidate_id": "cand_fresher_215",
    "name": "Aditya Saxena",
    "anonymised_name": "Fresher Candidate #215 (A. Saxena)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-215/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 5109,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 75,
      "aptitude_score": 88,
      "problem_solving_score": 94,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 134,
      "time_span_days": 33,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 4,
      "authenticity_score": 89,
      "summary": "134 commits across 33 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 134 organic commits over 33 days with 32% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_215_1dca3474d622"
    }
  },
  {
    "candidate_id": "cand_fresher_216",
    "name": "Deepika Choudhury",
    "anonymised_name": "Fresher Candidate #216 (D. Choudhury)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-216/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 14769,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 94,
      "aptitude_score": 82,
      "problem_solving_score": 71,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 149,
      "time_span_days": 18,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 13,
      "authenticity_score": 94,
      "summary": "149 commits across 18 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 149 organic commits over 18 days with 28% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_216_d3c11b515093"
    }
  },
  {
    "candidate_id": "cand_fresher_217",
    "name": "Siddharth Awasthi",
    "anonymised_name": "Fresher Candidate #217 (S. Awasthi)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-217/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 33723,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_217",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 54,
      "problem_solving_score": 49,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 43,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "4 commits across 3 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 79% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_217_2353a17693b0"
    }
  },
  {
    "candidate_id": "cand_fresher_218",
    "name": "Simran Mehta",
    "anonymised_name": "Fresher Candidate #218 (S. Mehta)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-218/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 3950,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 95,
      "problem_solving_score": 75,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 82,
      "time_span_days": 66,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 3,
      "authenticity_score": 82,
      "summary": "82 commits across 66 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 82 organic commits over 66 days with 36% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_218_57c17860fadc"
    }
  },
  {
    "candidate_id": "cand_fresher_219",
    "name": "Akanksha Joshi",
    "anonymised_name": "Fresher Candidate #219 (A. Joshi)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-219/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 10777,
    "authenticity_score": 38,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_219",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.62,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 56,
      "aptitude_score": 72,
      "problem_solving_score": 46,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.85,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 31,
      "test_files_detected": 0,
      "authenticity_score": 38,
      "summary": "1 commits across 1 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (38% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 62% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_219_1f5895d99a1a"
    }
  },
  {
    "candidate_id": "cand_fresher_220",
    "name": "Amit Saxena",
    "anonymised_name": "Fresher Candidate #220 (A. Saxena)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-220/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 29025,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_220",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 50,
      "aptitude_score": 58,
      "problem_solving_score": 63,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "2 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 69% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_220_6f1bded3d3ea"
    }
  },
  {
    "candidate_id": "cand_fresher_221",
    "name": "Vikram Mishra",
    "anonymised_name": "Fresher Candidate #221 (V. Mishra)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-221/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 2091,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 94,
      "problem_solving_score": 91,
      "composite_assessment": 94
    },
    "git_dna": {
      "total_commits": 85,
      "time_span_days": 40,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 0,
      "authenticity_score": 82,
      "summary": "85 commits across 40 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 85 organic commits over 40 days with 28% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_221_4bf035d019e1"
    }
  },
  {
    "candidate_id": "cand_fresher_222",
    "name": "Neha Trivedi",
    "anonymised_name": "Fresher Candidate #222 (N. Trivedi)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-222/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 17092,
    "authenticity_score": 34,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_222",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.66,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 58,
      "problem_solving_score": 46,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 29,
      "test_files_detected": 0,
      "authenticity_score": 34,
      "summary": "3 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (34% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 66% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_222_9abbb572bbfe"
    }
  },
  {
    "candidate_id": "cand_fresher_223",
    "name": "Abhishek Banerjee",
    "anonymised_name": "Fresher Candidate #223 (A. Banerjee)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-223/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 22791,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 80,
      "problem_solving_score": 78,
      "composite_assessment": 77
    },
    "git_dna": {
      "total_commits": 171,
      "time_span_days": 90,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.25,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 0,
      "authenticity_score": 97,
      "summary": "171 commits across 90 days. Refactor ratio: 25%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 171 organic commits over 90 days with 25% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_223_47e9bd40b680"
    }
  },
  {
    "candidate_id": "cand_fresher_224",
    "name": "Aditya Chatterjee",
    "anonymised_name": "Fresher Candidate #224 (A. Chatterjee)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-224/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 11486,
    "authenticity_score": 13,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_224",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.87,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 45,
      "aptitude_score": 70,
      "problem_solving_score": 55,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.89,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 28,
      "test_files_detected": 0,
      "authenticity_score": 13,
      "summary": "4 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (13% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 87% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_224_f84002fb243f"
    }
  },
  {
    "candidate_id": "cand_fresher_225",
    "name": "Anushka Joshi",
    "anonymised_name": "Fresher Candidate #225 (A. Joshi)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-225/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 29502,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 86,
      "problem_solving_score": 79,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 115,
      "time_span_days": 42,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 13,
      "authenticity_score": 94,
      "summary": "115 commits across 42 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 115 organic commits over 42 days with 33% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_225_de830534a97d"
    }
  },
  {
    "candidate_id": "cand_fresher_226",
    "name": "Mohit Kumar",
    "anonymised_name": "Fresher Candidate #226 (M. Kumar)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-226/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 13979,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 98,
      "problem_solving_score": 80,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 113,
      "time_span_days": 25,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 9,
      "authenticity_score": 93,
      "summary": "113 commits across 25 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 113 organic commits over 25 days with 23% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_226_f9e0e26ba91a"
    }
  },
  {
    "candidate_id": "cand_fresher_227",
    "name": "Ayush Mishra",
    "anonymised_name": "Fresher Candidate #227 (A. Mishra)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-227/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 11576,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_227",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 66,
      "aptitude_score": 62,
      "problem_solving_score": 56,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 33,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 70% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_227_f8c3e4a5ca52"
    }
  },
  {
    "candidate_id": "cand_fresher_228",
    "name": "Rohan Singh",
    "anonymised_name": "Fresher Candidate #228 (R. Singh)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-228/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 12069,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 90,
      "problem_solving_score": 75,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 64,
      "time_span_days": 54,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 0,
      "authenticity_score": 94,
      "summary": "64 commits across 54 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 64 organic commits over 54 days with 22% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_228_ca61c8bd6888"
    }
  },
  {
    "candidate_id": "cand_fresher_229",
    "name": "Aarav Reddy",
    "anonymised_name": "Fresher Candidate #229 (A. Reddy)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-229/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 8334,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 71,
      "problem_solving_score": 87,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 61,
      "time_span_days": 69,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 9,
      "authenticity_score": 91,
      "summary": "61 commits across 69 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 61 organic commits over 69 days with 28% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_229_b72bcb2437f1"
    }
  },
  {
    "candidate_id": "cand_fresher_230",
    "name": "Aarav Mehta",
    "anonymised_name": "Fresher Candidate #230 (A. Mehta)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-230/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 18293,
    "authenticity_score": 32,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_230",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.68,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 49,
      "aptitude_score": 53,
      "problem_solving_score": 52,
      "composite_assessment": 51
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 38,
      "test_files_detected": 0,
      "authenticity_score": 32,
      "summary": "2 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (32% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 68% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_230_98cd056ddf84"
    }
  },
  {
    "candidate_id": "cand_fresher_231",
    "name": "Varun Kumar",
    "anonymised_name": "Fresher Candidate #231 (V. Kumar)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-231/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 7974,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 81,
      "problem_solving_score": 94,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 180,
      "time_span_days": 81,
      "burst_ratio": 0.35,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 8,
      "authenticity_score": 90,
      "summary": "180 commits across 81 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 180 organic commits over 81 days with 39% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_231_9c896a407cbf"
    }
  },
  {
    "candidate_id": "cand_fresher_232",
    "name": "Kunal Sharma",
    "anonymised_name": "Fresher Candidate #232 (K. Sharma)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-232/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 19322,
    "authenticity_score": 94,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 92,
      "aptitude_score": 78,
      "problem_solving_score": 94,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 71,
      "time_span_days": 29,
      "burst_ratio": 0.36,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 0,
      "authenticity_score": 94,
      "summary": "71 commits across 29 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (94% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 94% Git-DNA originality across 71 organic commits over 29 days with 34% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_232_9be90e2dcad8"
    }
  },
  {
    "candidate_id": "cand_fresher_233",
    "name": "Swati Awasthi",
    "anonymised_name": "Fresher Candidate #233 (S. Awasthi)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-233/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 11666,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 90,
      "problem_solving_score": 70,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 125,
      "time_span_days": 29,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 14,
      "authenticity_score": 89,
      "summary": "125 commits across 29 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 125 organic commits over 29 days with 29% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_233_f01fb98aa664"
    }
  },
  {
    "candidate_id": "cand_fresher_234",
    "name": "Sneha Deshmukh",
    "anonymised_name": "Fresher Candidate #234 (S. Deshmukh)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-234/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 29046,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 94,
      "problem_solving_score": 78,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 158,
      "time_span_days": 29,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 12,
      "authenticity_score": 89,
      "summary": "158 commits across 29 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 158 organic commits over 29 days with 37% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_234_a9e938bdbe58"
    }
  },
  {
    "candidate_id": "cand_fresher_235",
    "name": "Kavya Choudhury",
    "anonymised_name": "Fresher Candidate #235 (K. Choudhury)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-235/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 23722,
    "authenticity_score": 18,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_235",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.82,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 53,
      "problem_solving_score": 58,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 35,
      "test_files_detected": 0,
      "authenticity_score": 18,
      "summary": "4 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (18% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 82% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_235_651e67514ac1"
    }
  },
  {
    "candidate_id": "cand_fresher_236",
    "name": "Harsh Verma",
    "anonymised_name": "Fresher Candidate #236 (H. Verma)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-236/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 23976,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 81,
      "problem_solving_score": 95,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 144,
      "time_span_days": 51,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 3,
      "authenticity_score": 96,
      "summary": "144 commits across 51 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 144 organic commits over 51 days with 19% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_236_68cc2e81a853"
    }
  },
  {
    "candidate_id": "cand_fresher_237",
    "name": "Nikhil Pandey",
    "anonymised_name": "Fresher Candidate #237 (N. Pandey)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-237/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 13030,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 81,
      "problem_solving_score": 96,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 112,
      "time_span_days": 59,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 14,
      "authenticity_score": 97,
      "summary": "112 commits across 59 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 112 organic commits over 59 days with 41% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_237_a1fbd5120418"
    }
  },
  {
    "candidate_id": "cand_fresher_238",
    "name": "Karan Joshi",
    "anonymised_name": "Fresher Candidate #238 (K. Joshi)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-238/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 31659,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 77,
      "aptitude_score": 73,
      "problem_solving_score": 83,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 135,
      "time_span_days": 35,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 0,
      "authenticity_score": 98,
      "summary": "135 commits across 35 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 135 organic commits over 35 days with 35% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_238_dbe9e047b410"
    }
  },
  {
    "candidate_id": "cand_fresher_239",
    "name": "Ritika Tripathi",
    "anonymised_name": "Fresher Candidate #239 (R. Tripathi)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-239/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 23262,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 72,
      "problem_solving_score": 78,
      "composite_assessment": 74
    },
    "git_dna": {
      "total_commits": 35,
      "time_span_days": 30,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 10,
      "authenticity_score": 87,
      "summary": "35 commits across 30 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 35 organic commits over 30 days with 30% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_239_702689521155"
    }
  },
  {
    "candidate_id": "cand_fresher_240",
    "name": "Aarav Chawla",
    "anonymised_name": "Fresher Candidate #240 (A. Chawla)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-240/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 23548,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 85,
      "problem_solving_score": 81,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 160,
      "time_span_days": 80,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 14,
      "authenticity_score": 83,
      "summary": "160 commits across 80 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 160 organic commits over 80 days with 33% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_240_eca071eed4d0"
    }
  },
  {
    "candidate_id": "cand_fresher_241",
    "name": "Harsh Kapoor",
    "anonymised_name": "Fresher Candidate #241 (H. Kapoor)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-241/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 3449,
    "authenticity_score": 28,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_241",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.72,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 60,
      "problem_solving_score": 48,
      "composite_assessment": 53
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.86,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 36,
      "test_files_detected": 0,
      "authenticity_score": 28,
      "summary": "4 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (28% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 72% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_241_587c1ab737b2"
    }
  },
  {
    "candidate_id": "cand_fresher_242",
    "name": "Meera Kapoor",
    "anonymised_name": "Fresher Candidate #242 (M. Kapoor)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-242/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 23209,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_242",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 48,
      "aptitude_score": 65,
      "problem_solving_score": 63,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "4 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 63% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_242_79246e034c1f"
    }
  },
  {
    "candidate_id": "cand_fresher_243",
    "name": "Sneha Joshi",
    "anonymised_name": "Fresher Candidate #243 (S. Joshi)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-243/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 28843,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_243",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 60,
      "problem_solving_score": 51,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 21,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "3 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 63% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_243_711324711b8c"
    }
  },
  {
    "candidate_id": "cand_fresher_244",
    "name": "Meera Reddy",
    "anonymised_name": "Fresher Candidate #244 (M. Reddy)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-244/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 33402,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 96,
      "problem_solving_score": 90,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 143,
      "time_span_days": 28,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 0,
      "authenticity_score": 97,
      "summary": "143 commits across 28 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 143 organic commits over 28 days with 34% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_244_edcec71ef998"
    }
  },
  {
    "candidate_id": "cand_fresher_245",
    "name": "Mohit Saxena",
    "anonymised_name": "Fresher Candidate #245 (M. Saxena)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-245/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 28818,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 76,
      "problem_solving_score": 84,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 132,
      "time_span_days": 27,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 0,
      "authenticity_score": 91,
      "summary": "132 commits across 27 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 132 organic commits over 27 days with 23% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_245_42a8df188023"
    }
  },
  {
    "candidate_id": "cand_fresher_246",
    "name": "Manish Patel",
    "anonymised_name": "Fresher Candidate #246 (M. Patel)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-246/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 17624,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_246",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 63,
      "problem_solving_score": 58,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.85,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 36,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "2 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 74% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_246_5d3ac98741f6"
    }
  },
  {
    "candidate_id": "cand_fresher_247",
    "name": "Arjun Chawla",
    "anonymised_name": "Fresher Candidate #247 (A. Chawla)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-247/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 14837,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 77,
      "problem_solving_score": 78,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 110,
      "time_span_days": 78,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 14,
      "authenticity_score": 95,
      "summary": "110 commits across 78 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 110 organic commits over 78 days with 28% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_247_bc0b0d5418b2"
    }
  },
  {
    "candidate_id": "cand_fresher_248",
    "name": "Tanvi Reddy",
    "anonymised_name": "Fresher Candidate #248 (T. Reddy)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-248/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 11321,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 89,
      "problem_solving_score": 92,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 168,
      "time_span_days": 54,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 6,
      "authenticity_score": 92,
      "summary": "168 commits across 54 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 168 organic commits over 54 days with 40% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_248_f5df0bedcf7e"
    }
  },
  {
    "candidate_id": "cand_fresher_249",
    "name": "Neha Chawla",
    "anonymised_name": "Fresher Candidate #249 (N. Chawla)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-249/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 31090,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 85,
      "aptitude_score": 91,
      "problem_solving_score": 93,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 57,
      "time_span_days": 59,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 14,
      "authenticity_score": 96,
      "summary": "57 commits across 59 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 57 organic commits over 59 days with 32% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_249_17f9119990c4"
    }
  },
  {
    "candidate_id": "cand_fresher_250",
    "name": "Tanvi Bhatia",
    "anonymised_name": "Fresher Candidate #250 (T. Bhatia)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-250/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 6598,
    "authenticity_score": 13,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_250",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.87,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 54,
      "aptitude_score": 71,
      "problem_solving_score": 48,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.89,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 21,
      "test_files_detected": 0,
      "authenticity_score": 13,
      "summary": "1 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (13% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 87% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_250_897fdd17b93f"
    }
  },
  {
    "candidate_id": "cand_fresher_251",
    "name": "Tanvi Gupta",
    "anonymised_name": "Fresher Candidate #251 (T. Gupta)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-251/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 3339,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 92,
      "problem_solving_score": 91,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 171,
      "time_span_days": 42,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 14,
      "authenticity_score": 79,
      "summary": "171 commits across 42 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 171 organic commits over 42 days with 31% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_251_3fb472560681"
    }
  },
  {
    "candidate_id": "cand_fresher_252",
    "name": "Shreya Bhatia",
    "anonymised_name": "Fresher Candidate #252 (S. Bhatia)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-252/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 21080,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_252",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 61,
      "problem_solving_score": 64,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 37,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "4 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 80% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_252_78086bd1c790"
    }
  },
  {
    "candidate_id": "cand_fresher_253",
    "name": "Swati Gupta",
    "anonymised_name": "Fresher Candidate #253 (S. Gupta)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-253/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 6062,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 87,
      "problem_solving_score": 78,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 75,
      "time_span_days": 36,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 0,
      "authenticity_score": 97,
      "summary": "75 commits across 36 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 75 organic commits over 36 days with 21% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_253_b73dc7b5c6a0"
    }
  },
  {
    "candidate_id": "cand_fresher_254",
    "name": "Ayush Chatterjee",
    "anonymised_name": "Fresher Candidate #254 (A. Chatterjee)",
    "college": "IIIT Hyderabad",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-254/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 12215,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_254",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 75,
      "problem_solving_score": 62,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 36,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "3 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 69% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_254_e43ec9b4d7d7"
    }
  },
  {
    "candidate_id": "cand_fresher_255",
    "name": "Meera Kumar",
    "anonymised_name": "Fresher Candidate #255 (M. Kumar)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-255/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 22059,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 76,
      "problem_solving_score": 94,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 51,
      "time_span_days": 58,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 8,
      "authenticity_score": 93,
      "summary": "51 commits across 58 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 51 organic commits over 58 days with 23% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_255_b309a82ce2a1"
    }
  },
  {
    "candidate_id": "cand_fresher_256",
    "name": "Ritika Kapoor",
    "anonymised_name": "Fresher Candidate #256 (R. Kapoor)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-256/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 25523,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 78,
      "problem_solving_score": 87,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 185,
      "time_span_days": 45,
      "burst_ratio": 0.54,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 4,
      "authenticity_score": 90,
      "summary": "185 commits across 45 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 185 organic commits over 45 days with 34% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_256_e5f0b438e4bc"
    }
  },
  {
    "candidate_id": "cand_fresher_257",
    "name": "Priyanshu Saxena",
    "anonymised_name": "Fresher Candidate #257 (P. Saxena)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-257/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 19272,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 77,
      "aptitude_score": 94,
      "problem_solving_score": 87,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 39,
      "time_span_days": 51,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 4,
      "authenticity_score": 90,
      "summary": "39 commits across 51 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 39 organic commits over 51 days with 23% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_257_cf30aec659df"
    }
  },
  {
    "candidate_id": "cand_fresher_258",
    "name": "Ananya Gupta",
    "anonymised_name": "Fresher Candidate #258 (A. Gupta)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-258/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 3578,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 72,
      "problem_solving_score": 72,
      "composite_assessment": 72
    },
    "git_dna": {
      "total_commits": 139,
      "time_span_days": 23,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 8,
      "authenticity_score": 82,
      "summary": "139 commits across 23 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 139 organic commits over 23 days with 22% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_258_dba0cedd4054"
    }
  },
  {
    "candidate_id": "cand_fresher_259",
    "name": "Riya Kapoor",
    "anonymised_name": "Fresher Candidate #259 (R. Kapoor)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-259/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 26571,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 89,
      "problem_solving_score": 72,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 138,
      "time_span_days": 54,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 13,
      "authenticity_score": 90,
      "summary": "138 commits across 54 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 138 organic commits over 54 days with 34% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_259_15a00831c999"
    }
  },
  {
    "candidate_id": "cand_fresher_260",
    "name": "Aditi Chawla",
    "anonymised_name": "Fresher Candidate #260 (A. Chawla)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-260/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 17331,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_260",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 57,
      "aptitude_score": 71,
      "problem_solving_score": 40,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 79% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_260_57365625e38a"
    }
  },
  {
    "candidate_id": "cand_fresher_261",
    "name": "Deepika Malhotra",
    "anonymised_name": "Fresher Candidate #261 (D. Malhotra)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-261/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 20566,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_261",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 48,
      "aptitude_score": 51,
      "problem_solving_score": 40,
      "composite_assessment": 46
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 39,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "3 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 84% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_261_3f7431cbd29d"
    }
  },
  {
    "candidate_id": "cand_fresher_262",
    "name": "Kunal Kapoor",
    "anonymised_name": "Fresher Candidate #262 (K. Kapoor)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-262/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 9034,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_262",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 49,
      "aptitude_score": 55,
      "problem_solving_score": 45,
      "composite_assessment": 50
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 39,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "2 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 65% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_262_53e6ceac42d4"
    }
  },
  {
    "candidate_id": "cand_fresher_263",
    "name": "Riya Gupta",
    "anonymised_name": "Fresher Candidate #263 (R. Gupta)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-263/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 32980,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 88,
      "problem_solving_score": 85,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 168,
      "time_span_days": 23,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 0,
      "authenticity_score": 93,
      "summary": "168 commits across 23 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 168 organic commits over 23 days with 20% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_263_9d4c8d445c54"
    }
  },
  {
    "candidate_id": "cand_fresher_264",
    "name": "Divya Singh",
    "anonymised_name": "Fresher Candidate #264 (D. Singh)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-264/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 20332,
    "authenticity_score": 18,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_264",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.82,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 67,
      "aptitude_score": 68,
      "problem_solving_score": 44,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 38,
      "test_files_detected": 0,
      "authenticity_score": 18,
      "summary": "4 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (18% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 82% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_264_b38488ecf9f5"
    }
  },
  {
    "candidate_id": "cand_fresher_265",
    "name": "Gaurav Mehta",
    "anonymised_name": "Fresher Candidate #265 (G. Mehta)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-265/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 11809,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 81,
      "problem_solving_score": 94,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 98,
      "time_span_days": 60,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 10,
      "authenticity_score": 83,
      "summary": "98 commits across 60 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 98 organic commits over 60 days with 36% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_265_3f588a1164bf"
    }
  },
  {
    "candidate_id": "cand_fresher_266",
    "name": "Mohit Patel",
    "anonymised_name": "Fresher Candidate #266 (M. Patel)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-266/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 28428,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 90,
      "problem_solving_score": 70,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 78,
      "time_span_days": 47,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 3,
      "authenticity_score": 80,
      "summary": "78 commits across 47 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 78 organic commits over 47 days with 33% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_266_a0c0ea868342"
    }
  },
  {
    "candidate_id": "cand_fresher_267",
    "name": "Ayush Joshi",
    "anonymised_name": "Fresher Candidate #267 (A. Joshi)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-267/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 18220,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 74,
      "problem_solving_score": 84,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 148,
      "time_span_days": 33,
      "burst_ratio": 0.36,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 14,
      "authenticity_score": 93,
      "summary": "148 commits across 33 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 148 organic commits over 33 days with 23% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_267_a1eb2a70abeb"
    }
  },
  {
    "candidate_id": "cand_fresher_268",
    "name": "Vikram Joshi",
    "anonymised_name": "Fresher Candidate #268 (V. Joshi)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-268/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 17643,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 93,
      "problem_solving_score": 93,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 159,
      "time_span_days": 31,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 13,
      "authenticity_score": 95,
      "summary": "159 commits across 31 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 159 organic commits over 31 days with 22% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_268_d84817b2e74f"
    }
  },
  {
    "candidate_id": "cand_fresher_269",
    "name": "Aditi Malhotra",
    "anonymised_name": "Fresher Candidate #269 (A. Malhotra)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-269/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 3107,
    "authenticity_score": 13,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_269",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.87,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 64,
      "problem_solving_score": 41,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 13,
      "summary": "2 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (13% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 87% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_269_ccde80af1a0d"
    }
  },
  {
    "candidate_id": "cand_fresher_270",
    "name": "Isha Patel",
    "anonymised_name": "Fresher Candidate #270 (I. Patel)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-270/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 10043,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 72,
      "problem_solving_score": 86,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 167,
      "time_span_days": 86,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 13,
      "authenticity_score": 84,
      "summary": "167 commits across 86 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 167 organic commits over 86 days with 34% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_270_21a515e390cb"
    }
  },
  {
    "candidate_id": "cand_fresher_271",
    "name": "Meera Saxena",
    "anonymised_name": "Fresher Candidate #271 (M. Saxena)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-271/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 6956,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 74,
      "problem_solving_score": 75,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 156,
      "time_span_days": 31,
      "burst_ratio": 0.38,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 7,
      "authenticity_score": 95,
      "summary": "156 commits across 31 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 156 organic commits over 31 days with 24% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_271_8c31baa48a00"
    }
  },
  {
    "candidate_id": "cand_fresher_272",
    "name": "Swati Chawla",
    "anonymised_name": "Fresher Candidate #272 (S. Chawla)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-272/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 20592,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 71,
      "problem_solving_score": 74,
      "composite_assessment": 75
    },
    "git_dna": {
      "total_commits": 150,
      "time_span_days": 75,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 96,
      "test_files_detected": 3,
      "authenticity_score": 79,
      "summary": "150 commits across 75 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 150 organic commits over 75 days with 22% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_272_49173ad3b06c"
    }
  },
  {
    "candidate_id": "cand_fresher_273",
    "name": "Pooja Singh",
    "anonymised_name": "Fresher Candidate #273 (P. Singh)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-273/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 28712,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_273",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 73,
      "problem_solving_score": 61,
      "composite_assessment": 67
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.99,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 29,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "4 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 80% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_273_baad601153c5"
    }
  },
  {
    "candidate_id": "cand_fresher_274",
    "name": "Vikram Gupta",
    "anonymised_name": "Fresher Candidate #274 (V. Gupta)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-274/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 32023,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_274",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 71,
      "problem_solving_score": 50,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "2 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 69% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_274_e0521252c13e"
    }
  },
  {
    "candidate_id": "cand_fresher_275",
    "name": "Swati Tripathi",
    "anonymised_name": "Fresher Candidate #275 (S. Tripathi)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-275/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 30562,
    "authenticity_score": 18,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_275",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.82,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 69,
      "problem_solving_score": 41,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 45,
      "test_files_detected": 0,
      "authenticity_score": 18,
      "summary": "4 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (18% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 82% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_275_b8c6285c93f5"
    }
  },
  {
    "candidate_id": "cand_fresher_276",
    "name": "Deepika Saxena",
    "anonymised_name": "Fresher Candidate #276 (D. Saxena)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-276/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 32550,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 83,
      "problem_solving_score": 77,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 28,
      "time_span_days": 69,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 0,
      "authenticity_score": 95,
      "summary": "28 commits across 69 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 28 organic commits over 69 days with 27% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_276_316965cf0ae6"
    }
  },
  {
    "candidate_id": "cand_fresher_277",
    "name": "Shreya Choudhury",
    "anonymised_name": "Fresher Candidate #277 (S. Choudhury)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-277/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 27667,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 92,
      "problem_solving_score": 93,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 87,
      "time_span_days": 24,
      "burst_ratio": 0.33,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 6,
      "authenticity_score": 84,
      "summary": "87 commits across 24 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 87 organic commits over 24 days with 39% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_277_067f35a27376"
    }
  },
  {
    "candidate_id": "cand_fresher_278",
    "name": "Aayushi Saxena",
    "anonymised_name": "Fresher Candidate #278 (A. Saxena)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-278/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 13781,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 83,
      "problem_solving_score": 88,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 132,
      "time_span_days": 60,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 7,
      "authenticity_score": 98,
      "summary": "132 commits across 60 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 132 organic commits over 60 days with 28% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_278_7e1c8af69c7b"
    }
  },
  {
    "candidate_id": "cand_fresher_279",
    "name": "Kunal Gupta",
    "anonymised_name": "Fresher Candidate #279 (K. Gupta)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-279/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 29816,
    "authenticity_score": 29,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_279",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.71,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 57,
      "aptitude_score": 73,
      "problem_solving_score": 44,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 29,
      "summary": "3 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (29% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 71% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_279_642838d9aeda"
    }
  },
  {
    "candidate_id": "cand_fresher_280",
    "name": "Karan Pandey",
    "anonymised_name": "Fresher Candidate #280 (K. Pandey)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-280/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 32138,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_280",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 54,
      "problem_solving_score": 55,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 39,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "1 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 63% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_280_d97f6b86849a"
    }
  },
  {
    "candidate_id": "cand_fresher_281",
    "name": "Nikhil Verma",
    "anonymised_name": "Fresher Candidate #281 (N. Verma)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-281/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 28677,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_281",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 51,
      "problem_solving_score": 64,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "4 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 65% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_281_a18fcd3fdf4e"
    }
  },
  {
    "candidate_id": "cand_fresher_282",
    "name": "Sameer Reddy",
    "anonymised_name": "Fresher Candidate #282 (S. Reddy)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-282/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 33769,
    "authenticity_score": 28,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_282",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.72,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 70,
      "problem_solving_score": 40,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 28,
      "summary": "2 commits across 3 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (28% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 72% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_282_8b2a9e48edc2"
    }
  },
  {
    "candidate_id": "cand_fresher_283",
    "name": "Vikram Chatterjee",
    "anonymised_name": "Fresher Candidate #283 (V. Chatterjee)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-283/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 33365,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 81,
      "problem_solving_score": 81,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 31,
      "time_span_days": 22,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 11,
      "authenticity_score": 82,
      "summary": "31 commits across 22 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 31 organic commits over 22 days with 31% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_283_2dc56b3bb5db"
    }
  },
  {
    "candidate_id": "cand_fresher_284",
    "name": "Meera Banerjee",
    "anonymised_name": "Fresher Candidate #284 (M. Banerjee)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-284/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 30508,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 86,
      "problem_solving_score": 78,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 132,
      "time_span_days": 78,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 4,
      "authenticity_score": 84,
      "summary": "132 commits across 78 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 132 organic commits over 78 days with 20% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_284_1898a00f71c8"
    }
  },
  {
    "candidate_id": "cand_fresher_285",
    "name": "Aayushi Chatterjee",
    "anonymised_name": "Fresher Candidate #285 (A. Chatterjee)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-285/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 27642,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 82,
      "problem_solving_score": 90,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 145,
      "time_span_days": 72,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 7,
      "authenticity_score": 83,
      "summary": "145 commits across 72 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 145 organic commits over 72 days with 39% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_285_b0bc69d259ec"
    }
  },
  {
    "candidate_id": "cand_fresher_286",
    "name": "Meera Mehta",
    "anonymised_name": "Fresher Candidate #286 (M. Mehta)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-286/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 17415,
    "authenticity_score": 98,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 99,
      "problem_solving_score": 75,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 91,
      "time_span_days": 50,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 4,
      "authenticity_score": 98,
      "summary": "91 commits across 50 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (98% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 98% Git-DNA originality across 91 organic commits over 50 days with 34% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_286_dd2feb332d5e"
    }
  },
  {
    "candidate_id": "cand_fresher_287",
    "name": "Divya Gupta",
    "anonymised_name": "Fresher Candidate #287 (D. Gupta)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-287/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 29205,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 96,
      "problem_solving_score": 77,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 155,
      "time_span_days": 39,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 6,
      "authenticity_score": 97,
      "summary": "155 commits across 39 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 155 organic commits over 39 days with 24% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_287_63e7bd1f0c41"
    }
  },
  {
    "candidate_id": "cand_fresher_288",
    "name": "Harsh Patel",
    "anonymised_name": "Fresher Candidate #288 (H. Patel)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-288/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 26843,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 85,
      "problem_solving_score": 75,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 151,
      "time_span_days": 61,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 12,
      "authenticity_score": 93,
      "summary": "151 commits across 61 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 151 organic commits over 61 days with 30% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_288_482f2177cd36"
    }
  },
  {
    "candidate_id": "cand_fresher_289",
    "name": "Aditya Joshi",
    "anonymised_name": "Fresher Candidate #289 (A. Joshi)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-289/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 24680,
    "authenticity_score": 27,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_289",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.73,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 50,
      "aptitude_score": 64,
      "problem_solving_score": 43,
      "composite_assessment": 52
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 36,
      "test_files_detected": 0,
      "authenticity_score": 27,
      "summary": "1 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (27% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 73% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_289_09951ceb73d2"
    }
  },
  {
    "candidate_id": "cand_fresher_290",
    "name": "Amit Mehta",
    "anonymised_name": "Fresher Candidate #290 (A. Mehta)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-290/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 18143,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 81,
      "problem_solving_score": 75,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 120,
      "time_span_days": 47,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 12,
      "authenticity_score": 79,
      "summary": "120 commits across 47 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 120 organic commits over 47 days with 24% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_290_97739eeac90a"
    }
  },
  {
    "candidate_id": "cand_fresher_291",
    "name": "Rahul Bhatia",
    "anonymised_name": "Fresher Candidate #291 (R. Bhatia)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-291/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 9526,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 78,
      "problem_solving_score": 95,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 74,
      "time_span_days": 87,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 4,
      "authenticity_score": 84,
      "summary": "74 commits across 87 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 74 organic commits over 87 days with 32% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_291_e63686126d37"
    }
  },
  {
    "candidate_id": "cand_fresher_292",
    "name": "Nikhil Joshi",
    "anonymised_name": "Fresher Candidate #292 (N. Joshi)",
    "college": "IIT Madras",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-292/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 11631,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 95,
      "problem_solving_score": 85,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 155,
      "time_span_days": 31,
      "burst_ratio": 0.55,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 14,
      "authenticity_score": 81,
      "summary": "155 commits across 31 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 155 organic commits over 31 days with 38% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_292_41d9a4859af8"
    }
  },
  {
    "candidate_id": "cand_fresher_293",
    "name": "Mohit Tripathi",
    "anonymised_name": "Fresher Candidate #293 (M. Tripathi)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-293/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 32334,
    "authenticity_score": 27,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_293",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.73,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 56,
      "aptitude_score": 67,
      "problem_solving_score": 57,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 45,
      "test_files_detected": 0,
      "authenticity_score": 27,
      "summary": "1 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (27% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 73% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_293_f4f7e063ea9e"
    }
  },
  {
    "candidate_id": "cand_fresher_294",
    "name": "Riya Choudhury",
    "anonymised_name": "Fresher Candidate #294 (R. Choudhury)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-294/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 18526,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 80,
      "problem_solving_score": 91,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 175,
      "time_span_days": 87,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 7,
      "authenticity_score": 95,
      "summary": "175 commits across 87 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 175 organic commits over 87 days with 31% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_294_ff7c945266c6"
    }
  },
  {
    "candidate_id": "cand_fresher_295",
    "name": "Simran Verma",
    "anonymised_name": "Fresher Candidate #295 (S. Verma)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-295/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 9278,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 75,
      "problem_solving_score": 80,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 114,
      "time_span_days": 67,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 4,
      "authenticity_score": 80,
      "summary": "114 commits across 67 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 114 organic commits over 67 days with 32% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_295_55aae6e15c0c"
    }
  },
  {
    "candidate_id": "cand_fresher_296",
    "name": "Isha Trivedi",
    "anonymised_name": "Fresher Candidate #296 (I. Trivedi)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-296/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 23493,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 76,
      "aptitude_score": 93,
      "problem_solving_score": 77,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 120,
      "time_span_days": 89,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 3,
      "authenticity_score": 84,
      "summary": "120 commits across 89 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 120 organic commits over 89 days with 29% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_296_27d78ff4158f"
    }
  },
  {
    "candidate_id": "cand_fresher_297",
    "name": "Vikram Gupta",
    "anonymised_name": "Fresher Candidate #297 (V. Gupta)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-297/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 6888,
    "authenticity_score": 29,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_297",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.71,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 48,
      "aptitude_score": 58,
      "problem_solving_score": 59,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 29,
      "summary": "1 commits across 2 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (29% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 71% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_297_e1af87aaa553"
    }
  },
  {
    "candidate_id": "cand_fresher_298",
    "name": "Shreya Mishra",
    "anonymised_name": "Fresher Candidate #298 (S. Mishra)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-298/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 32433,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 97,
      "problem_solving_score": 87,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 71,
      "time_span_days": 17,
      "burst_ratio": 0.26,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 10,
      "authenticity_score": 80,
      "summary": "71 commits across 17 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 71 organic commits over 17 days with 27% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_298_219931b1d5c7"
    }
  },
  {
    "candidate_id": "cand_fresher_299",
    "name": "Mohit Reddy",
    "anonymised_name": "Fresher Candidate #299 (M. Reddy)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-299/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 4734,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 77,
      "problem_solving_score": 95,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 139,
      "time_span_days": 81,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 10,
      "authenticity_score": 90,
      "summary": "139 commits across 81 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 139 organic commits over 81 days with 31% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_299_5f5605db1165"
    }
  },
  {
    "candidate_id": "cand_fresher_300",
    "name": "Varun Choudhury",
    "anonymised_name": "Fresher Candidate #300 (V. Choudhury)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-300/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 11617,
    "authenticity_score": 38,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_300",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.62,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 74,
      "problem_solving_score": 55,
      "composite_assessment": 63
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 38,
      "summary": "3 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (38% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 62% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_300_8316a8532d9e"
    }
  },
  {
    "candidate_id": "cand_fresher_301",
    "name": "Nikhil Mishra",
    "anonymised_name": "Fresher Candidate #301 (N. Mishra)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-301/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 15635,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 78,
      "problem_solving_score": 72,
      "composite_assessment": 77
    },
    "git_dna": {
      "total_commits": 139,
      "time_span_days": 64,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 9,
      "authenticity_score": 89,
      "summary": "139 commits across 64 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 139 organic commits over 64 days with 35% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_301_ff3642ac708b"
    }
  },
  {
    "candidate_id": "cand_fresher_302",
    "name": "Abhishek Banerjee",
    "anonymised_name": "Fresher Candidate #302 (A. Banerjee)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-302/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 10717,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 89,
      "problem_solving_score": 84,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 133,
      "time_span_days": 38,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 13,
      "authenticity_score": 93,
      "summary": "133 commits across 38 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 133 organic commits over 38 days with 22% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_302_8460ba199205"
    }
  },
  {
    "candidate_id": "cand_fresher_303",
    "name": "Kavya Mehta",
    "anonymised_name": "Fresher Candidate #303 (K. Mehta)",
    "college": "IIT Delhi",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-303/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 17973,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_303",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 54,
      "problem_solving_score": 40,
      "composite_assessment": 47
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 26,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "2 commits across 3 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 79% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_303_cd67163bed0d"
    }
  },
  {
    "candidate_id": "cand_fresher_304",
    "name": "Manish Bhatia",
    "anonymised_name": "Fresher Candidate #304 (M. Bhatia)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-304/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 31150,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 75,
      "problem_solving_score": 76,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 48,
      "time_span_days": 32,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 0,
      "authenticity_score": 77,
      "summary": "48 commits across 32 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 48 organic commits over 32 days with 37% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_304_12bf24a863d8"
    }
  },
  {
    "candidate_id": "cand_fresher_305",
    "name": "Shreya Sharma",
    "anonymised_name": "Fresher Candidate #305 (S. Sharma)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-305/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 33297,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 82,
      "problem_solving_score": 91,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 36,
      "time_span_days": 39,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 6,
      "authenticity_score": 90,
      "summary": "36 commits across 39 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 36 organic commits over 39 days with 37% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_305_041150534dc7"
    }
  },
  {
    "candidate_id": "cand_fresher_306",
    "name": "Isha Kumar",
    "anonymised_name": "Fresher Candidate #306 (I. Kumar)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-306/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 12433,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 90,
      "problem_solving_score": 83,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 104,
      "time_span_days": 39,
      "burst_ratio": 0.36,
      "deletion_ratio": 0.19,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 4,
      "authenticity_score": 84,
      "summary": "104 commits across 39 days. Refactor ratio: 19%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 104 organic commits over 39 days with 19% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_306_373b2485705e"
    }
  },
  {
    "candidate_id": "cand_fresher_307",
    "name": "Pooja Chatterjee",
    "anonymised_name": "Fresher Candidate #307 (P. Chatterjee)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-307/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 18181,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_307",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 57,
      "problem_solving_score": 45,
      "composite_assessment": 49
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "4 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 70% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_307_c76d266006ea"
    }
  },
  {
    "candidate_id": "cand_fresher_308",
    "name": "Yash Mehta",
    "anonymised_name": "Fresher Candidate #308 (Y. Mehta)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-308/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 31022,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 96,
      "aptitude_score": 81,
      "problem_solving_score": 95,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 55,
      "time_span_days": 30,
      "burst_ratio": 0.4,
      "deletion_ratio": 0.26,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 13,
      "authenticity_score": 80,
      "summary": "55 commits across 30 days. Refactor ratio: 26%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 55 organic commits over 30 days with 26% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_308_deef103866a3"
    }
  },
  {
    "candidate_id": "cand_fresher_309",
    "name": "Kavya Sharma",
    "anonymised_name": "Fresher Candidate #309 (K. Sharma)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-309/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 19613,
    "authenticity_score": 27,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_309",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.73,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 51,
      "aptitude_score": 68,
      "problem_solving_score": 45,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.89,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 31,
      "test_files_detected": 0,
      "authenticity_score": 27,
      "summary": "4 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (27% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 73% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_309_e70905e4cb78"
    }
  },
  {
    "candidate_id": "cand_fresher_310",
    "name": "Isha Pandey",
    "anonymised_name": "Fresher Candidate #310 (I. Pandey)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-310/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 25840,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_310",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 65,
      "aptitude_score": 66,
      "problem_solving_score": 52,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "3 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 84% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_310_0162b87062c6"
    }
  },
  {
    "candidate_id": "cand_fresher_311",
    "name": "Priyanshu Banerjee",
    "anonymised_name": "Fresher Candidate #311 (P. Banerjee)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-311/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 22801,
    "authenticity_score": 78,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 80,
      "problem_solving_score": 83,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 127,
      "time_span_days": 38,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 12,
      "authenticity_score": 78,
      "summary": "127 commits across 38 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (78% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 78% Git-DNA originality across 127 organic commits over 38 days with 30% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_311_defe0dcf7772"
    }
  },
  {
    "candidate_id": "cand_fresher_312",
    "name": "Karan Patel",
    "anonymised_name": "Fresher Candidate #312 (K. Patel)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-312/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 23358,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 92,
      "aptitude_score": 96,
      "problem_solving_score": 82,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 36,
      "time_span_days": 39,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.23,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 0,
      "authenticity_score": 80,
      "summary": "36 commits across 39 days. Refactor ratio: 23%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 36 organic commits over 39 days with 23% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_312_66cbb7790935"
    }
  },
  {
    "candidate_id": "cand_fresher_313",
    "name": "Abhishek Banerjee",
    "anonymised_name": "Fresher Candidate #313 (A. Banerjee)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-313/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 13626,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 90,
      "problem_solving_score": 71,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 31,
      "time_span_days": 40,
      "burst_ratio": 0.45,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 10,
      "authenticity_score": 95,
      "summary": "31 commits across 40 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 31 organic commits over 40 days with 40% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_313_d1ac568b8208"
    }
  },
  {
    "candidate_id": "cand_fresher_314",
    "name": "Anushka Choudhury",
    "anonymised_name": "Fresher Candidate #314 (A. Choudhury)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-314/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 9369,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_314",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 48,
      "aptitude_score": 53,
      "problem_solving_score": 63,
      "composite_assessment": 54
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 37,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "3 commits across 1 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 65% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_314_52263436b477"
    }
  },
  {
    "candidate_id": "cand_fresher_315",
    "name": "Shreya Gupta",
    "anonymised_name": "Fresher Candidate #315 (S. Gupta)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-315/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 15794,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 92,
      "problem_solving_score": 91,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 170,
      "time_span_days": 67,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.36,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 13,
      "authenticity_score": 81,
      "summary": "170 commits across 67 days. Refactor ratio: 36%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 170 organic commits over 67 days with 36% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_315_be1b942bbe91"
    }
  },
  {
    "candidate_id": "cand_fresher_316",
    "name": "Pooja Kumar",
    "anonymised_name": "Fresher Candidate #316 (P. Kumar)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-316/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 15909,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 85,
      "aptitude_score": 94,
      "problem_solving_score": 90,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 141,
      "time_span_days": 59,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 8,
      "authenticity_score": 93,
      "summary": "141 commits across 59 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 141 organic commits over 59 days with 31% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_316_d4018562507a"
    }
  },
  {
    "candidate_id": "cand_fresher_317",
    "name": "Swati Malhotra",
    "anonymised_name": "Fresher Candidate #317 (S. Malhotra)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-317/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 18761,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 89,
      "problem_solving_score": 70,
      "composite_assessment": 80
    },
    "git_dna": {
      "total_commits": 143,
      "time_span_days": 71,
      "burst_ratio": 0.54,
      "deletion_ratio": 0.18,
      "organic_growth": true,
      "message_maturity_score": 82,
      "test_files_detected": 0,
      "authenticity_score": 84,
      "summary": "143 commits across 71 days. Refactor ratio: 18%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 143 organic commits over 71 days with 18% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_317_9288c781405f"
    }
  },
  {
    "candidate_id": "cand_fresher_318",
    "name": "Varun Sharma",
    "anonymised_name": "Fresher Candidate #318 (V. Sharma)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-318/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 6335,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 81,
      "problem_solving_score": 74,
      "composite_assessment": 81
    },
    "git_dna": {
      "total_commits": 169,
      "time_span_days": 79,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.4,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 3,
      "authenticity_score": 76,
      "summary": "169 commits across 79 days. Refactor ratio: 40%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 169 organic commits over 79 days with 40% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_318_9338b3db1c6b"
    }
  },
  {
    "candidate_id": "cand_fresher_319",
    "name": "Gaurav Tripathi",
    "anonymised_name": "Fresher Candidate #319 (G. Tripathi)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-319/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 20681,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_319",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 72,
      "problem_solving_score": 62,
      "composite_assessment": 64
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 23,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "1 commits across 3 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 70% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_319_e8484ecd2943"
    }
  },
  {
    "candidate_id": "cand_fresher_320",
    "name": "Swati Trivedi",
    "anonymised_name": "Fresher Candidate #320 (S. Trivedi)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-320/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 29635,
    "authenticity_score": 36,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_320",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.64,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 73,
      "problem_solving_score": 60,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 39,
      "test_files_detected": 0,
      "authenticity_score": 36,
      "summary": "3 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (36% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 64% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_320_ff51bb21a544"
    }
  },
  {
    "candidate_id": "cand_fresher_321",
    "name": "Aarav Trivedi",
    "anonymised_name": "Fresher Candidate #321 (A. Trivedi)",
    "college": "United College of Engineering & Research",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-321/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 33619,
    "authenticity_score": 77,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 93,
      "problem_solving_score": 82,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 166,
      "time_span_days": 86,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 3,
      "authenticity_score": 77,
      "summary": "166 commits across 86 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (77% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 77% Git-DNA originality across 166 organic commits over 86 days with 30% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_321_573e88c60505"
    }
  },
  {
    "candidate_id": "cand_fresher_322",
    "name": "Swati Tripathi",
    "anonymised_name": "Fresher Candidate #322 (S. Tripathi)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-322/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 4587,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_322",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 62,
      "problem_solving_score": 48,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "3 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 84% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_322_ce6163cb8766"
    }
  },
  {
    "candidate_id": "cand_fresher_323",
    "name": "Akanksha Bhatia",
    "anonymised_name": "Fresher Candidate #323 (A. Bhatia)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-323/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 27253,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 72,
      "problem_solving_score": 78,
      "composite_assessment": 77
    },
    "git_dna": {
      "total_commits": 129,
      "time_span_days": 87,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 6,
      "authenticity_score": 82,
      "summary": "129 commits across 87 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 129 organic commits over 87 days with 33% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_323_7d37d1b1d2cc"
    }
  },
  {
    "candidate_id": "cand_fresher_324",
    "name": "Isha Deshmukh",
    "anonymised_name": "Fresher Candidate #324 (I. Deshmukh)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-324/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 21992,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 75,
      "problem_solving_score": 81,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 117,
      "time_span_days": 38,
      "burst_ratio": 0.35,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 0,
      "authenticity_score": 89,
      "summary": "117 commits across 38 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 117 organic commits over 38 days with 32% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_324_b102eacd5250"
    }
  },
  {
    "candidate_id": "cand_fresher_325",
    "name": "Yash Singh",
    "anonymised_name": "Fresher Candidate #325 (Y. Singh)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-325/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 2250,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 96,
      "problem_solving_score": 79,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 56,
      "time_span_days": 20,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 0,
      "authenticity_score": 80,
      "summary": "56 commits across 20 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 56 organic commits over 20 days with 33% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_325_3669f7293bdb"
    }
  },
  {
    "candidate_id": "cand_fresher_326",
    "name": "Karan Mishra",
    "anonymised_name": "Fresher Candidate #326 (K. Mishra)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-326/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 23697,
    "authenticity_score": 18,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_326",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.82,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 49,
      "aptitude_score": 72,
      "problem_solving_score": 62,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 18,
      "summary": "3 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (18% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 82% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_326_219104d5657f"
    }
  },
  {
    "candidate_id": "cand_fresher_327",
    "name": "Shreya Tripathi",
    "anonymised_name": "Fresher Candidate #327 (S. Tripathi)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-327/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 10690,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_327",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 47,
      "aptitude_score": 62,
      "problem_solving_score": 61,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 1,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "3 commits across 1 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 79% structural overlap across only 3 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_327_127bfc4f5ff3"
    }
  },
  {
    "candidate_id": "cand_fresher_328",
    "name": "Gaurav Patel",
    "anonymised_name": "Fresher Candidate #328 (G. Patel)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-328/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 2504,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 87,
      "problem_solving_score": 92,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 108,
      "time_span_days": 76,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 11,
      "authenticity_score": 92,
      "summary": "108 commits across 76 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 108 organic commits over 76 days with 31% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_328_52032fcea4dc"
    }
  },
  {
    "candidate_id": "cand_fresher_329",
    "name": "Siddharth Saxena",
    "anonymised_name": "Fresher Candidate #329 (S. Saxena)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-329/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 22305,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 95,
      "problem_solving_score": 71,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 118,
      "time_span_days": 59,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 11,
      "authenticity_score": 76,
      "summary": "118 commits across 59 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 118 organic commits over 59 days with 24% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_329_26cc301422da"
    }
  },
  {
    "candidate_id": "cand_fresher_330",
    "name": "Shreya Sharma",
    "anonymised_name": "Fresher Candidate #330 (S. Sharma)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-330/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 9252,
    "authenticity_score": 33,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_330",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.67,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 70,
      "problem_solving_score": 61,
      "composite_assessment": 65
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 33,
      "test_files_detected": 0,
      "authenticity_score": 33,
      "summary": "1 commits across 3 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (33% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 67% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_330_71ab048b684b"
    }
  },
  {
    "candidate_id": "cand_fresher_331",
    "name": "Siddharth Tripathi",
    "anonymised_name": "Fresher Candidate #331 (S. Tripathi)",
    "college": "IIT Kharagpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-331/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 31246,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 92,
      "problem_solving_score": 92,
      "composite_assessment": 88
    },
    "git_dna": {
      "total_commits": 80,
      "time_span_days": 31,
      "burst_ratio": 0.42,
      "deletion_ratio": 0.34,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 5,
      "authenticity_score": 93,
      "summary": "80 commits across 31 days. Refactor ratio: 34%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 80 organic commits over 31 days with 34% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_331_187f2f65f305"
    }
  },
  {
    "candidate_id": "cand_fresher_332",
    "name": "Neha Bhatia",
    "anonymised_name": "Fresher Candidate #332 (N. Bhatia)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-332/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 12242,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 70,
      "problem_solving_score": 94,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 170,
      "time_span_days": 82,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 5,
      "authenticity_score": 86,
      "summary": "170 commits across 82 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 170 organic commits over 82 days with 21% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_332_7574d4de1f80"
    }
  },
  {
    "candidate_id": "cand_fresher_333",
    "name": "Anushka Mishra",
    "anonymised_name": "Fresher Candidate #333 (A. Mishra)",
    "college": "SRM Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-333/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 9408,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 77,
      "problem_solving_score": 89,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 75,
      "time_span_days": 17,
      "burst_ratio": 0.48,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 85,
      "test_files_detected": 12,
      "authenticity_score": 79,
      "summary": "75 commits across 17 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 75 organic commits over 17 days with 33% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_333_566a7b459fd3"
    }
  },
  {
    "candidate_id": "cand_fresher_334",
    "name": "Priyanshu Choudhury",
    "anonymised_name": "Fresher Candidate #334 (P. Choudhury)",
    "college": "IIIT Hyderabad",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-334/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 15188,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 77,
      "problem_solving_score": 71,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 123,
      "time_span_days": 37,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 0,
      "authenticity_score": 95,
      "summary": "123 commits across 37 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 123 organic commits over 37 days with 30% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_334_0717d97a6110"
    }
  },
  {
    "candidate_id": "cand_fresher_335",
    "name": "Aditya Bhatia",
    "anonymised_name": "Fresher Candidate #335 (A. Bhatia)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-335/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 28811,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_335",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 69,
      "problem_solving_score": 63,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "3 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 69% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_335_c3780961e154"
    }
  },
  {
    "candidate_id": "cand_fresher_336",
    "name": "Isha Joshi",
    "anonymised_name": "Fresher Candidate #336 (I. Joshi)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-336/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 14763,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 86,
      "problem_solving_score": 87,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 161,
      "time_span_days": 27,
      "burst_ratio": 0.39,
      "deletion_ratio": 0.38,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 0,
      "authenticity_score": 96,
      "summary": "161 commits across 27 days. Refactor ratio: 38%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 161 organic commits over 27 days with 38% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_336_66da63433bb9"
    }
  },
  {
    "candidate_id": "cand_fresher_337",
    "name": "Mohit Joshi",
    "anonymised_name": "Fresher Candidate #337 (M. Joshi)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-337/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 31411,
    "authenticity_score": 21,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_337",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.79,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 46,
      "aptitude_score": 72,
      "problem_solving_score": 56,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 24,
      "test_files_detected": 0,
      "authenticity_score": 21,
      "summary": "4 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (21% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 79% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_337_f28133223a03"
    }
  },
  {
    "candidate_id": "cand_fresher_338",
    "name": "Amit Trivedi",
    "anonymised_name": "Fresher Candidate #338 (A. Trivedi)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-338/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 31180,
    "authenticity_score": 34,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_338",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.66,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 50,
      "aptitude_score": 64,
      "problem_solving_score": 58,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.91,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 34,
      "summary": "2 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (34% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 66% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_338_f2858b74fa77"
    }
  },
  {
    "candidate_id": "cand_fresher_339",
    "name": "Kavya Reddy",
    "anonymised_name": "Fresher Candidate #339 (K. Reddy)",
    "college": "IIT Roorkee",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-339/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 32921,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 86,
      "problem_solving_score": 89,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 57,
      "time_span_days": 71,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 14,
      "authenticity_score": 79,
      "summary": "57 commits across 71 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 57 organic commits over 71 days with 20% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_339_4390b7b7b3ad"
    }
  },
  {
    "candidate_id": "cand_fresher_340",
    "name": "Shreya Kapoor",
    "anonymised_name": "Fresher Candidate #340 (S. Kapoor)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-340/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 11262,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 94,
      "problem_solving_score": 84,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 69,
      "time_span_days": 32,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 83,
      "test_files_detected": 7,
      "authenticity_score": 97,
      "summary": "69 commits across 32 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 69 organic commits over 32 days with 35% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_340_19b9fe37154c"
    }
  },
  {
    "candidate_id": "cand_fresher_341",
    "name": "Karan Singh",
    "anonymised_name": "Fresher Candidate #341 (K. Singh)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-341/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 17388,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 88,
      "problem_solving_score": 91,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 155,
      "time_span_days": 77,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.18,
      "organic_growth": true,
      "message_maturity_score": 92,
      "test_files_detected": 6,
      "authenticity_score": 76,
      "summary": "155 commits across 77 days. Refactor ratio: 18%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 155 organic commits over 77 days with 18% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_341_ab21876e3548"
    }
  },
  {
    "candidate_id": "cand_fresher_342",
    "name": "Anushka Reddy",
    "anonymised_name": "Fresher Candidate #342 (A. Reddy)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-342/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 29778,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_342",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 56,
      "aptitude_score": 51,
      "problem_solving_score": 44,
      "composite_assessment": 51
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 21,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "2 commits across 1 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 80% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_342_8aca2aad3f71"
    }
  },
  {
    "candidate_id": "cand_fresher_343",
    "name": "Aayushi Banerjee",
    "anonymised_name": "Fresher Candidate #343 (A. Banerjee)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-343/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 7613,
    "authenticity_score": 17,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_343",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.83,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 75,
      "problem_solving_score": 57,
      "composite_assessment": 65
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 17,
      "summary": "3 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (17% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 83% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_343_efd9d15e53fb"
    }
  },
  {
    "candidate_id": "cand_fresher_344",
    "name": "Ayush Choudhury",
    "anonymised_name": "Fresher Candidate #344 (A. Choudhury)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-344/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 15358,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 80,
      "aptitude_score": 80,
      "problem_solving_score": 86,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 137,
      "time_span_days": 84,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 0,
      "authenticity_score": 88,
      "summary": "137 commits across 84 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 137 organic commits over 84 days with 29% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_344_160b8f7428f0"
    }
  },
  {
    "candidate_id": "cand_fresher_345",
    "name": "Rahul Chawla",
    "anonymised_name": "Fresher Candidate #345 (R. Chawla)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-345/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 29580,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 81,
      "aptitude_score": 83,
      "problem_solving_score": 89,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 50,
      "time_span_days": 75,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 14,
      "authenticity_score": 96,
      "summary": "50 commits across 75 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 50 organic commits over 75 days with 33% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_345_78a3042ac236"
    }
  },
  {
    "candidate_id": "cand_fresher_346",
    "name": "Riya Saxena",
    "anonymised_name": "Fresher Candidate #346 (R. Saxena)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-346/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 33888,
    "authenticity_score": 95,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 92,
      "problem_solving_score": 79,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 155,
      "time_span_days": 80,
      "burst_ratio": 0.47,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 12,
      "authenticity_score": 95,
      "summary": "155 commits across 80 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (95% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 95% Git-DNA originality across 155 organic commits over 80 days with 30% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_346_dfc1412f46ba"
    }
  },
  {
    "candidate_id": "cand_fresher_347",
    "name": "Aarav Patel",
    "anonymised_name": "Fresher Candidate #347 (A. Patel)",
    "college": "IIT Bombay",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-347/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 10136,
    "authenticity_score": 89,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 92,
      "problem_solving_score": 79,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 39,
      "time_span_days": 56,
      "burst_ratio": 0.35,
      "deletion_ratio": 0.37,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 13,
      "authenticity_score": 89,
      "summary": "39 commits across 56 days. Refactor ratio: 37%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (89% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 89% Git-DNA originality across 39 organic commits over 56 days with 37% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_347_1c070662a0aa"
    }
  },
  {
    "candidate_id": "cand_fresher_348",
    "name": "Varun Mishra",
    "anonymised_name": "Fresher Candidate #348 (V. Mishra)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-348/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 27924,
    "authenticity_score": 22,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_348",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.78,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 66,
      "aptitude_score": 65,
      "problem_solving_score": 55,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 21,
      "test_files_detected": 0,
      "authenticity_score": 22,
      "summary": "1 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (22% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 78% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_348_d557de692002"
    }
  },
  {
    "candidate_id": "cand_fresher_349",
    "name": "Neha Nair",
    "anonymised_name": "Fresher Candidate #349 (N. Nair)",
    "college": "IIIT Hyderabad",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-349/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 24262,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 72,
      "aptitude_score": 76,
      "problem_solving_score": 88,
      "composite_assessment": 78
    },
    "git_dna": {
      "total_commits": 42,
      "time_span_days": 80,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 11,
      "authenticity_score": 90,
      "summary": "42 commits across 80 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 42 organic commits over 80 days with 35% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_349_730e428ba260"
    }
  },
  {
    "candidate_id": "cand_fresher_350",
    "name": "Divya Verma",
    "anonymised_name": "Fresher Candidate #350 (D. Verma)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-350/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 24910,
    "authenticity_score": 88,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 94,
      "problem_solving_score": 79,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 70,
      "time_span_days": 87,
      "burst_ratio": 0.43,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 88,
      "test_files_detected": 0,
      "authenticity_score": 88,
      "summary": "70 commits across 87 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (88% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 88% Git-DNA originality across 70 organic commits over 87 days with 22% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_350_ae48658637af"
    }
  },
  {
    "candidate_id": "cand_fresher_351",
    "name": "Aditi Chatterjee",
    "anonymised_name": "Fresher Candidate #351 (A. Chatterjee)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-351/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 16341,
    "authenticity_score": 85,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 78,
      "aptitude_score": 99,
      "problem_solving_score": 72,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 162,
      "time_span_days": 52,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.27,
      "organic_growth": true,
      "message_maturity_score": 94,
      "test_files_detected": 0,
      "authenticity_score": 85,
      "summary": "162 commits across 52 days. Refactor ratio: 27%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (85% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 85% Git-DNA originality across 162 organic commits over 52 days with 27% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_351_2a1e5d622573"
    }
  },
  {
    "candidate_id": "cand_fresher_352",
    "name": "Priyanshu Nair",
    "anonymised_name": "Fresher Candidate #352 (P. Nair)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-352/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 25542,
    "authenticity_score": 91,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 93,
      "aptitude_score": 74,
      "problem_solving_score": 76,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 107,
      "time_span_days": 55,
      "burst_ratio": 0.29,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 11,
      "authenticity_score": 91,
      "summary": "107 commits across 55 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (91% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 91% Git-DNA originality across 107 organic commits over 55 days with 39% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_352_913542d8d04d"
    }
  },
  {
    "candidate_id": "cand_fresher_353",
    "name": "Amit Joshi",
    "anonymised_name": "Fresher Candidate #353 (A. Joshi)",
    "college": "State Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-353/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 26230,
    "authenticity_score": 33,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_353",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.67,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 61,
      "aptitude_score": 74,
      "problem_solving_score": 61,
      "composite_assessment": 65
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.92,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 29,
      "test_files_detected": 0,
      "authenticity_score": 33,
      "summary": "1 commits across 2 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (33% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 67% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_353_7d430c19a306"
    }
  },
  {
    "candidate_id": "cand_fresher_354",
    "name": "Priyanshu Tripathi",
    "anonymised_name": "Fresher Candidate #354 (P. Tripathi)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-354/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 2299,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_354",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 50,
      "aptitude_score": 58,
      "problem_solving_score": 43,
      "composite_assessment": 50
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 39,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "3 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 80% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_354_e5bc6b2b5de6"
    }
  },
  {
    "candidate_id": "cand_fresher_355",
    "name": "Mohit Saxena",
    "anonymised_name": "Fresher Candidate #355 (M. Saxena)",
    "college": "NIT Trichy",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-355/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 6062,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 89,
      "aptitude_score": 84,
      "problem_solving_score": 71,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 100,
      "time_span_days": 87,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 8,
      "authenticity_score": 84,
      "summary": "100 commits across 87 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 100 organic commits over 87 days with 20% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_355_c04bbd52bb49"
    }
  },
  {
    "candidate_id": "cand_fresher_356",
    "name": "Ritika Deshmukh",
    "anonymised_name": "Fresher Candidate #356 (R. Deshmukh)",
    "college": "BITS Pilani",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-356/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 23783,
    "authenticity_score": 17,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_356",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.83,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 51,
      "aptitude_score": 72,
      "problem_solving_score": 64,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 3,
      "burst_ratio": 0.9,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 45,
      "test_files_detected": 0,
      "authenticity_score": 17,
      "summary": "4 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (17% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 83% structural overlap across only 4 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_356_48c559786d45"
    }
  },
  {
    "candidate_id": "cand_fresher_357",
    "name": "Deepika Verma",
    "anonymised_name": "Fresher Candidate #357 (D. Verma)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-357/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 32845,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_357",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 65,
      "problem_solving_score": 47,
      "composite_assessment": 57
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 27,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "4 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 74% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_357_f4c82ef8440c"
    }
  },
  {
    "candidate_id": "cand_fresher_358",
    "name": "Harsh Banerjee",
    "anonymised_name": "Fresher Candidate #358 (H. Banerjee)",
    "college": "Delhi Technological University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-358/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 29514,
    "authenticity_score": 22,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_358",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.78,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 56,
      "aptitude_score": 65,
      "problem_solving_score": 54,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.85,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 25,
      "test_files_detected": 0,
      "authenticity_score": 22,
      "summary": "4 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (22% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 78% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_358_ddb2649ed21c"
    }
  },
  {
    "candidate_id": "cand_fresher_359",
    "name": "Tanvi Choudhury",
    "anonymised_name": "Fresher Candidate #359 (T. Choudhury)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-359/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 21150,
    "authenticity_score": 37,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_359",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.63,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 64,
      "problem_solving_score": 52,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 33,
      "test_files_detected": 0,
      "authenticity_score": 37,
      "summary": "3 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (37% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 63% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_359_6147d40d25f7"
    }
  },
  {
    "candidate_id": "cand_fresher_360",
    "name": "Siddharth Banerjee",
    "anonymised_name": "Fresher Candidate #360 (S. Banerjee)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-360/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 23512,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 94,
      "aptitude_score": 77,
      "problem_solving_score": 75,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 179,
      "time_span_days": 69,
      "burst_ratio": 0.49,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 11,
      "authenticity_score": 86,
      "summary": "179 commits across 69 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 179 organic commits over 69 days with 28% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_360_e4ee0dc740ac"
    }
  },
  {
    "candidate_id": "cand_fresher_361",
    "name": "Aayushi Nair",
    "anonymised_name": "Fresher Candidate #361 (A. Nair)",
    "college": "NIT Surathkal",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-361/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 28665,
    "authenticity_score": 79,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 98,
      "aptitude_score": 89,
      "problem_solving_score": 94,
      "composite_assessment": 94
    },
    "git_dna": {
      "total_commits": 73,
      "time_span_days": 53,
      "burst_ratio": 0.54,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 0,
      "authenticity_score": 79,
      "summary": "73 commits across 53 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (79% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 79% Git-DNA originality across 73 organic commits over 53 days with 20% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_361_5dd090349638"
    }
  },
  {
    "candidate_id": "cand_fresher_362",
    "name": "Isha Nair",
    "anonymised_name": "Fresher Candidate #362 (I. Nair)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-362/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 20737,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_362",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 54,
      "aptitude_score": 62,
      "problem_solving_score": 59,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "1 commits across 1 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 70% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_362_7074adcda879"
    }
  },
  {
    "candidate_id": "cand_fresher_363",
    "name": "Kavya Gupta",
    "anonymised_name": "Fresher Candidate #363 (K. Gupta)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-363/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 29734,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 97,
      "problem_solving_score": 74,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 139,
      "time_span_days": 58,
      "burst_ratio": 0.55,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 11,
      "authenticity_score": 97,
      "summary": "139 commits across 58 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 139 organic commits over 58 days with 32% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_363_0a3361260d4f"
    }
  },
  {
    "candidate_id": "cand_fresher_364",
    "name": "Rohan Choudhury",
    "anonymised_name": "Fresher Candidate #364 (R. Choudhury)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-364/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 14303,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 94,
      "aptitude_score": 82,
      "problem_solving_score": 82,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 100,
      "time_span_days": 17,
      "burst_ratio": 0.32,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 8,
      "authenticity_score": 87,
      "summary": "100 commits across 17 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 100 organic commits over 17 days with 35% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_364_4b2b74488cfe"
    }
  },
  {
    "candidate_id": "cand_fresher_365",
    "name": "Deepika Gupta",
    "anonymised_name": "Fresher Candidate #365 (D. Gupta)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-365/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 4150,
    "authenticity_score": 38,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_365",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.62,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 49,
      "aptitude_score": 54,
      "problem_solving_score": 40,
      "composite_assessment": 48
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.89,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 38,
      "summary": "4 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (38% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 62% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_365_de05bb1a801d"
    }
  },
  {
    "candidate_id": "cand_fresher_366",
    "name": "Priyanshu Singh",
    "anonymised_name": "Fresher Candidate #366 (P. Singh)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-366/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 18492,
    "authenticity_score": 80,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 75,
      "problem_solving_score": 84,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 63,
      "time_span_days": 67,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 91,
      "test_files_detected": 9,
      "authenticity_score": 80,
      "summary": "63 commits across 67 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (80% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 80% Git-DNA originality across 63 organic commits over 67 days with 39% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_366_9fa5283cb88a"
    }
  },
  {
    "candidate_id": "cand_fresher_367",
    "name": "Mohit Reddy",
    "anonymised_name": "Fresher Candidate #367 (M. Reddy)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-367/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 20417,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 83,
      "aptitude_score": 71,
      "problem_solving_score": 71,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 155,
      "time_span_days": 44,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.24,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 12,
      "authenticity_score": 76,
      "summary": "155 commits across 44 days. Refactor ratio: 24%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 155 organic commits over 44 days with 24% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_367_7ad9028b9f83"
    }
  },
  {
    "candidate_id": "cand_fresher_368",
    "name": "Gaurav Patel",
    "anonymised_name": "Fresher Candidate #368 (G. Patel)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-368/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 23549,
    "authenticity_score": 92,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 90,
      "problem_solving_score": 93,
      "composite_assessment": 90
    },
    "git_dna": {
      "total_commits": 147,
      "time_span_days": 80,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 80,
      "test_files_detected": 0,
      "authenticity_score": 92,
      "summary": "147 commits across 80 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (92% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 92% Git-DNA originality across 147 organic commits over 80 days with 39% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_368_10ab2b77d6f4"
    }
  },
  {
    "candidate_id": "cand_fresher_369",
    "name": "Deepika Tripathi",
    "anonymised_name": "Fresher Candidate #369 (D. Tripathi)",
    "college": "GLA University (Mathura)",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-369/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 7288,
    "authenticity_score": 76,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 79,
      "problem_solving_score": 79,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 144,
      "time_span_days": 79,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 8,
      "authenticity_score": 76,
      "summary": "144 commits across 79 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (76% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 76% Git-DNA originality across 144 organic commits over 79 days with 32% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_369_72a89d033f0d"
    }
  },
  {
    "candidate_id": "cand_fresher_370",
    "name": "Swati Pandey",
    "anonymised_name": "Fresher Candidate #370 (S. Pandey)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-370/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 17684,
    "authenticity_score": 30,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_370",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.7,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 64,
      "aptitude_score": 50,
      "problem_solving_score": 49,
      "composite_assessment": 55
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.99,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 22,
      "test_files_detected": 0,
      "authenticity_score": 30,
      "summary": "1 commits across 3 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (30% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 70% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_370_9ea6e8da9e0e"
    }
  },
  {
    "candidate_id": "cand_fresher_371",
    "name": "Neha Saxena",
    "anonymised_name": "Fresher Candidate #371 (N. Saxena)",
    "college": "IIT Kharagpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-371/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 23399,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_371",
      "name": "Traversy MERN Auth Clone",
      "author": "Traversy Media / Brad Traversy",
      "source_url": "https://github.com/bradtraversy/mern-auth-boilerplate",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Traversy MERN Auth Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 63,
      "aptitude_score": 73,
      "problem_solving_score": 44,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 3,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 34,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "1 commits across 3 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Traversy MERN Auth Clone' with 80% structural overlap across only 1 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_371_1989efe5e615"
    }
  },
  {
    "candidate_id": "cand_fresher_372",
    "name": "Gaurav Kumar",
    "anonymised_name": "Fresher Candidate #372 (G. Kumar)",
    "college": "Manipal University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-372/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 27043,
    "authenticity_score": 13,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_372",
      "name": "CleverProgrammer Amazon Clone",
      "author": "Clever Programmer / Rafeh Qazi",
      "source_url": "https://github.com/CleverProgrammer/amazon-clone",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.87,
      "verdict": "AST Winnowing Fingerprint matched public repository 'CleverProgrammer Amazon Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 60,
      "aptitude_score": 74,
      "problem_solving_score": 53,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.93,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 32,
      "test_files_detected": 0,
      "authenticity_score": 13,
      "summary": "1 commits across 1 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (13% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'CleverProgrammer Amazon Clone' with 87% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_372_4e44b25fb334"
    }
  },
  {
    "candidate_id": "cand_fresher_373",
    "name": "Siddharth Deshmukh",
    "anonymised_name": "Fresher Candidate #373 (S. Deshmukh)",
    "college": "Thapar Institute",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-373/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 9456,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 95,
      "aptitude_score": 94,
      "problem_solving_score": 87,
      "composite_assessment": 92
    },
    "git_dna": {
      "total_commits": 95,
      "time_span_days": 28,
      "burst_ratio": 0.27,
      "deletion_ratio": 0.29,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 10,
      "authenticity_score": 87,
      "summary": "95 commits across 28 days. Refactor ratio: 29%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 95 organic commits over 28 days with 29% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_373_2d1d3947c2db"
    }
  },
  {
    "candidate_id": "cand_fresher_374",
    "name": "Shreya Nair",
    "anonymised_name": "Fresher Candidate #374 (S. Nair)",
    "college": "PSG College of Technology",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-374/fullstack-core",
    "project_type": "Fullstack Node.js",
    "primary_language": "TypeScript",
    "verified_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React",
      "Docker"
    ],
    "total_loc": 33132,
    "authenticity_score": 24,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_374",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.76,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 62,
      "aptitude_score": 70,
      "problem_solving_score": 51,
      "composite_assessment": 61
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 3,
      "burst_ratio": 0.95,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 33,
      "test_files_detected": 0,
      "authenticity_score": 24,
      "summary": "3 commits across 3 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/node.js_module.ts",
      "src/express_module.ts",
      "src/typescript_module.ts",
      "src/mongodb_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (24% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 76% structural overlap across only 3 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_374_39244ab4bad1"
    }
  },
  {
    "candidate_id": "cand_fresher_375",
    "name": "Yash Trivedi",
    "anonymised_name": "Fresher Candidate #375 (Y. Trivedi)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-375/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 27047,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_375",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 71,
      "problem_solving_score": 58,
      "composite_assessment": 66
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 26,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "4 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 80% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_375_963db098748d"
    }
  },
  {
    "candidate_id": "cand_fresher_376",
    "name": "Abhishek Mehta",
    "anonymised_name": "Fresher Candidate #376 (A. Mehta)",
    "college": "Regional Engineering College Warangal",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-376/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 10054,
    "authenticity_score": 97,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 79,
      "aptitude_score": 93,
      "problem_solving_score": 79,
      "composite_assessment": 83
    },
    "git_dna": {
      "total_commits": 45,
      "time_span_days": 15,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 8,
      "authenticity_score": 97,
      "summary": "45 commits across 15 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (97% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 97% Git-DNA originality across 45 organic commits over 15 days with 31% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_376_e0154b4b0bf0"
    }
  },
  {
    "candidate_id": "cand_fresher_377",
    "name": "Aditi Sharma",
    "anonymised_name": "Fresher Candidate #377 (A. Sharma)",
    "college": "Bundelkhand Institute of Engineering & Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-377/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 31160,
    "authenticity_score": 82,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 95,
      "problem_solving_score": 75,
      "composite_assessment": 87
    },
    "git_dna": {
      "total_commits": 59,
      "time_span_days": 29,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.33,
      "organic_growth": true,
      "message_maturity_score": 81,
      "test_files_detected": 13,
      "authenticity_score": 82,
      "summary": "59 commits across 29 days. Refactor ratio: 33%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (82% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 82% Git-DNA originality across 59 organic commits over 29 days with 33% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_377_6d25ea4dff5f"
    }
  },
  {
    "candidate_id": "cand_fresher_378",
    "name": "Arjun Chatterjee",
    "anonymised_name": "Fresher Candidate #378 (A. Chatterjee)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-378/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 10261,
    "authenticity_score": 84,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 80,
      "problem_solving_score": 71,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 110,
      "time_span_days": 46,
      "burst_ratio": 0.3,
      "deletion_ratio": 0.2,
      "organic_growth": true,
      "message_maturity_score": 86,
      "test_files_detected": 9,
      "authenticity_score": 84,
      "summary": "110 commits across 46 days. Refactor ratio: 20%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (84% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 84% Git-DNA originality across 110 organic commits over 46 days with 20% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_378_aa0af55a9721"
    }
  },
  {
    "candidate_id": "cand_fresher_379",
    "name": "Arjun Reddy",
    "anonymised_name": "Fresher Candidate #379 (A. Reddy)",
    "college": "IIT Kanpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-379/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 5184,
    "authenticity_score": 96,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 9,
    "assessment_results": {
      "coding_score": 86,
      "aptitude_score": 92,
      "problem_solving_score": 78,
      "composite_assessment": 85
    },
    "git_dna": {
      "total_commits": 55,
      "time_span_days": 32,
      "burst_ratio": 0.41,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 4,
      "authenticity_score": 96,
      "summary": "55 commits across 32 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (96% authenticity, Viva: 9/10).",
      "human_readable_reason": "Verified authentic builder: 96% Git-DNA originality across 55 organic commits over 32 days with 28% refactoring ratio. Viva defense score: 9/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_379_c65a969d6dcb"
    }
  },
  {
    "candidate_id": "cand_fresher_380",
    "name": "Ananya Verma",
    "anonymised_name": "Fresher Candidate #380 (A. Verma)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-380/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 20629,
    "authenticity_score": 16,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_380",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.84,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 67,
      "aptitude_score": 60,
      "problem_solving_score": 52,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 1,
      "burst_ratio": 0.94,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 16,
      "summary": "1 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (16% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 84% structural overlap across only 1 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_380_f9ff5e453c70"
    }
  },
  {
    "candidate_id": "cand_fresher_381",
    "name": "Akanksha Chawla",
    "anonymised_name": "Fresher Candidate #381 (A. Chawla)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-381/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 12726,
    "authenticity_score": 78,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 90,
      "aptitude_score": 87,
      "problem_solving_score": 81,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 85,
      "time_span_days": 14,
      "burst_ratio": 0.37,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 4,
      "authenticity_score": 78,
      "summary": "85 commits across 14 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (78% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 78% Git-DNA originality across 85 organic commits over 14 days with 35% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_381_8397f78a0b62"
    }
  },
  {
    "candidate_id": "cand_fresher_382",
    "name": "Kunal Awasthi",
    "anonymised_name": "Fresher Candidate #382 (K. Awasthi)",
    "college": "Government Engineering College Bilaspur",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-382/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 11593,
    "authenticity_score": 86,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 91,
      "problem_solving_score": 76,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 145,
      "time_span_days": 51,
      "burst_ratio": 0.44,
      "deletion_ratio": 0.22,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 0,
      "authenticity_score": 86,
      "summary": "145 commits across 51 days. Refactor ratio: 22%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (86% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 86% Git-DNA originality across 145 organic commits over 51 days with 22% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_382_1a4f4931112b"
    }
  },
  {
    "candidate_id": "cand_fresher_383",
    "name": "Sneha Trivedi",
    "anonymised_name": "Fresher Candidate #383 (S. Trivedi)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-383/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 19512,
    "authenticity_score": 90,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 84,
      "aptitude_score": 72,
      "problem_solving_score": 95,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 63,
      "time_span_days": 18,
      "burst_ratio": 0.31,
      "deletion_ratio": 0.35,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 10,
      "authenticity_score": 90,
      "summary": "63 commits across 18 days. Refactor ratio: 35%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (90% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 90% Git-DNA originality across 63 organic commits over 18 days with 35% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_383_cca278418b6b"
    }
  },
  {
    "candidate_id": "cand_fresher_384",
    "name": "Sameer Kapoor",
    "anonymised_name": "Fresher Candidate #384 (S. Kapoor)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-384/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 32604,
    "authenticity_score": 22,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_384",
      "name": "Academind Course Clone",
      "author": "Academind / Maximilian",
      "source_url": "https://github.com/academind/react-complete-guide-code",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.78,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Academind Course Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 66,
      "aptitude_score": 66,
      "problem_solving_score": 54,
      "composite_assessment": 62
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 22,
      "summary": "1 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (22% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Academind Course Clone' with 78% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_384_1dc103234719"
    }
  },
  {
    "candidate_id": "cand_fresher_385",
    "name": "Deepika Singh",
    "anonymised_name": "Fresher Candidate #385 (D. Singh)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-385/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 6077,
    "authenticity_score": 27,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_385",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.73,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 52,
      "aptitude_score": 72,
      "problem_solving_score": 60,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.98,
      "deletion_ratio": 0.03,
      "organic_growth": false,
      "message_maturity_score": 20,
      "test_files_detected": 0,
      "authenticity_score": 27,
      "summary": "1 commits across 2 days. Refactor ratio: 3%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (27% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 73% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_385_cc653829cada"
    }
  },
  {
    "candidate_id": "cand_fresher_386",
    "name": "Arjun Trivedi",
    "anonymised_name": "Fresher Candidate #386 (A. Trivedi)",
    "college": "IIT Kharagpur",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-386/react-core",
    "project_type": "React / TypeScript UI",
    "primary_language": "TypeScript",
    "verified_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand",
      "Jest"
    ],
    "total_loc": 12854,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 97,
      "aptitude_score": 76,
      "problem_solving_score": 83,
      "composite_assessment": 86
    },
    "git_dna": {
      "total_commits": 44,
      "time_span_days": 27,
      "burst_ratio": 0.28,
      "deletion_ratio": 0.32,
      "organic_growth": true,
      "message_maturity_score": 90,
      "test_files_detected": 4,
      "authenticity_score": 81,
      "summary": "44 commits across 27 days. Refactor ratio: 32%."
    },
    "detected_files": [
      "src/react_module.ts",
      "src/typescript_module.ts",
      "src/tailwindcss_module.ts",
      "src/next.js_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 44 organic commits over 27 days with 32% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_386_8075567c6cc9"
    }
  },
  {
    "candidate_id": "cand_fresher_387",
    "name": "Isha Patel",
    "anonymised_name": "Fresher Candidate #387 (I. Patel)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-387/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 13921,
    "authenticity_score": 36,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_387",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.64,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 58,
      "aptitude_score": 55,
      "problem_solving_score": 62,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 2,
      "burst_ratio": 0.86,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 37,
      "test_files_detected": 0,
      "authenticity_score": 36,
      "summary": "2 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (36% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 64% structural overlap across only 2 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_387_02d29acedd53"
    }
  },
  {
    "candidate_id": "cand_fresher_388",
    "name": "Pooja Reddy",
    "anonymised_name": "Fresher Candidate #388 (P. Reddy)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-388/python-core",
    "project_type": "Python Backend / FastAPI",
    "primary_language": "Python",
    "verified_skills": [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest",
      "asyncio"
    ],
    "total_loc": 24958,
    "authenticity_score": 31,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_388",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.69,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 45,
      "aptitude_score": 55,
      "problem_solving_score": 42,
      "composite_assessment": 47
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 1,
      "burst_ratio": 0.97,
      "deletion_ratio": 0.01,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 31,
      "summary": "2 commits across 1 days. Refactor ratio: 1%."
    },
    "detected_files": [
      "src/fastapi_module.py",
      "src/postgresql_module.py",
      "src/redis_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (31% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 69% structural overlap across only 2 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_388_ea1819b820c5"
    }
  },
  {
    "candidate_id": "cand_fresher_389",
    "name": "Ayush Mishra",
    "anonymised_name": "Fresher Candidate #389 (A. Mishra)",
    "college": "Jadavpur University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-389/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 7698,
    "authenticity_score": 20,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_389",
      "name": "Net Ninja Flutter Clone",
      "author": "Net Ninja / Shaun Pelling",
      "source_url": "https://github.com/iamshaunjp/flutter-firebase-tutorial",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.8,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Net Ninja Flutter Clone'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 67,
      "aptitude_score": 51,
      "problem_solving_score": 59,
      "composite_assessment": 60
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 42,
      "test_files_detected": 0,
      "authenticity_score": 20,
      "summary": "4 commits across 2 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (20% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Net Ninja Flutter Clone' with 80% structural overlap across only 4 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_389_6ce290b16874"
    }
  },
  {
    "candidate_id": "cand_fresher_390",
    "name": "Sameer Banerjee",
    "anonymised_name": "Fresher Candidate #390 (S. Banerjee)",
    "college": "Chhatrapati Shahu Ji Maharaj University",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-390/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 27042,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 88,
      "aptitude_score": 77,
      "problem_solving_score": 84,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 77,
      "time_span_days": 29,
      "burst_ratio": 0.55,
      "deletion_ratio": 0.41,
      "organic_growth": true,
      "message_maturity_score": 84,
      "test_files_detected": 11,
      "authenticity_score": 93,
      "summary": "77 commits across 29 days. Refactor ratio: 41%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts",
      "src/__tests__/app.test.tsx"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 77 organic commits over 29 days with 41% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_390_8e4af16b50c1"
    }
  },
  {
    "candidate_id": "cand_fresher_391",
    "name": "Aditya Awasthi",
    "anonymised_name": "Fresher Candidate #391 (A. Awasthi)",
    "college": "IIT Madras",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-391/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 3518,
    "authenticity_score": 81,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 73,
      "aptitude_score": 73,
      "problem_solving_score": 93,
      "composite_assessment": 79
    },
    "git_dna": {
      "total_commits": 41,
      "time_span_days": 60,
      "burst_ratio": 0.34,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 95,
      "test_files_detected": 10,
      "authenticity_score": 81,
      "summary": "41 commits across 60 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (81% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 81% Git-DNA originality across 41 organic commits over 60 days with 28% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_391_4d336eca4eb5"
    }
  },
  {
    "candidate_id": "cand_fresher_392",
    "name": "Arjun Kumar",
    "anonymised_name": "Fresher Candidate #392 (A. Kumar)",
    "college": "Rajiv Gandhi Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-392/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 5408,
    "authenticity_score": 35,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_392",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.65,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 55,
      "aptitude_score": 57,
      "problem_solving_score": 64,
      "composite_assessment": 58
    },
    "git_dna": {
      "total_commits": 3,
      "time_span_days": 2,
      "burst_ratio": 0.88,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 30,
      "test_files_detected": 0,
      "authenticity_score": 35,
      "summary": "3 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (35% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 65% structural overlap across only 3 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_392_3daf43e02d6a"
    }
  },
  {
    "candidate_id": "cand_fresher_393",
    "name": "Meera Patel",
    "anonymised_name": "Fresher Candidate #393 (M. Patel)",
    "college": "Anna University",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-393/cloud-core",
    "project_type": "Cloud Infrastructure / DevOps",
    "primary_language": "Go",
    "verified_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus",
      "Bash"
    ],
    "total_loc": 14492,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 6,
    "assessment_results": {
      "coding_score": 91,
      "aptitude_score": 84,
      "problem_solving_score": 75,
      "composite_assessment": 84
    },
    "git_dna": {
      "total_commits": 148,
      "time_span_days": 88,
      "burst_ratio": 0.4,
      "deletion_ratio": 0.39,
      "organic_growth": true,
      "message_maturity_score": 89,
      "test_files_detected": 0,
      "authenticity_score": 83,
      "summary": "148 commits across 88 days. Refactor ratio: 39%."
    },
    "detected_files": [
      "src/docker_module.ts",
      "src/kubernetes_module.ts",
      "src/terraform_module.ts",
      "src/github actions_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 6/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 148 organic commits over 88 days with 39% refactoring ratio. Viva defense score: 6/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_393_bc1d2ef077a0"
    }
  },
  {
    "candidate_id": "cand_fresher_394",
    "name": "Neha Reddy",
    "anonymised_name": "Fresher Candidate #394 (N. Reddy)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-394/go-core",
    "project_type": "Go Distributed Microservices",
    "primary_language": "Go",
    "verified_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "Redis"
    ],
    "total_loc": 26714,
    "authenticity_score": 13,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_394",
      "name": "FreeCodeCamp Tutorial Copy",
      "author": "FreeCodeCamp / Beau Carnes",
      "source_url": "https://github.com/freeCodeCamp/python-full-course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.87,
      "verdict": "AST Winnowing Fingerprint matched public repository 'FreeCodeCamp Tutorial Copy'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 4,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 63,
      "problem_solving_score": 45,
      "composite_assessment": 56
    },
    "git_dna": {
      "total_commits": 1,
      "time_span_days": 2,
      "burst_ratio": 0.87,
      "deletion_ratio": 0.04,
      "organic_growth": false,
      "message_maturity_score": 30,
      "test_files_detected": 0,
      "authenticity_score": 13,
      "summary": "1 commits across 2 days. Refactor ratio: 4%."
    },
    "detected_files": [
      "src/go_module.ts",
      "src/grpc_module.ts",
      "src/docker_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (13% authenticity, Viva: 4/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'FreeCodeCamp Tutorial Copy' with 87% structural overlap across only 1 commits over 2 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_394_b8f3299888ad"
    }
  },
  {
    "candidate_id": "cand_fresher_395",
    "name": "Meera Mishra",
    "anonymised_name": "Fresher Candidate #395 (M. Mishra)",
    "college": "Babu Banarasi Das Institute",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-395/ai-core",
    "project_type": "AI / ML Pipeline",
    "primary_language": "Python",
    "verified_skills": [
      "PyTorch",
      "scikit-learn",
      "FastAPI",
      "Pandas",
      "NumPy",
      "MLflow"
    ],
    "total_loc": 10947,
    "authenticity_score": 93,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 7,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 96,
      "problem_solving_score": 84,
      "composite_assessment": 89
    },
    "git_dna": {
      "total_commits": 50,
      "time_span_days": 66,
      "burst_ratio": 0.51,
      "deletion_ratio": 0.3,
      "organic_growth": true,
      "message_maturity_score": 78,
      "test_files_detected": 12,
      "authenticity_score": 93,
      "summary": "50 commits across 66 days. Refactor ratio: 30%."
    },
    "detected_files": [
      "src/pytorch_module.py",
      "src/scikit-learn_module.py",
      "src/fastapi_module.py",
      "src/pandas_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_EXEMPLARY",
      "headline": "Verified Authentic Builder (93% authenticity, Viva: 7/10).",
      "human_readable_reason": "Verified authentic builder: 93% Git-DNA originality across 50 organic commits over 66 days with 30% refactoring ratio. Viva defense score: 7/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_395_d51cfcbd3854"
    }
  },
  {
    "candidate_id": "cand_fresher_396",
    "name": "Nikhil Pandey",
    "anonymised_name": "Fresher Candidate #396 (N. Pandey)",
    "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-396/java-core",
    "project_type": "Java Spring Boot Enterprise",
    "primary_language": "Java",
    "verified_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "JUnit",
      "Kafka"
    ],
    "total_loc": 18322,
    "authenticity_score": 83,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 87,
      "aptitude_score": 93,
      "problem_solving_score": 94,
      "composite_assessment": 91
    },
    "git_dna": {
      "total_commits": 66,
      "time_span_days": 87,
      "burst_ratio": 0.52,
      "deletion_ratio": 0.28,
      "organic_growth": true,
      "message_maturity_score": 79,
      "test_files_detected": 0,
      "authenticity_score": 83,
      "summary": "66 commits across 87 days. Refactor ratio: 28%."
    },
    "detected_files": [
      "src/java_module.ts",
      "src/spring boot_module.ts",
      "src/hibernate_module.ts",
      "src/postgresql_module.ts"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (83% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 83% Git-DNA originality across 66 organic commits over 87 days with 28% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_396_db25b1bf5bda"
    }
  },
  {
    "candidate_id": "cand_fresher_397",
    "name": "Nikhil Saxena",
    "anonymised_name": "Fresher Candidate #397 (N. Saxena)",
    "college": "VIT Vellore",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-397/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 23722,
    "authenticity_score": 78,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 10,
    "assessment_results": {
      "coding_score": 74,
      "aptitude_score": 70,
      "problem_solving_score": 85,
      "composite_assessment": 76
    },
    "git_dna": {
      "total_commits": 31,
      "time_span_days": 66,
      "burst_ratio": 0.53,
      "deletion_ratio": 0.21,
      "organic_growth": true,
      "message_maturity_score": 87,
      "test_files_detected": 13,
      "authenticity_score": 78,
      "summary": "31 commits across 66 days. Refactor ratio: 21%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (78% authenticity, Viva: 10/10).",
      "human_readable_reason": "Verified authentic builder: 78% Git-DNA originality across 31 organic commits over 66 days with 21% refactoring ratio. Viva defense score: 10/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_397_2406b23b24b1"
    }
  },
  {
    "candidate_id": "cand_fresher_398",
    "name": "Pooja Chawla",
    "anonymised_name": "Fresher Candidate #398 (P. Chawla)",
    "college": "RV College of Engineering",
    "college_tier": "Tier-2",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-398/cyber-core",
    "project_type": "Cyber Security & Crypto",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Cryptography",
      "C++",
      "Docker",
      "OAuth2",
      "Linux"
    ],
    "total_loc": 1844,
    "authenticity_score": 26,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_398",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.74,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 2,
    "assessment_results": {
      "coding_score": 59,
      "aptitude_score": 72,
      "problem_solving_score": 60,
      "composite_assessment": 63
    },
    "git_dna": {
      "total_commits": 4,
      "time_span_days": 1,
      "burst_ratio": 0.96,
      "deletion_ratio": 0.02,
      "organic_growth": false,
      "message_maturity_score": 40,
      "test_files_detected": 0,
      "authenticity_score": 26,
      "summary": "4 commits across 1 days. Refactor ratio: 2%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/cryptography_module.py",
      "src/c++_module.py",
      "src/docker_module.py"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (26% authenticity, Viva: 2/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 74% structural overlap across only 4 commits over 1 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_398_9817567add06"
    }
  },
  {
    "candidate_id": "cand_fresher_399",
    "name": "Ananya Joshi",
    "anonymised_name": "Fresher Candidate #399 (A. Joshi)",
    "college": "Techno India College of Technology",
    "college_tier": "Tier-3",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-399/mobile-core",
    "project_type": "Mobile Flutter & Kotlin",
    "primary_language": "Dart",
    "verified_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "total_loc": 32776,
    "authenticity_score": 36,
    "is_clone": true,
    "matched_tutorial": {
      "id": "tut_399",
      "name": "Sigma Web Dev Course Dump",
      "author": "CodeWithHarry",
      "source_url": "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course",
      "origin_type": "GLOBAL_ORIGIN",
      "similarity_score": 0.64,
      "verdict": "AST Winnowing Fingerprint matched public repository 'Sigma Web Dev Course Dump'.",
      "matched_files": [
        "src/index.js",
        "src/App.js",
        "package.json"
      ]
    },
    "viva_score": 3,
    "assessment_results": {
      "coding_score": 68,
      "aptitude_score": 51,
      "problem_solving_score": 56,
      "composite_assessment": 59
    },
    "git_dna": {
      "total_commits": 2,
      "time_span_days": 3,
      "burst_ratio": 0.86,
      "deletion_ratio": 0.05,
      "organic_growth": false,
      "message_maturity_score": 41,
      "test_files_detected": 0,
      "authenticity_score": 36,
      "summary": "2 commits across 3 days. Refactor ratio: 5%."
    },
    "detected_files": [
      "src/flutter_module.ts",
      "src/dart_module.ts",
      "src/kotlin_module.ts",
      "src/firebase_module.ts"
    ],
    "proof_card": {
      "status": "REJECTED_PLAGIARISM",
      "headline": "Flagged Clone (36% authenticity, Viva: 3/10).",
      "human_readable_reason": "Flagged by Git-DNA & AST Clone Radar: Repository matches 'Sigma Web Dev Course Dump' with 64% structural overlap across only 2 commits over 3 days.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_399_297b4a6b4167"
    }
  },
  {
    "candidate_id": "cand_fresher_400",
    "name": "Gaurav Awasthi",
    "anonymised_name": "Fresher Candidate #400 (G. Awasthi)",
    "college": "IIT Roorkee",
    "college_tier": "Tier-1",
    "consent_status": "CONSENT_GRANTED",
    "consent_timestamp": "2026-10-25T12:00:00Z",
    "consent_verified": true,
    "repo_url": "https://github.com/consented-fresher-400/data-core",
    "project_type": "Data Engineering & Telemetry",
    "primary_language": "Python",
    "verified_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL",
      "Redis"
    ],
    "total_loc": 5521,
    "authenticity_score": 87,
    "is_clone": false,
    "matched_tutorial": null,
    "viva_score": 8,
    "assessment_results": {
      "coding_score": 82,
      "aptitude_score": 77,
      "problem_solving_score": 87,
      "composite_assessment": 82
    },
    "git_dna": {
      "total_commits": 72,
      "time_span_days": 85,
      "burst_ratio": 0.46,
      "deletion_ratio": 0.31,
      "organic_growth": true,
      "message_maturity_score": 93,
      "test_files_detected": 5,
      "authenticity_score": 87,
      "summary": "72 commits across 85 days. Refactor ratio: 31%."
    },
    "detected_files": [
      "src/python_module.py",
      "src/spark_module.py",
      "src/kafka_module.py",
      "src/fastapi_module.py",
      "tests/test_core.py"
    ],
    "proof_card": {
      "status": "VERIFIED_COMPETENT",
      "headline": "Verified Authentic Builder (87% authenticity, Viva: 8/10).",
      "human_readable_reason": "Verified authentic builder: 87% Git-DNA originality across 72 organic commits over 85 days with 31% refactoring ratio. Viva defense score: 8/10.",
      "tamper_proof_hash": "SHA256:proof_cand_fresher_400_c1483ac893ed"
    }
  }
];

export const IM105_JOB_DESCRIPTIONS_30 = [
  {
    "jd_id": "jd_01",
    "title": "Python Backend & Microservices Engineer",
    "domain": "Backend",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "pytest"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Python Backend & Microservices Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_267",
      "cand_fresher_105",
      "cand_fresher_350",
      "cand_fresher_128",
      "cand_fresher_263",
      "cand_fresher_056",
      "cand_fresher_223",
      "cand_fresher_233",
      "cand_fresher_019",
      "cand_fresher_308",
      "cand_fresher_135",
      "cand_fresher_265"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_267",
        "name": "Ayush Joshi",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Python Backend & Microservices Engineer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_105",
        "name": "Isha Trivedi",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Python Backend & Microservices Engineer, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_350",
        "name": "Divya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Python Backend & Microservices Engineer, 88% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_128",
        "name": "Amit Trivedi",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 85,
        "viva_score": 10,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Python Backend & Microservices Engineer, 85% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_263",
        "name": "Riya Gupta",
        "college": "NIT Surathkal",
        "college_tier": "Tier-1",
        "authenticity_score": 93,
        "viva_score": 9,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Python Backend & Microservices Engineer, 93% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_02",
    "title": "React & TypeScript Frontend Systems Developer",
    "domain": "Frontend",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Jest"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for React & TypeScript Frontend Systems Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_345",
      "cand_fresher_017",
      "cand_fresher_183",
      "cand_fresher_247",
      "cand_fresher_148",
      "cand_fresher_203",
      "cand_fresher_117",
      "cand_fresher_102",
      "cand_fresher_154",
      "cand_fresher_266",
      "cand_fresher_386",
      "cand_fresher_012"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_345",
        "name": "Rahul Chawla",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 96,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for React & TypeScript Frontend Systems Developer, 96% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_017",
        "name": "Siddharth Tripathi",
        "college": "Babu Banarasi Das Institute",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for React & TypeScript Frontend Systems Developer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_183",
        "name": "Akanksha Bhatia",
        "college": "Anna University",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for React & TypeScript Frontend Systems Developer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_247",
        "name": "Arjun Chawla",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for React & TypeScript Frontend Systems Developer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_148",
        "name": "Vikram Trivedi",
        "college": "Bundelkhand Institute of Engineering & Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for React & TypeScript Frontend Systems Developer, 88% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_03",
    "title": "AI / ML Pipeline & GenAI Platform Engineer",
    "domain": "AI/ML",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "PyTorch",
      "Python",
      "FastAPI",
      "scikit-learn",
      "Pandas"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for AI / ML Pipeline & GenAI Platform Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_075",
      "cand_fresher_051",
      "cand_fresher_299",
      "cand_fresher_334",
      "cand_fresher_021",
      "cand_fresher_255",
      "cand_fresher_005",
      "cand_fresher_085",
      "cand_fresher_118",
      "cand_fresher_130",
      "cand_fresher_367",
      "cand_fresher_368"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_075",
        "name": "Nikhil Patel",
        "college": "Techno India College of Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for AI / ML Pipeline & GenAI Platform Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_051",
        "name": "Anushka Mehta",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for AI / ML Pipeline & GenAI Platform Engineer, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_299",
        "name": "Mohit Reddy",
        "college": "NIT Trichy",
        "college_tier": "Tier-1",
        "authenticity_score": 90,
        "viva_score": 10,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for AI / ML Pipeline & GenAI Platform Engineer, 90% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_334",
        "name": "Priyanshu Choudhury",
        "college": "IIIT Hyderabad",
        "college_tier": "Tier-1",
        "authenticity_score": 95,
        "viva_score": 9,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for AI / ML Pipeline & GenAI Platform Engineer, 95% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_021",
        "name": "Nikhil Kapoor",
        "college": "IIT Bombay",
        "college_tier": "Tier-1",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 87,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for AI / ML Pipeline & GenAI Platform Engineer, 87% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_04",
    "title": "Cloud Infrastructure & Kubernetes DevOps Engineer",
    "domain": "DevOps",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Prometheus"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Cloud Infrastructure & Kubernetes DevOps Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_149",
      "cand_fresher_232",
      "cand_fresher_161",
      "cand_fresher_352",
      "cand_fresher_112",
      "cand_fresher_121",
      "cand_fresher_053",
      "cand_fresher_347",
      "cand_fresher_006",
      "cand_fresher_107",
      "cand_fresher_311",
      "cand_fresher_214"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_149",
        "name": "Sneha Saxena",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 98,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cloud Infrastructure & Kubernetes DevOps Engineer, 98% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_232",
        "name": "Kunal Sharma",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cloud Infrastructure & Kubernetes DevOps Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_161",
        "name": "Nikhil Patel",
        "college": "IIT Kharagpur",
        "college_tier": "Tier-1",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cloud Infrastructure & Kubernetes DevOps Engineer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_352",
        "name": "Priyanshu Nair",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cloud Infrastructure & Kubernetes DevOps Engineer, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_112",
        "name": "Tanvi Trivedi",
        "college": "Rajiv Gandhi Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 97,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cloud Infrastructure & Kubernetes DevOps Engineer, 97% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_05",
    "title": "Go Distributed Systems & High-Throughput Architect",
    "domain": "Systems",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Kafka"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Go Distributed Systems & High-Throughput Architect. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_055",
      "cand_fresher_159",
      "cand_fresher_238",
      "cand_fresher_231",
      "cand_fresher_144",
      "cand_fresher_259",
      "cand_fresher_270",
      "cand_fresher_363",
      "cand_fresher_037",
      "cand_fresher_188",
      "cand_fresher_302",
      "cand_fresher_064"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_055",
        "name": "Manish Saxena",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Go Distributed Systems & High-Throughput Architect, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_159",
        "name": "Sameer Singh",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Go Distributed Systems & High-Throughput Architect, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_238",
        "name": "Karan Joshi",
        "college": "Jadavpur University",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Go Distributed Systems & High-Throughput Architect, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_231",
        "name": "Varun Kumar",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 90,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Go Distributed Systems & High-Throughput Architect, 90% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_144",
        "name": "Siddharth Nair",
        "college": "Techno India College of Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 91,
        "viva_score": 9,
        "composite_score": 94,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Go Distributed Systems & High-Throughput Architect, 91% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_06",
    "title": "Java Spring Boot Enterprise Banking Engineer",
    "domain": "Enterprise",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "Kafka"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Java Spring Boot Enterprise Banking Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_067",
      "cand_fresher_316",
      "cand_fresher_346",
      "cand_fresher_024",
      "cand_fresher_089",
      "cand_fresher_208",
      "cand_fresher_228",
      "cand_fresher_095",
      "cand_fresher_396",
      "cand_fresher_142",
      "cand_fresher_251",
      "cand_fresher_083"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_067",
        "name": "Siddharth Kapoor",
        "college": "IIIT Hyderabad",
        "college_tier": "Tier-1",
        "authenticity_score": 98,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Java Spring Boot Enterprise Banking Engineer, 98% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_316",
        "name": "Pooja Kumar",
        "college": "PSG College of Technology",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Java Spring Boot Enterprise Banking Engineer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_346",
        "name": "Riya Saxena",
        "college": "Babu Banarasi Das Institute",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Java Spring Boot Enterprise Banking Engineer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_024",
        "name": "Aditya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Java Spring Boot Enterprise Banking Engineer, 88% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_089",
        "name": "Manish Verma",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Java Spring Boot Enterprise Banking Engineer, 96% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_07",
    "title": "Fullstack Node.js & Realtime Web Developer",
    "domain": "Fullstack",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "React"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Fullstack Node.js & Realtime Web Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_088",
      "cand_fresher_216",
      "cand_fresher_049",
      "cand_fresher_258",
      "cand_fresher_278",
      "cand_fresher_283",
      "cand_fresher_134",
      "cand_fresher_061",
      "cand_fresher_248",
      "cand_fresher_164",
      "cand_fresher_182",
      "cand_fresher_212"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_088",
        "name": "Gaurav Choudhury",
        "college": "United College of Engineering & Research",
        "college_tier": "Tier-3",
        "authenticity_score": 97,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Fullstack Node.js & Realtime Web Developer, 97% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_216",
        "name": "Deepika Choudhury",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Fullstack Node.js & Realtime Web Developer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_049",
        "name": "Simran Patel",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Fullstack Node.js & Realtime Web Developer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_258",
        "name": "Ananya Gupta",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 82,
        "viva_score": 10,
        "composite_score": 94,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Fullstack Node.js & Realtime Web Developer, 82% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_278",
        "name": "Aayushi Saxena",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 98,
        "viva_score": 8,
        "composite_score": 94,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Fullstack Node.js & Realtime Web Developer, 98% Git-DNA originality, 8/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_08",
    "title": "Data Telemetry & Stream Processing Engineer",
    "domain": "Data",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Python",
      "Spark",
      "Kafka",
      "FastAPI",
      "PostgreSQL"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Data Telemetry & Stream Processing Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_199",
      "cand_fresher_276",
      "cand_fresher_071",
      "cand_fresher_052",
      "cand_fresher_298",
      "cand_fresher_031",
      "cand_fresher_041",
      "cand_fresher_378",
      "cand_fresher_381",
      "cand_fresher_397",
      "cand_fresher_079",
      "cand_fresher_292"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_199",
        "name": "Shreya Chawla",
        "college": "PSG College of Technology",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Data Telemetry & Stream Processing Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_276",
        "name": "Deepika Saxena",
        "college": "Government Engineering College Bilaspur",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Data Telemetry & Stream Processing Engineer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_071",
        "name": "Anushka Saxena",
        "college": "IIT Bombay",
        "college_tier": "Tier-1",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Data Telemetry & Stream Processing Engineer, 87% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_052",
        "name": "Akanksha Sharma",
        "college": "State Institute of Engineering & Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 82,
        "viva_score": 10,
        "composite_score": 94,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Data Telemetry & Stream Processing Engineer, 82% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_298",
        "name": "Shreya Mishra",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 80,
        "viva_score": 10,
        "composite_score": 93,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Data Telemetry & Stream Processing Engineer, 80% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_09",
    "title": "Mobile Cross-Platform Flutter & Native Developer",
    "domain": "Mobile",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Flutter",
      "Dart",
      "Kotlin",
      "Firebase",
      "REST APIs"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Mobile Cross-Platform Flutter & Native Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_033",
      "cand_fresher_096",
      "cand_fresher_042",
      "cand_fresher_098",
      "cand_fresher_213",
      "cand_fresher_301",
      "cand_fresher_249",
      "cand_fresher_257",
      "cand_fresher_286",
      "cand_fresher_349",
      "cand_fresher_030",
      "cand_fresher_306"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_033",
        "name": "Varun Joshi",
        "college": "United College of Engineering & Research",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Mobile Cross-Platform Flutter & Native Developer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_096",
        "name": "Vikram Sharma",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Mobile Cross-Platform Flutter & Native Developer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_042",
        "name": "Ritika Kapoor",
        "college": "Anna University",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Mobile Cross-Platform Flutter & Native Developer, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_098",
        "name": "Vikram Saxena",
        "college": "Government Engineering College Bilaspur",
        "college_tier": "Tier-3",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Mobile Cross-Platform Flutter & Native Developer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_213",
        "name": "Ritika Mishra",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Mobile Cross-Platform Flutter & Native Developer, 92% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_10",
    "title": "Cryptographic Systems & Zero-Trust Security Engineer",
    "domain": "Security",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Python",
      "Cryptography",
      "OAuth2",
      "Linux",
      "Docker"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Cryptographic Systems & Zero-Trust Security Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_097",
      "cand_fresher_043",
      "cand_fresher_379",
      "cand_fresher_039",
      "cand_fresher_239",
      "cand_fresher_204",
      "cand_fresher_244",
      "cand_fresher_377",
      "cand_fresher_086",
      "cand_fresher_315",
      "cand_fresher_179",
      "cand_fresher_296"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_097",
        "name": "Ananya Patel",
        "college": "Rajiv Gandhi Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 96,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cryptographic Systems & Zero-Trust Security Engineer, 96% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_043",
        "name": "Kavya Gupta",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cryptographic Systems & Zero-Trust Security Engineer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_379",
        "name": "Arjun Reddy",
        "college": "IIT Kanpur",
        "college_tier": "Tier-1",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cryptographic Systems & Zero-Trust Security Engineer, 96% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_039",
        "name": "Arjun Pandey",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 9,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cryptographic Systems & Zero-Trust Security Engineer, 93% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_239",
        "name": "Ritika Tripathi",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Cryptographic Systems & Zero-Trust Security Engineer, 87% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_11",
    "title": "FastAPI Async API Gateway Specialist",
    "domain": "Backend",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "FastAPI",
      "Python",
      "asyncio",
      "Redis",
      "PostgreSQL"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for FastAPI Async API Gateway Specialist. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_267",
      "cand_fresher_105",
      "cand_fresher_350",
      "cand_fresher_128",
      "cand_fresher_263",
      "cand_fresher_056",
      "cand_fresher_223",
      "cand_fresher_233",
      "cand_fresher_019",
      "cand_fresher_308",
      "cand_fresher_135",
      "cand_fresher_265"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_267",
        "name": "Ayush Joshi",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FastAPI Async API Gateway Specialist, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_105",
        "name": "Isha Trivedi",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FastAPI Async API Gateway Specialist, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_350",
        "name": "Divya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FastAPI Async API Gateway Specialist, 88% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_128",
        "name": "Amit Trivedi",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 85,
        "viva_score": 10,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FastAPI Async API Gateway Specialist, 85% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_263",
        "name": "Riya Gupta",
        "college": "NIT Surathkal",
        "college_tier": "Tier-1",
        "authenticity_score": 93,
        "viva_score": 9,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FastAPI Async API Gateway Specialist, 93% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_12",
    "title": "Next.js Serverless & Edge Computing Developer",
    "domain": "Frontend",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Next.js",
      "TypeScript",
      "React",
      "TailwindCSS",
      "REST APIs"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Next.js Serverless & Edge Computing Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_345",
      "cand_fresher_017",
      "cand_fresher_183",
      "cand_fresher_247",
      "cand_fresher_148",
      "cand_fresher_203",
      "cand_fresher_117",
      "cand_fresher_102",
      "cand_fresher_154",
      "cand_fresher_266",
      "cand_fresher_386",
      "cand_fresher_012"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_345",
        "name": "Rahul Chawla",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 96,
        "viva_score": 10,
        "composite_score": 91,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Next.js Serverless & Edge Computing Developer, 96% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_017",
        "name": "Siddharth Tripathi",
        "college": "Babu Banarasi Das Institute",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Next.js Serverless & Edge Computing Developer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_183",
        "name": "Akanksha Bhatia",
        "college": "Anna University",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Next.js Serverless & Edge Computing Developer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_247",
        "name": "Arjun Chawla",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Next.js Serverless & Edge Computing Developer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_148",
        "name": "Vikram Trivedi",
        "college": "Bundelkhand Institute of Engineering & Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Next.js Serverless & Edge Computing Developer, 88% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_13",
    "title": "Deep Learning NLP & LLM Fine-Tuning Engineer",
    "domain": "AI/ML",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "PyTorch",
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Deep Learning NLP & LLM Fine-Tuning Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_075",
      "cand_fresher_051",
      "cand_fresher_299",
      "cand_fresher_334",
      "cand_fresher_021",
      "cand_fresher_255",
      "cand_fresher_005",
      "cand_fresher_085",
      "cand_fresher_118",
      "cand_fresher_130",
      "cand_fresher_367",
      "cand_fresher_368"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_075",
        "name": "Nikhil Patel",
        "college": "Techno India College of Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Deep Learning NLP & LLM Fine-Tuning Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_051",
        "name": "Anushka Mehta",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Deep Learning NLP & LLM Fine-Tuning Engineer, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_299",
        "name": "Mohit Reddy",
        "college": "NIT Trichy",
        "college_tier": "Tier-1",
        "authenticity_score": 90,
        "viva_score": 10,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Deep Learning NLP & LLM Fine-Tuning Engineer, 90% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_334",
        "name": "Priyanshu Choudhury",
        "college": "IIIT Hyderabad",
        "college_tier": "Tier-1",
        "authenticity_score": 95,
        "viva_score": 9,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Deep Learning NLP & LLM Fine-Tuning Engineer, 95% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_021",
        "name": "Nikhil Kapoor",
        "college": "IIT Bombay",
        "college_tier": "Tier-1",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 87,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Deep Learning NLP & LLM Fine-Tuning Engineer, 87% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_14",
    "title": "Site Reliability Engineer (SRE & Observability)",
    "domain": "DevOps",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Kubernetes",
      "Docker",
      "Prometheus",
      "Bash",
      "Linux"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Site Reliability Engineer (SRE & Observability). Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_149",
      "cand_fresher_232",
      "cand_fresher_161",
      "cand_fresher_352",
      "cand_fresher_112",
      "cand_fresher_121",
      "cand_fresher_053",
      "cand_fresher_347",
      "cand_fresher_006",
      "cand_fresher_107",
      "cand_fresher_311",
      "cand_fresher_214"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_149",
        "name": "Sneha Saxena",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 98,
        "viva_score": 10,
        "composite_score": 91,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Site Reliability Engineer (SRE & Observability), 98% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_232",
        "name": "Kunal Sharma",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Site Reliability Engineer (SRE & Observability), 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_161",
        "name": "Nikhil Patel",
        "college": "IIT Kharagpur",
        "college_tier": "Tier-1",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Site Reliability Engineer (SRE & Observability), 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_352",
        "name": "Priyanshu Nair",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Site Reliability Engineer (SRE & Observability), 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_112",
        "name": "Tanvi Trivedi",
        "college": "Rajiv Gandhi Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 97,
        "viva_score": 9,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Site Reliability Engineer (SRE & Observability), 97% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_15",
    "title": "Kafka Event-Driven Microservices Specialist",
    "domain": "Systems",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Kafka",
      "Go",
      "Docker",
      "PostgreSQL",
      "gRPC"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Kafka Event-Driven Microservices Specialist. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_055",
      "cand_fresher_159",
      "cand_fresher_238",
      "cand_fresher_231",
      "cand_fresher_144",
      "cand_fresher_259",
      "cand_fresher_270",
      "cand_fresher_363",
      "cand_fresher_037",
      "cand_fresher_188",
      "cand_fresher_302",
      "cand_fresher_064"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_055",
        "name": "Manish Saxena",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Kafka Event-Driven Microservices Specialist, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_159",
        "name": "Sameer Singh",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Kafka Event-Driven Microservices Specialist, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_238",
        "name": "Karan Joshi",
        "college": "Jadavpur University",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Kafka Event-Driven Microservices Specialist, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_231",
        "name": "Varun Kumar",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 90,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Kafka Event-Driven Microservices Specialist, 90% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_144",
        "name": "Siddharth Nair",
        "college": "Techno India College of Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 91,
        "viva_score": 9,
        "composite_score": 94,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Kafka Event-Driven Microservices Specialist, 91% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_16",
    "title": "Enterprise Microservices Core Java Architect",
    "domain": "Enterprise",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Hibernate",
      "JUnit"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Enterprise Microservices Core Java Architect. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_067",
      "cand_fresher_316",
      "cand_fresher_346",
      "cand_fresher_024",
      "cand_fresher_089",
      "cand_fresher_208",
      "cand_fresher_228",
      "cand_fresher_095",
      "cand_fresher_396",
      "cand_fresher_142",
      "cand_fresher_251",
      "cand_fresher_083"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_067",
        "name": "Siddharth Kapoor",
        "college": "IIIT Hyderabad",
        "college_tier": "Tier-1",
        "authenticity_score": 98,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Enterprise Microservices Core Java Architect, 98% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_316",
        "name": "Pooja Kumar",
        "college": "PSG College of Technology",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Enterprise Microservices Core Java Architect, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_346",
        "name": "Riya Saxena",
        "college": "Babu Banarasi Das Institute",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Enterprise Microservices Core Java Architect, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_024",
        "name": "Aditya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Enterprise Microservices Core Java Architect, 88% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_089",
        "name": "Manish Verma",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Enterprise Microservices Core Java Architect, 96% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_17",
    "title": "TypeScript Fullstack Cloud Native Engineer",
    "domain": "Fullstack",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "TypeScript",
      "Node.js",
      "React",
      "Docker",
      "PostgreSQL"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for TypeScript Fullstack Cloud Native Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_088",
      "cand_fresher_216",
      "cand_fresher_049",
      "cand_fresher_258",
      "cand_fresher_278",
      "cand_fresher_283",
      "cand_fresher_134",
      "cand_fresher_061",
      "cand_fresher_248",
      "cand_fresher_164",
      "cand_fresher_182",
      "cand_fresher_212"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_088",
        "name": "Gaurav Choudhury",
        "college": "United College of Engineering & Research",
        "college_tier": "Tier-3",
        "authenticity_score": 97,
        "viva_score": 10,
        "composite_score": 91,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for TypeScript Fullstack Cloud Native Engineer, 97% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_216",
        "name": "Deepika Choudhury",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for TypeScript Fullstack Cloud Native Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_049",
        "name": "Simran Patel",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for TypeScript Fullstack Cloud Native Engineer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_258",
        "name": "Ananya Gupta",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 82,
        "viva_score": 10,
        "composite_score": 86,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for TypeScript Fullstack Cloud Native Engineer, 82% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_278",
        "name": "Aayushi Saxena",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 98,
        "viva_score": 8,
        "composite_score": 86,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for TypeScript Fullstack Cloud Native Engineer, 98% Git-DNA originality, 8/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_18",
    "title": "Realtime IoT Telemetry & Sensor Streaming Engineer",
    "domain": "Data",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Python",
      "Kafka",
      "FastAPI",
      "Redis",
      "Docker"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Realtime IoT Telemetry & Sensor Streaming Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_199",
      "cand_fresher_267",
      "cand_fresher_276",
      "cand_fresher_105",
      "cand_fresher_350",
      "cand_fresher_071",
      "cand_fresher_128",
      "cand_fresher_263",
      "cand_fresher_052",
      "cand_fresher_056",
      "cand_fresher_223",
      "cand_fresher_233"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_199",
        "name": "Shreya Chawla",
        "college": "PSG College of Technology",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Realtime IoT Telemetry & Sensor Streaming Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_267",
        "name": "Ayush Joshi",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Realtime IoT Telemetry & Sensor Streaming Engineer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_276",
        "name": "Deepika Saxena",
        "college": "Government Engineering College Bilaspur",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Realtime IoT Telemetry & Sensor Streaming Engineer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_105",
        "name": "Isha Trivedi",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Realtime IoT Telemetry & Sensor Streaming Engineer, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_350",
        "name": "Divya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Realtime IoT Telemetry & Sensor Streaming Engineer, 88% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_19",
    "title": "Android Native Kotlin Architect",
    "domain": "Mobile",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Kotlin",
      "Firebase",
      "REST APIs",
      "Docker",
      "Java"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Android Native Kotlin Architect. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_033",
      "cand_fresher_096",
      "cand_fresher_042",
      "cand_fresher_098",
      "cand_fresher_213",
      "cand_fresher_301",
      "cand_fresher_249",
      "cand_fresher_257",
      "cand_fresher_286",
      "cand_fresher_349",
      "cand_fresher_030",
      "cand_fresher_306"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_033",
        "name": "Varun Joshi",
        "college": "United College of Engineering & Research",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 82,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Android Native Kotlin Architect, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_096",
        "name": "Vikram Sharma",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 82,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Android Native Kotlin Architect, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_042",
        "name": "Ritika Kapoor",
        "college": "Anna University",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 81,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Android Native Kotlin Architect, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_098",
        "name": "Vikram Saxena",
        "college": "Government Engineering College Bilaspur",
        "college_tier": "Tier-3",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 81,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Android Native Kotlin Architect, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_213",
        "name": "Ritika Mishra",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 81,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Android Native Kotlin Architect, 92% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_20",
    "title": "Penetration Testing & Secure Coding Auditor",
    "domain": "Security",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Linux",
      "Cryptography",
      "Python",
      "Docker",
      "OAuth2"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Penetration Testing & Secure Coding Auditor. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_097",
      "cand_fresher_043",
      "cand_fresher_379",
      "cand_fresher_039",
      "cand_fresher_239",
      "cand_fresher_204",
      "cand_fresher_244",
      "cand_fresher_377",
      "cand_fresher_086",
      "cand_fresher_315",
      "cand_fresher_179",
      "cand_fresher_296"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_097",
        "name": "Ananya Patel",
        "college": "Rajiv Gandhi Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 96,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Penetration Testing & Secure Coding Auditor, 96% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_043",
        "name": "Kavya Gupta",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Penetration Testing & Secure Coding Auditor, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_379",
        "name": "Arjun Reddy",
        "college": "IIT Kanpur",
        "college_tier": "Tier-1",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Penetration Testing & Secure Coding Auditor, 96% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_039",
        "name": "Arjun Pandey",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 9,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Penetration Testing & Secure Coding Auditor, 93% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_239",
        "name": "Ritika Tripathi",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Penetration Testing & Secure Coding Auditor, 87% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_21",
    "title": "High-Performance Caching & Redis Architect",
    "domain": "Backend",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Redis",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "asyncio"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for High-Performance Caching & Redis Architect. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_267",
      "cand_fresher_105",
      "cand_fresher_350",
      "cand_fresher_128",
      "cand_fresher_263",
      "cand_fresher_056",
      "cand_fresher_223",
      "cand_fresher_233",
      "cand_fresher_019",
      "cand_fresher_308",
      "cand_fresher_135",
      "cand_fresher_265"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_267",
        "name": "Ayush Joshi",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for High-Performance Caching & Redis Architect, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_105",
        "name": "Isha Trivedi",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for High-Performance Caching & Redis Architect, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_350",
        "name": "Divya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for High-Performance Caching & Redis Architect, 88% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_128",
        "name": "Amit Trivedi",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 85,
        "viva_score": 10,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for High-Performance Caching & Redis Architect, 85% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_263",
        "name": "Riya Gupta",
        "college": "NIT Surathkal",
        "college_tier": "Tier-1",
        "authenticity_score": 93,
        "viva_score": 9,
        "composite_score": 95,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for High-Performance Caching & Redis Architect, 93% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_22",
    "title": "Modern Design Systems & WebGL 3D Developer",
    "domain": "Frontend",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Next.js",
      "Zustand"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Modern Design Systems & WebGL 3D Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_345",
      "cand_fresher_017",
      "cand_fresher_183",
      "cand_fresher_247",
      "cand_fresher_148",
      "cand_fresher_203",
      "cand_fresher_117",
      "cand_fresher_102",
      "cand_fresher_154",
      "cand_fresher_266",
      "cand_fresher_386",
      "cand_fresher_012"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_345",
        "name": "Rahul Chawla",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 96,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Modern Design Systems & WebGL 3D Developer, 96% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_017",
        "name": "Siddharth Tripathi",
        "college": "Babu Banarasi Das Institute",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Modern Design Systems & WebGL 3D Developer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_183",
        "name": "Akanksha Bhatia",
        "college": "Anna University",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Modern Design Systems & WebGL 3D Developer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_247",
        "name": "Arjun Chawla",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Modern Design Systems & WebGL 3D Developer, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_148",
        "name": "Vikram Trivedi",
        "college": "Bundelkhand Institute of Engineering & Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for Modern Design Systems & WebGL 3D Developer, 88% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_23",
    "title": "Computer Vision & Edge Inference Engineer",
    "domain": "AI/ML",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Python",
      "PyTorch",
      "NumPy",
      "FastAPI",
      "Docker"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Computer Vision & Edge Inference Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_075",
      "cand_fresher_267",
      "cand_fresher_051",
      "cand_fresher_105",
      "cand_fresher_001",
      "cand_fresher_299",
      "cand_fresher_334",
      "cand_fresher_350",
      "cand_fresher_021",
      "cand_fresher_128",
      "cand_fresher_255",
      "cand_fresher_263"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_075",
        "name": "Nikhil Patel",
        "college": "Techno India College of Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 82,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Computer Vision & Edge Inference Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_267",
        "name": "Ayush Joshi",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 82,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Computer Vision & Edge Inference Engineer, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_051",
        "name": "Anushka Mehta",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 81,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Computer Vision & Edge Inference Engineer, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_105",
        "name": "Isha Trivedi",
        "college": "VIT Vellore",
        "college_tier": "Tier-2",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 81,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Computer Vision & Edge Inference Engineer, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_001",
        "name": "Priyanshu Awasthi & Team",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 80,
        "human_readable_reason": "Recruiter Shortlisted: Matched 60% skills for Computer Vision & Edge Inference Engineer, 96% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_24",
    "title": "CI/CD Automation & GitOps Engineer",
    "domain": "DevOps",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "GitHub Actions",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Bash"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for CI/CD Automation & GitOps Engineer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_149",
      "cand_fresher_232",
      "cand_fresher_161",
      "cand_fresher_352",
      "cand_fresher_112",
      "cand_fresher_121",
      "cand_fresher_053",
      "cand_fresher_347",
      "cand_fresher_006",
      "cand_fresher_107",
      "cand_fresher_311",
      "cand_fresher_214"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_149",
        "name": "Sneha Saxena",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 98,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for CI/CD Automation & GitOps Engineer, 98% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_232",
        "name": "Kunal Sharma",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for CI/CD Automation & GitOps Engineer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_161",
        "name": "Nikhil Patel",
        "college": "IIT Kharagpur",
        "college_tier": "Tier-1",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for CI/CD Automation & GitOps Engineer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_352",
        "name": "Priyanshu Nair",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 91,
        "viva_score": 10,
        "composite_score": 97,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for CI/CD Automation & GitOps Engineer, 91% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_112",
        "name": "Tanvi Trivedi",
        "college": "Rajiv Gandhi Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 97,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for CI/CD Automation & GitOps Engineer, 97% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_25",
    "title": "Distributed Consensus & Raft/Paxos Developer",
    "domain": "Systems",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Go",
      "gRPC",
      "Docker",
      "PostgreSQL",
      "Linux"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Distributed Consensus & Raft/Paxos Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_055",
      "cand_fresher_159",
      "cand_fresher_238",
      "cand_fresher_231",
      "cand_fresher_144",
      "cand_fresher_259",
      "cand_fresher_270",
      "cand_fresher_363",
      "cand_fresher_037",
      "cand_fresher_188",
      "cand_fresher_302",
      "cand_fresher_064"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_055",
        "name": "Manish Saxena",
        "college": "GLA University (Mathura)",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Distributed Consensus & Raft/Paxos Developer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_159",
        "name": "Sameer Singh",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Distributed Consensus & Raft/Paxos Developer, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_238",
        "name": "Karan Joshi",
        "college": "Jadavpur University",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Distributed Consensus & Raft/Paxos Developer, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_231",
        "name": "Varun Kumar",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 90,
        "viva_score": 10,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Distributed Consensus & Raft/Paxos Developer, 90% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_144",
        "name": "Siddharth Nair",
        "college": "Techno India College of Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 91,
        "viva_score": 9,
        "composite_score": 86,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Distributed Consensus & Raft/Paxos Developer, 91% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_26",
    "title": "FinTech Distributed Transaction Architect",
    "domain": "Enterprise",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Java",
      "Spring Boot",
      "Kafka",
      "PostgreSQL",
      "Hibernate"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for FinTech Distributed Transaction Architect. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_067",
      "cand_fresher_316",
      "cand_fresher_346",
      "cand_fresher_024",
      "cand_fresher_089",
      "cand_fresher_208",
      "cand_fresher_228",
      "cand_fresher_095",
      "cand_fresher_396",
      "cand_fresher_142",
      "cand_fresher_251",
      "cand_fresher_083"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_067",
        "name": "Siddharth Kapoor",
        "college": "IIIT Hyderabad",
        "college_tier": "Tier-1",
        "authenticity_score": 98,
        "viva_score": 10,
        "composite_score": 99,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FinTech Distributed Transaction Architect, 98% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_316",
        "name": "Pooja Kumar",
        "college": "PSG College of Technology",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FinTech Distributed Transaction Architect, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_346",
        "name": "Riya Saxena",
        "college": "Babu Banarasi Das Institute",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 98,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FinTech Distributed Transaction Architect, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_024",
        "name": "Aditya Verma",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 88,
        "viva_score": 10,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FinTech Distributed Transaction Architect, 88% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_089",
        "name": "Manish Verma",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 96,
        "human_readable_reason": "Recruiter Shortlisted: Matched 100% skills for FinTech Distributed Transaction Architect, 96% Git-DNA originality, 9/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_27",
    "title": "API Modernization & GraphQL Developer",
    "domain": "Fullstack",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "TypeScript",
      "Node.js",
      "Express",
      "React",
      "PostgreSQL"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for API Modernization & GraphQL Developer. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_088",
      "cand_fresher_216",
      "cand_fresher_049",
      "cand_fresher_258",
      "cand_fresher_278",
      "cand_fresher_283",
      "cand_fresher_134",
      "cand_fresher_061",
      "cand_fresher_248",
      "cand_fresher_164",
      "cand_fresher_182",
      "cand_fresher_212"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_088",
        "name": "Gaurav Choudhury",
        "college": "United College of Engineering & Research",
        "college_tier": "Tier-3",
        "authenticity_score": 97,
        "viva_score": 10,
        "composite_score": 91,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for API Modernization & GraphQL Developer, 97% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_216",
        "name": "Deepika Choudhury",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for API Modernization & GraphQL Developer, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_049",
        "name": "Simran Patel",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for API Modernization & GraphQL Developer, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_258",
        "name": "Ananya Gupta",
        "college": "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 82,
        "viva_score": 10,
        "composite_score": 86,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for API Modernization & GraphQL Developer, 82% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_278",
        "name": "Aayushi Saxena",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 98,
        "viva_score": 8,
        "composite_score": 86,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for API Modernization & GraphQL Developer, 98% Git-DNA originality, 8/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_28",
    "title": "Big Data Lakehouse & Spark ETL Specialist",
    "domain": "Data",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Spark",
      "Python",
      "Kafka",
      "PostgreSQL",
      "Docker"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for Big Data Lakehouse & Spark ETL Specialist. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_199",
      "cand_fresher_276",
      "cand_fresher_071",
      "cand_fresher_052",
      "cand_fresher_298",
      "cand_fresher_031",
      "cand_fresher_041",
      "cand_fresher_378",
      "cand_fresher_381",
      "cand_fresher_397",
      "cand_fresher_079",
      "cand_fresher_292"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_199",
        "name": "Shreya Chawla",
        "college": "PSG College of Technology",
        "college_tier": "Tier-2",
        "authenticity_score": 94,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Big Data Lakehouse & Spark ETL Specialist, 94% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_276",
        "name": "Deepika Saxena",
        "college": "Government Engineering College Bilaspur",
        "college_tier": "Tier-3",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Big Data Lakehouse & Spark ETL Specialist, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_071",
        "name": "Anushka Saxena",
        "college": "IIT Bombay",
        "college_tier": "Tier-1",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 87,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Big Data Lakehouse & Spark ETL Specialist, 87% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_052",
        "name": "Akanksha Sharma",
        "college": "State Institute of Engineering & Technology",
        "college_tier": "Tier-3",
        "authenticity_score": 82,
        "viva_score": 10,
        "composite_score": 86,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Big Data Lakehouse & Spark ETL Specialist, 82% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_298",
        "name": "Shreya Mishra",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 80,
        "viva_score": 10,
        "composite_score": 85,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for Big Data Lakehouse & Spark ETL Specialist, 80% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_29",
    "title": "iOS Native Swift & Mobile Architect",
    "domain": "Mobile",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Kotlin",
      "Flutter",
      "Firebase",
      "REST APIs",
      "TypeScript"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for iOS Native Swift & Mobile Architect. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_033",
      "cand_fresher_096",
      "cand_fresher_042",
      "cand_fresher_098",
      "cand_fresher_213",
      "cand_fresher_301",
      "cand_fresher_249",
      "cand_fresher_257",
      "cand_fresher_286",
      "cand_fresher_349",
      "cand_fresher_030",
      "cand_fresher_306"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_033",
        "name": "Varun Joshi",
        "college": "United College of Engineering & Research",
        "college_tier": "Tier-3",
        "authenticity_score": 93,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for iOS Native Swift & Mobile Architect, 93% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_096",
        "name": "Vikram Sharma",
        "college": "Thapar Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 95,
        "viva_score": 10,
        "composite_score": 90,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for iOS Native Swift & Mobile Architect, 95% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_042",
        "name": "Ritika Kapoor",
        "college": "Anna University",
        "college_tier": "Tier-2",
        "authenticity_score": 98,
        "viva_score": 9,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for iOS Native Swift & Mobile Architect, 98% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_098",
        "name": "Vikram Saxena",
        "college": "Government Engineering College Bilaspur",
        "college_tier": "Tier-3",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for iOS Native Swift & Mobile Architect, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_213",
        "name": "Ritika Mishra",
        "college": "IIT Delhi",
        "college_tier": "Tier-1",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for iOS Native Swift & Mobile Architect, 92% Git-DNA originality, 10/10 viva defense."
      }
    ]
  },
  {
    "jd_id": "jd_30",
    "title": "SOC2 Compliance & Zero-Trust Cloud Auditor",
    "domain": "Security",
    "experience_level": "Fresher / Campus Graduate (0-1 Years)",
    "required_skills": [
      "Docker",
      "Linux",
      "Python",
      "Cryptography",
      "Terraform"
    ],
    "preferred_skills": [
      "Git Workflow",
      "Automated Testing",
      "Clean Architecture"
    ],
    "description": "Integraminds Campus Hiring for SOC2 Compliance & Zero-Trust Cloud Auditor. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
    "ground_truth_shortlist_ids": [
      "cand_fresher_097",
      "cand_fresher_043",
      "cand_fresher_379",
      "cand_fresher_039",
      "cand_fresher_239",
      "cand_fresher_204",
      "cand_fresher_244",
      "cand_fresher_377",
      "cand_fresher_086",
      "cand_fresher_315",
      "cand_fresher_179",
      "cand_fresher_296"
    ],
    "ground_truth_count": 12,
    "sample_shortlisted": [
      {
        "candidate_id": "cand_fresher_097",
        "name": "Ananya Patel",
        "college": "Rajiv Gandhi Technical University Affiliate",
        "college_tier": "Tier-3",
        "authenticity_score": 96,
        "viva_score": 10,
        "composite_score": 91,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for SOC2 Compliance & Zero-Trust Cloud Auditor, 96% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_043",
        "name": "Kavya Gupta",
        "college": "Chhatrapati Shahu Ji Maharaj University",
        "college_tier": "Tier-3",
        "authenticity_score": 92,
        "viva_score": 10,
        "composite_score": 89,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for SOC2 Compliance & Zero-Trust Cloud Auditor, 92% Git-DNA originality, 10/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_379",
        "name": "Arjun Reddy",
        "college": "IIT Kanpur",
        "college_tier": "Tier-1",
        "authenticity_score": 96,
        "viva_score": 9,
        "composite_score": 88,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for SOC2 Compliance & Zero-Trust Cloud Auditor, 96% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_039",
        "name": "Arjun Pandey",
        "college": "SRM Institute",
        "college_tier": "Tier-2",
        "authenticity_score": 93,
        "viva_score": 9,
        "composite_score": 87,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for SOC2 Compliance & Zero-Trust Cloud Auditor, 93% Git-DNA originality, 9/10 viva defense."
      },
      {
        "candidate_id": "cand_fresher_239",
        "name": "Ritika Tripathi",
        "college": "Regional Engineering College Warangal",
        "college_tier": "Tier-3",
        "authenticity_score": 87,
        "viva_score": 10,
        "composite_score": 87,
        "human_readable_reason": "Recruiter Shortlisted: Matched 80% skills for SOC2 Compliance & Zero-Trust Cloud Auditor, 87% Git-DNA originality, 10/10 viva defense."
      }
    ]
  }
];
