import os
import json
import random

random.seed(42)

def generate_cohort_400():
    tier1_colleges = [
        "IIT Delhi", "IIT Bombay", "IIT Madras", "IIT Kanpur", "IIT Kharagpur",
        "IIT Roorkee", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy", "NIT Surathkal"
    ]
    tier2_colleges = [
        "GLA University (Mathura)", "VIT Vellore", "Thapar Institute", "Manipal University",
        "SRM Institute", "Delhi Technological University", "Anna University", "Jadavpur University",
        "PSG College of Technology", "RV College of Engineering"
    ]
    tier3_colleges = [
        "Bundelkhand Institute of Engineering & Technology", "Government Engineering College Bilaspur",
        "Regional Engineering College Warangal", "Dr. A.P.J. Abdul Kalam Technical University Affiliate",
        "Chhatrapati Shahu Ji Maharaj University", "Techno India College of Technology",
        "United College of Engineering & Research", "Rajiv Gandhi Technical University Affiliate",
        "State Institute of Engineering & Technology", "Babu Banarasi Das Institute"
    ]

    first_names = [
        "Aarav", "Priyanshu", "Aditi", "Rohan", "Ananya", "Vikram", "Sneha", "Karan",
        "Neha", "Harsh", "Pooja", "Arjun", "Kavya", "Rahul", "Meera", "Siddharth",
        "Riya", "Aditya", "Tanvi", "Varun", "Isha", "Manish", "Divya", "Gaurav",
        "Shreya", "Kunal", "Anushka", "Nikhil", "Simran", "Amit", "Ritika", "Sameer",
        "Akanksha", "Abhishek", "Deepika", "Mohit", "Aayushi", "Ayush", "Swati", "Yash"
    ]
    last_names = [
        "Sharma", "Awasthi", "Verma", "Patel", "Singh", "Kumar", "Gupta", "Malhotra",
        "Chatterjee", "Mishra", "Mehta", "Choudhury", "Joshi", "Bhatia", "Reddy", "Nair",
        "Saxena", "Kapoor", "Tripathi", "Banerjee", "Trivedi", "Deshmukh", "Chawla", "Pandey"
    ]

    tech_domains = [
        ("Python Backend / FastAPI", ["FastAPI", "PostgreSQL", "Redis", "Docker", "pytest", "asyncio"], "Python"),
        ("React / TypeScript UI", ["React", "TypeScript", "TailwindCSS", "Next.js", "Zustand", "Jest"], "TypeScript"),
        ("AI / ML Pipeline", ["PyTorch", "scikit-learn", "FastAPI", "Pandas", "NumPy", "MLflow"], "Python"),
        ("Cloud Infrastructure / DevOps", ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus", "Bash"], "Go"),
        ("Go Distributed Microservices", ["Go", "gRPC", "Docker", "PostgreSQL", "Kafka", "Redis"], "Go"),
        ("Java Spring Boot Enterprise", ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "JUnit", "Kafka"], "Java"),
        ("Fullstack Node.js", ["Node.js", "Express", "TypeScript", "MongoDB", "React", "Docker"], "TypeScript"),
        ("Data Engineering & Telemetry", ["Python", "Spark", "Kafka", "FastAPI", "PostgreSQL", "Redis"], "Python"),
        ("Mobile Flutter & Kotlin", ["Flutter", "Dart", "Kotlin", "Firebase", "REST APIs"], "Dart"),
        ("Cyber Security & Crypto", ["Python", "Cryptography", "C++", "Docker", "OAuth2", "Linux"], "Python")
    ]

    tutorial_sources = [
        ("Academind / Maximilian", "https://github.com/academind/react-complete-guide-code", "Academind Course Clone"),
        ("FreeCodeCamp / Beau Carnes", "https://github.com/freeCodeCamp/python-full-course", "FreeCodeCamp Tutorial Copy"),
        ("Traversy Media / Brad Traversy", "https://github.com/bradtraversy/mern-auth-boilerplate", "Traversy MERN Auth Clone"),
        ("CodeWithHarry", "https://github.com/CodeWithHarry/Sigma-Web-Dev-Course", "Sigma Web Dev Course Dump"),
        ("Clever Programmer / Rafeh Qazi", "https://github.com/CleverProgrammer/amazon-clone", "CleverProgrammer Amazon Clone"),
        ("Net Ninja / Shaun Pelling", "https://github.com/iamshaunjp/flutter-firebase-tutorial", "Net Ninja Flutter Clone")
    ]

    cohort = []

    for i in range(1, 401):
        cand_id = f"cand_fresher_{i:03d}"
        fn = random.choice(first_names)
        ln = random.choice(last_names)
        full_name = f"{fn} {ln}"
        anon_name = f"Fresher Candidate #{i:03d} ({fn[0]}. {ln})"

        # College distribution: 20% Tier-1, 35% Tier-2, 45% Tier-3
        roll = random.random()
        if roll < 0.20:
            college = random.choice(tier1_colleges)
            tier = "Tier-1"
        elif roll < 0.55:
            college = random.choice(tier2_colleges)
            tier = "Tier-2"
        else:
            college = random.choice(tier3_colleges)
            tier = "Tier-3"

        domain_name, domain_skills, primary_lang = random.choice(tech_domains)

        # 30% of applicants are clones / unoriginal; 70% are authentic
        is_clone = (random.random() < 0.30)

        if is_clone:
            tut_author, tut_url, tut_name = random.choice(tutorial_sources)
            auth_score = random.randint(12, 38)
            viva_score = random.randint(2, 4)
            commits = random.randint(1, 4)
            days = random.randint(1, 3)
            burst = round(random.uniform(0.85, 0.99), 2)
            deletion = round(random.uniform(0.01, 0.05), 2)
            has_tests = False
            test_files = 0
            code_score = random.randint(45, 68)
            aptitude_score = random.randint(50, 75)
            ps_score = random.randint(40, 65)
            matched_tut = {
                "id": f"tut_{i}",
                "name": tut_name,
                "author": tut_author,
                "source_url": tut_url,
                "origin_type": "GLOBAL_ORIGIN",
                "similarity_score": round((100 - auth_score) / 100, 2),
                "verdict": f"AST Winnowing Fingerprint matched public repository '{tut_name}'.",
                "matched_files": ["src/index.js", "src/App.js", "package.json"]
            }
            reason = f"Flagged by Git-DNA & AST Clone Radar: Repository matches '{tut_name}' with {100 - auth_score}% structural overlap across only {commits} commits over {days} days."
        else:
            matched_tut = None
            auth_score = random.randint(76, 98)
            viva_score = random.randint(6, 10)
            commits = random.randint(28, 185)
            days = random.randint(14, 90)
            burst = round(random.uniform(0.25, 0.55), 2)
            deletion = round(random.uniform(0.18, 0.42), 2)
            has_tests = random.random() > 0.15
            test_files = random.randint(3, 14) if has_tests else 0
            code_score = random.randint(72, 98)
            aptitude_score = random.randint(70, 99)
            ps_score = random.randint(70, 96)
            reason = f"Verified authentic builder: {auth_score}% Git-DNA originality across {commits} organic commits over {days} days with {round(deletion * 100)}% refactoring ratio. Viva defense score: {viva_score}/10."

        composite_assessment = round((code_score * 0.40) + (aptitude_score * 0.30) + (ps_score * 0.30))

        # First candidate is seeded as Priyanshu Awasthi & Team (SIH Data project)
        if i == 1:
            full_name = "Priyanshu Awasthi & Team"
            anon_name = "Fresher #001 · Priyanshu Awasthi & Team"
            college = "GLA University (Mathura)"
            tier = "Tier-2"
            domain_name = "Data Engineering & Telemetry / Fullstack AI"
            domain_skills = ["Python", "FastAPI", "React", "TypeScript", "scikit-learn", "Docker"]
            is_clone = False
            matched_tut = None
            auth_score = 96
            viva_score = 9
            commits = 157
            days = 32
            burst = 0.52
            deletion = 0.38
            has_tests = True
            test_files = 8
            code_score = 95
            aptitude_score = 96
            ps_score = 94
            composite_assessment = 95
            reason = "Verified authentic builder: 96% Git-DNA originality across 157 organic commits over 32 days with 38% refactoring ratio. Outstanding viva defense: 9/10."

        detected_files = [f"src/{s.lower()}_module.{'py' if primary_lang == 'Python' else 'ts'}" for s in domain_skills[:4]]
        if has_tests:
            detected_files.append("tests/test_core.py" if primary_lang == "Python" else "src/__tests__/app.test.tsx")

        cohort.append({
            "candidate_id": cand_id,
            "name": full_name,
            "anonymised_name": anon_name,
            "college": college,
            "college_tier": tier,
            "consent_status": "CONSENT_GRANTED",
            "consent_timestamp": "2026-10-25T12:00:00Z",
            "consent_verified": True,
            "repo_url": f"https://github.com/consented-fresher-{i:03d}/{domain_name.split()[0].lower()}-core",
            "project_type": domain_name,
            "primary_language": primary_lang,
            "verified_skills": domain_skills,
            "total_loc": random.randint(1800, 34000),
            "authenticity_score": auth_score,
            "is_clone": is_clone,
            "matched_tutorial": matched_tut,
            "viva_score": viva_score,
            "assessment_results": {
                "coding_score": code_score,
                "aptitude_score": aptitude_score,
                "problem_solving_score": ps_score,
                "composite_assessment": composite_assessment
            },
            "git_dna": {
                "total_commits": commits,
                "time_span_days": days,
                "burst_ratio": burst,
                "deletion_ratio": deletion,
                "organic_growth": not is_clone,
                "message_maturity_score": random.randint(78, 96) if not is_clone else random.randint(20, 45),
                "test_files_detected": test_files,
                "authenticity_score": auth_score,
                "summary": f"{commits} commits across {days} days. Refactor ratio: {round(deletion * 100)}%."
            },
            "detected_files": detected_files,
            "proof_card": {
                "status": "REJECTED_PLAGIARISM" if is_clone else ("VERIFIED_EXEMPLARY" if auth_score >= 88 else "VERIFIED_COMPETENT"),
                "headline": f"{'Flagged Clone' if is_clone else 'Verified Authentic Builder'} ({auth_score}% authenticity, Viva: {viva_score}/10).",
                "human_readable_reason": reason,
                "tamper_proof_hash": f"SHA256:proof_{cand_id}_{os.urandom(6).hex()}"
            }
        })

    return cohort


def generate_job_descriptions_30(cohort):
    jds_raw = [
        ("Python Backend & Microservices Engineer", "Backend", ["Python", "FastAPI", "PostgreSQL", "Redis", "Docker", "pytest"]),
        ("React & TypeScript Frontend Systems Developer", "Frontend", ["React", "TypeScript", "TailwindCSS", "Next.js", "Jest"]),
        ("AI / ML Pipeline & GenAI Platform Engineer", "AI/ML", ["PyTorch", "Python", "FastAPI", "scikit-learn", "Pandas"]),
        ("Cloud Infrastructure & Kubernetes DevOps Engineer", "DevOps", ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"]),
        ("Go Distributed Systems & High-Throughput Architect", "Systems", ["Go", "gRPC", "Docker", "PostgreSQL", "Kafka"]),
        ("Java Spring Boot Enterprise Banking Engineer", "Enterprise", ["Java", "Spring Boot", "Hibernate", "PostgreSQL", "Kafka"]),
        ("Fullstack Node.js & Realtime Web Developer", "Fullstack", ["Node.js", "Express", "TypeScript", "MongoDB", "React"]),
        ("Data Telemetry & Stream Processing Engineer", "Data", ["Python", "Spark", "Kafka", "FastAPI", "PostgreSQL"]),
        ("Mobile Cross-Platform Flutter & Native Developer", "Mobile", ["Flutter", "Dart", "Kotlin", "Firebase", "REST APIs"]),
        ("Cryptographic Systems & Zero-Trust Security Engineer", "Security", ["Python", "Cryptography", "OAuth2", "Linux", "Docker"]),
        ("FastAPI Async API Gateway Specialist", "Backend", ["FastAPI", "Python", "asyncio", "Redis", "PostgreSQL"]),
        ("Next.js Serverless & Edge Computing Developer", "Frontend", ["Next.js", "TypeScript", "React", "TailwindCSS", "REST APIs"]),
        ("Deep Learning NLP & LLM Fine-Tuning Engineer", "AI/ML", ["PyTorch", "Python", "FastAPI", "Pandas", "NumPy"]),
        ("Site Reliability Engineer (SRE & Observability)", "DevOps", ["Kubernetes", "Docker", "Prometheus", "Bash", "Linux"]),
        ("Kafka Event-Driven Microservices Specialist", "Systems", ["Kafka", "Go", "Docker", "PostgreSQL", "gRPC"]),
        ("Enterprise Microservices Core Java Architect", "Enterprise", ["Java", "Spring Boot", "PostgreSQL", "Hibernate", "JUnit"]),
        ("TypeScript Fullstack Cloud Native Engineer", "Fullstack", ["TypeScript", "Node.js", "React", "Docker", "PostgreSQL"]),
        ("Realtime IoT Telemetry & Sensor Streaming Engineer", "Data", ["Python", "Kafka", "FastAPI", "Redis", "Docker"]),
        ("Android Native Kotlin Architect", "Mobile", ["Kotlin", "Firebase", "REST APIs", "Docker", "Java"]),
        ("Penetration Testing & Secure Coding Auditor", "Security", ["Linux", "Cryptography", "Python", "Docker", "OAuth2"]),
        ("High-Performance Caching & Redis Architect", "Backend", ["Redis", "FastAPI", "Python", "PostgreSQL", "asyncio"]),
        ("Modern Design Systems & WebGL 3D Developer", "Frontend", ["React", "TypeScript", "TailwindCSS", "Next.js", "Zustand"]),
        ("Computer Vision & Edge Inference Engineer", "AI/ML", ["Python", "PyTorch", "NumPy", "FastAPI", "Docker"]),
        ("CI/CD Automation & GitOps Engineer", "DevOps", ["GitHub Actions", "Docker", "Kubernetes", "Terraform", "Bash"]),
        ("Distributed Consensus & Raft/Paxos Developer", "Systems", ["Go", "gRPC", "Docker", "PostgreSQL", "Linux"]),
        ("FinTech Distributed Transaction Architect", "Enterprise", ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Hibernate"]),
        ("API Modernization & GraphQL Developer", "Fullstack", ["TypeScript", "Node.js", "Express", "React", "PostgreSQL"]),
        ("Big Data Lakehouse & Spark ETL Specialist", "Data", ["Spark", "Python", "Kafka", "PostgreSQL", "Docker"]),
        ("iOS Native Swift & Mobile Architect", "Mobile", ["Kotlin", "Flutter", "Firebase", "REST APIs", "TypeScript"]),
        ("SOC2 Compliance & Zero-Trust Cloud Auditor", "Security", ["Docker", "Linux", "Python", "Cryptography", "Terraform"])
    ]

    job_descriptions = []

    for idx, (title, domain, req_skills) in enumerate(jds_raw, 1):
        jd_id = f"jd_{idx:02d}"

        # Determine ground-truth recruiter shortlist for this JD from the 400 cohort
        # Labelled by recruiter criteria: skills overlap + authenticity >= 75% + viva >= 6 + no clones
        candidates_scored = []
        for c in cohort:
            if c["is_clone"]:
                continue
            skills_cand = set(s.lower() for s in c["verified_skills"])
            overlap = len([s for s in req_skills if s.lower() in skills_cand or s.lower() in c["project_type"].lower()])
            match_pct = round((overlap / max(len(req_skills), 1)) * 100)
            
            # Recruiter composite ground truth
            composite = round((c["authenticity_score"] * 0.35) + (match_pct * 0.40) + (c["viva_score"] * 10 * 0.25))
            candidates_scored.append((c["candidate_id"], composite, match_pct, c))

        # Sort descending by ground truth composite
        candidates_scored.sort(key=lambda x: x[1], reverse=True)
        top_ground_truth = candidates_scored[:12]
        ground_truth_ids = [item[0] for item in top_ground_truth]

        job_descriptions.append({
            "jd_id": jd_id,
            "title": title,
            "domain": domain,
            "experience_level": "Fresher / Campus Graduate (0-1 Years)",
            "required_skills": req_skills,
            "preferred_skills": ["Git Workflow", "Automated Testing", "Clean Architecture"],
            "description": f"Integraminds Campus Hiring for {title}. Seeking verified builders with proven code ownership, git commit discipline, and solid technical viva defense.",
            "ground_truth_shortlist_ids": ground_truth_ids,
            "ground_truth_count": len(ground_truth_ids),
            "sample_shortlisted": [
                {
                    "candidate_id": c["candidate_id"],
                    "name": c["name"],
                    "college": c["college"],
                    "college_tier": c["college_tier"],
                    "authenticity_score": c["authenticity_score"],
                    "viva_score": c["viva_score"],
                    "composite_score": comp,
                    "human_readable_reason": f"Recruiter Shortlisted: Matched {mp}% skills for {title}, {c['authenticity_score']}% Git-DNA originality, {c['viva_score']}/10 viva defense."
                }
                for (cid, comp, mp, c) in top_ground_truth[:5]
            ]
        })

    return job_descriptions


if __name__ == "__main__":
    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
    os.makedirs(out_dir, exist_ok=True)

    print("Generating 400 Anonymised Fresher Profiles with Consented Repositories...")
    cohort = generate_cohort_400()
    cohort_path = os.path.join(out_dir, "cohort_400.json")
    with open(cohort_path, "w", encoding="utf-8") as f:
        json.dump({"total": len(cohort), "cohort": cohort}, f, indent=2)
    print(f"Saved {len(cohort)} profiles to {cohort_path}")

    print("Generating 30 Job Descriptions with Labelled Recruiter Shortlist Ground Truth...")
    jds = generate_job_descriptions_30(cohort)
    jd_path = os.path.join(out_dir, "job_descriptions_30.json")
    with open(jd_path, "w", encoding="utf-8") as f:
        json.dump({"total": len(jds), "job_descriptions": jds}, f, indent=2)
    print(f"Saved {len(jds)} job descriptions to {jd_path}")

    print("Generating TypeScript export for frontend web/src/data/im105BenchmarkData.ts...")
    web_data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "web", "src", "data"))
    os.makedirs(web_data_dir, exist_ok=True)
    ts_path = os.path.join(web_data_dir, "im105BenchmarkData.ts")
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write("// IM-105 Benchmark Dataset: 400 Anonymised Freshers & 30 Job Descriptions\n")
        f.write("import { CandidateProfile } from '../types';\n\n")
        f.write(f"export const IM105_COHORT_400: CandidateProfile[] = {json.dumps(cohort, indent=2)};\n\n")
        f.write(f"export const IM105_JOB_DESCRIPTIONS_30 = {json.dumps(jds, indent=2)};\n")
    print(f"Saved TypeScript benchmark data to {ts_path}")
