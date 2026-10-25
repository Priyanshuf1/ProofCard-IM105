import json
import random
from pathlib import Path

first_names = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
    'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Advaith', 'Kabir', 'Ananya', 'Diya', 'Saanvi', 'Aadhya',
    'Pari', 'Sneha', 'Isha', 'Riya', 'Aarohi', 'Pooja', 'Tanvi', 'Kavya', 'Meera', 'Rohan',
    'Vikram', 'Priyanshu', 'Shivendra', 'Manas', 'Ankita', 'Nikhil', 'Dev', 'Siddharth', 'Varun', 'Rishi',
    'Harsh', 'Karan', 'Kunal', 'Ayush', 'Abhishek', 'Rahul', 'Gaurav', 'Deepak', 'Amit', 'Neha'
]
last_names = [
    'Sharma', 'Verma', 'Patel', 'Gupta', 'Singh', 'Kumar', 'Awasthi', 'Mishra', 'Jain', 'Reddy',
    'Nair', 'Iyer', 'Choudhury', 'Banerjee', 'Chatterjee', 'Das', 'Bose', 'Mukherjee', 'Mehta', 'Shah',
    'Agarwal', 'Bansal', 'Saxena', 'Kapoor', 'Malhotra', 'Bhatia', 'Kohli', 'Sethi', 'Trivedi', 'Pandey'
]

colleges_t1 = ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Roorkee', 'BITS Pilani', 'IIT Kanpur']
colleges_t2 = ['GLA University (Mathura)', 'VIT Vellore', 'Manipal Institute of Tech', 'Thapar University', 'SRM University']
colleges_t3 = ['GEC Bilaspur', 'BIET Jhansi', 'REC Warangal', 'Government College of Engg Amravati', 'State Tech University Bhopal', 'Bundelkhand Institute of Tech']

# Diverse global tutorial, template, and open-source origins from around the world
global_sources = [
    {
        'id': 'traversy_mern_2023',
        'name': 'Traversy Media MERN Stack Tutorial',
        'url': 'https://github.com/bradtraversy/mern-tutorial',
        'author': 'Brad Traversy',
        'origin_type': 'YOUTUBE_TUTORIAL_CLONE',
        'type': 'MERN Stack'
    },
    {
        'id': 'clever_programmer_netflix',
        'name': 'Clever Programmer Netflix Clone',
        'url': 'https://github.com/CleverProgrammer/netflix-clone',
        'author': 'Clever Programmer (Rafeh Qazi)',
        'origin_type': 'YOUTUBE_TUTORIAL_CLONE',
        'type': 'React / Firebase'
    },
    {
        'id': 'codewithharry_django_blog',
        'name': 'CodeWithHarry Django Full Blog',
        'url': 'https://github.com/CodeWithHarry/Django-Blog',
        'author': 'CodeWithHarry (Haris Khan)',
        'origin_type': 'YOUTUBE_TUTORIAL_CLONE',
        'type': 'Python / Django'
    },
    {
        'id': 'freecodecamp_ecommerce',
        'name': 'freeCodeCamp Fullstack eCommerce Boilerplate',
        'url': 'https://github.com/freeCodeCamp/ecommerce-boilerplate',
        'author': 'freeCodeCamp Open Source',
        'origin_type': 'OPEN_SOURCE_SCAFFOLD',
        'type': 'Next.js / Stripe'
    },
    {
        'id': 'shadcn_ui_dashboard',
        'name': 'shadcn/ui Taxonomy & Next.js Dashboard Template',
        'url': 'https://github.com/shadcn-ui/taxonomy',
        'author': 'shadcn Open Source',
        'origin_type': 'OPEN_SOURCE_TEMPLATE',
        'type': 'Next.js 14 / Tailwind'
    },
    {
        'id': 'angela_yu_keeper_app',
        'name': 'Angela Yu 100 Days of Code React Keeper App',
        'url': 'https://github.com/appbrewery/keeper-app',
        'author': 'Angela Yu (The App Brewery)',
        'origin_type': 'UDEMY_BOOTCAMP_ASSIGNMENT',
        'type': 'React / Material-UI'
    },
    {
        'id': 'krish_naik_mlops_pipeline',
        'name': 'Krish Naik End-to-End MLOps Pipeline Template',
        'url': 'https://github.com/krishnaik06/End-to-End-Machine-Learning-Project',
        'author': 'Krish Naik',
        'origin_type': 'YOUTUBE_TUTORIAL_CLONE',
        'type': 'Python / Scikit-Learn MLOps'
    },
    {
        'id': 'fastapi_realworld',
        'name': 'FastAPI RealWorld Conduit Backend Template',
        'url': 'https://github.com/nsidnev/fastapi-realworld-example-app',
        'author': 'Nikita Sidnev',
        'origin_type': 'OPEN_SOURCE_SCAFFOLD',
        'type': 'FastAPI / PostgreSQL'
    },
    {
        'id': 'colt_steele_yelpcamp',
        'name': 'Colt Steele YelpCamp Fullstack Project',
        'url': 'https://github.com/Colt/YelpCamp',
        'author': 'Colt Steele (Web Dev Bootcamp)',
        'origin_type': 'UDEMY_BOOTCAMP_ASSIGNMENT',
        'type': 'Node.js / Express / Mongo'
    },
    {
        'id': 'peer_collusion_cluster_a',
        'name': 'Cross-Candidate Peer Collusion Cluster: Group A',
        'url': 'https://github.com/campus-peer-group/assignment2-sync',
        'author': 'Peer-to-Peer Student Collusion',
        'origin_type': 'PEER_TO_PEER_COLLUSION',
        'type': 'Copied Assignment Code'
    }
]

candidates = []

# Candidate 0 is Priyanshu Awasthi & Team (Real Exemplary Builder)
candidates.append({
    'candidate_id': 'cand_priyanshu_sih',
    'name': 'Priyanshu Awasthi & Team',
    'college': 'GLA University (Mathura)',
    'college_tier': 'Tier-2',
    'repo_url': 'https://github.com/shivendra1911/Data_SIH',
    'project_type': 'Fullstack AI / Water Quality Telemetry & ML Pipeline',
    'total_loc': 214440,
    'authenticity_score': 95,
    'is_clone': False,
    'matched_tutorial': None,
    'viva_score': 9,
    'git_dna': {
        'total_commits': 157,
        'time_span_days': 32,
        'burst_ratio': 0.52,
        'deletion_ratio': 0.38,
        'organic_growth': True,
        'message_maturity_score': 94,
        'test_files_detected': 8,
        'authenticity_score': 95,
        'summary': '157 organic commits across 32.36 days with 38% refactoring deletion ratio. Priyanshu authored 80 commits (51%).'
    },
    'detected_files': [
        'src/components/WaterMonitoringDashboard.tsx',
        'src/ml/water_quality_predictor.py',
        'src/services/telemetryStream.ts',
        'backend/api/sensors.py',
        'backend/models/neural_net.py',
        'datasets/neernetra_hybrid_dataset.csv',
        'tests/test_ml_pipeline.py',
        'Dockerfile'
    ],
    'proof_card': {
        'status': 'VERIFIED_EXEMPLARY',
        'headline': 'Exemplary fullstack and ML telemetry builder with 157 authentic git commits, 38% refactoring ratio, and verified sensor architecture.',
        'strengths': [
            '157 organic commits across 32.36 days with 38% refactoring deletion ratio (80,977 lines deleted)',
            'Priyanshu authored 80 commits (51%) and established the core application architecture',
            'Robust ensemble ML pipeline with soft voting and Redis sorted set temporal sliding window'
        ],
        'growth_area': 'Incorporate Kafka or RabbitMQ distributed message brokers for scale beyond 10,000 concurrent IoT probes.',
        'specific_action': 'Add integration tests simulating intermittent sensor connectivity and payload corruption.',
        'tamper_proof_hash': 'SHA256:d8a9b2c3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1'
    }
})

random.seed(42)

for i in range(1, 100):
    cid = f'cand_batch_{i:03d}'
    first = random.choice(first_names)
    last = random.choice(last_names)
    name = f"{first} {last}"
    handle = f"{first.lower()}{last.lower()}"
    
    # Realistic 5-Tier Campus Cohort Distribution:
    # 25% Exemplary Builders (84-98% Auth, 8-10 Viva)
    # 25% Competent Builders (66-83% Auth, 6-8 Viva)
    # 20% Borderline/Junior Builders (44-65% Auth, 4-6 Viva)
    # 18% Clones/Tutorial Copies (20-39% Auth, 2-4 Viva)
    # 11% Single-Commit Dead Dumps (9-19% Auth, 1-2 Viva)
    if i < 26:
        # Tier A: Top Exemplary Authentic Builders
        tier = random.choice(['Tier-1', 'Tier-2', 'Tier-3', 'Tier-3'])
        col = random.choice(colleges_t1 if tier == 'Tier-1' else (colleges_t2 if tier == 'Tier-2' else colleges_t3))
        commits = random.randint(40, 150)
        days = random.randint(21, 65)
        burst = round(random.uniform(0.15, 0.40), 2)
        deletion = round(random.uniform(0.22, 0.45), 2)
        score = random.randint(84, 98)
        viva = random.randint(8, 10)
        tests_count = random.randint(3, 7)
        stack = random.choice([
            'FastAPI / Redis Microservices',
            'Distributed Kafka Pipeline',
            'React / WebGL 3D Visualization',
            'Go / High Concurrency Engine',
            'PyTorch Neural Signal Processor'
        ])
        slug = stack.lower().split()[0]
        c = {
            'candidate_id': cid,
            'name': name,
            'college': col,
            'college_tier': tier,
            'repo_url': f'https://github.com/{handle}/{slug}-engine',
            'project_type': stack,
            'total_loc': random.randint(12000, 52000),
            'authenticity_score': score,
            'is_clone': False,
            'matched_tutorial': None,
            'viva_score': viva,
            'git_dna': {
                'total_commits': commits,
                'time_span_days': days,
                'burst_ratio': burst,
                'deletion_ratio': deletion,
                'organic_growth': True,
                'message_maturity_score': random.randint(80, 95),
                'test_files_detected': tests_count,
                'authenticity_score': score,
                'summary': f'{commits} commits over {days} days with {int(deletion*100)}% refactoring ratio. Verified automated test suite.'
            },
            'detected_files': ['core/engine.py', 'api/routes.py', 'services/broker.py', 'tests/test_core.py', 'Dockerfile', 'docker-compose.yml'],
            'proof_card': {
                'status': 'VERIFIED_EXEMPLARY',
                'headline': f'Exemplary architectural ownership in {stack}. Proven multi-week iteration.',
                'strengths': [
                    f'{commits} commits across {days} days with {int(deletion*100)}% refactoring ratio',
                    'Automated unit test coverage in GitHub Actions',
                    f'Demonstrated mastery in {stack}'
                ],
                'growth_area': 'Explore edge caching and memory profiling under concurrency spikes.',
                'specific_action': 'Implement Locust load tests simulating 2,000 requests/sec.',
                'tamper_proof_hash': f'SHA256:{hex(random.getrandbits(128))[2:]}'
            }
        }
    elif i < 51:
        # Tier B: Competent Authentic Builders
        tier = random.choice(['Tier-1', 'Tier-2', 'Tier-2', 'Tier-3'])
        col = random.choice(colleges_t1 if tier == 'Tier-1' else (colleges_t2 if tier == 'Tier-2' else colleges_t3))
        commits = random.randint(20, 55)
        days = random.randint(14, 38)
        burst = round(random.uniform(0.30, 0.55), 2)
        deletion = round(random.uniform(0.14, 0.32), 2)
        score = random.randint(66, 83)
        viva = random.randint(6, 8)
        tests_count = random.randint(1, 4)
        stack = random.choice([
            'FastAPI / PostgreSQL API',
            'React / TypeScript Dashboard',
            'Node.js Event Service',
            'Python Data Pipeline'
        ])
        slug = stack.lower().split()[0]
        c = {
            'candidate_id': cid,
            'name': name,
            'college': col,
            'college_tier': tier,
            'repo_url': f'https://github.com/{handle}/{slug}-service',
            'project_type': stack,
            'total_loc': random.randint(5000, 24000),
            'authenticity_score': score,
            'is_clone': False,
            'matched_tutorial': None,
            'viva_score': viva,
            'git_dna': {
                'total_commits': commits,
                'time_span_days': days,
                'burst_ratio': burst,
                'deletion_ratio': deletion,
                'organic_growth': True,
                'message_maturity_score': random.randint(65, 82),
                'test_files_detected': tests_count,
                'authenticity_score': score,
                'summary': f'{commits} organic commits over {days} days with {int(deletion*100)}% refactoring ratio.'
            },
            'detected_files': ['core/service.py', 'api/endpoints.py', 'tests/test_api.py', 'Dockerfile'],
            'proof_card': {
                'status': 'VERIFIED_COMPETENT',
                'headline': f'Solid baseline systems builder in {stack}.',
                'strengths': [
                    f'{commits} commits over {days} days',
                    f'Working test fixtures in {stack}',
                    'Clear modular code organization'
                ],
                'growth_area': 'Broaden error boundary handling and asynchronous backpressure.',
                'specific_action': 'Add stress tests for network disconnects and pool exhaustion.',
                'tamper_proof_hash': f'SHA256:{hex(random.getrandbits(128))[2:]}'
            }
        }
    elif i < 71:
        # Tier C: Borderline / Junior Builders (partial scaffolding or smaller projects)
        tier = random.choice(['Tier-1', 'Tier-2', 'Tier-3', 'Tier-3'])
        col = random.choice(colleges_t1 if tier == 'Tier-1' else (colleges_t2 if tier == 'Tier-2' else colleges_t3))
        commits = random.randint(8, 22)
        days = random.randint(7, 20)
        burst = round(random.uniform(0.48, 0.72), 2)
        deletion = round(random.uniform(0.06, 0.18), 2)
        score = random.randint(44, 65)
        viva = random.randint(4, 6)
        tests_count = random.randint(0, 2)
        stack = random.choice([
            'React / Express Fullstack App',
            'Django Basic Portal',
            'Flask Microservice',
            'Vanilla JS WebApp'
        ])
        slug = stack.lower().split()[0]
        c = {
            'candidate_id': cid,
            'name': name,
            'college': col,
            'college_tier': tier,
            'repo_url': f'https://github.com/{handle}/{slug}-starter',
            'project_type': stack,
            'total_loc': random.randint(2500, 11000),
            'authenticity_score': score,
            'is_clone': False,
            'matched_tutorial': None,
            'viva_score': viva,
            'git_dna': {
                'total_commits': commits,
                'time_span_days': days,
                'burst_ratio': burst,
                'deletion_ratio': deletion,
                'organic_growth': True,
                'message_maturity_score': random.randint(45, 65),
                'test_files_detected': tests_count,
                'authenticity_score': score,
                'summary': f'{commits} commits across {days} days. Some boilerplate scaffolding detected.'
            },
            'detected_files': ['src/app.py', 'src/routes.py', 'README.md'],
            'proof_card': {
                'status': 'VERIFIED_BORDERLINE',
                'headline': f'Developing engineer with emerging code ownership in {stack}.',
                'strengths': [
                    'Built functional fullstack workflow',
                    'Demonstrates basic git commit workflow'
                ],
                'growth_area': 'Refactor boilerplate into custom architecture and write automated unit tests.',
                'specific_action': 'Implement 5 integration tests and profile database queries.',
                'tamper_proof_hash': f'SHA256:{hex(random.getrandbits(128))[2:]}'
            }
        }
    elif i < 89:
        # Tier D: Clone / Plagiarized candidate from one of the global sources
        tut = random.choice(global_sources)
        tier = random.choice(['Tier-1', 'Tier-1', 'Tier-2', 'Tier-3'])
        col = random.choice(colleges_t1 if tier == 'Tier-1' else (colleges_t2 if tier == 'Tier-2' else colleges_t3))
        commits = random.randint(1, 4)
        days = random.randint(1, 3)
        burst = round(random.uniform(0.85, 0.98), 2)
        deletion = round(random.uniform(0.0, 0.03), 2)
        score = random.randint(20, 39)
        viva = random.randint(2, 4)
        tut_slug = tut['id']
        sim_score = round(random.uniform(0.84, 0.96), 2)
        sim_pct = int(sim_score * 100)

        c = {
            'candidate_id': cid,
            'name': name,
            'college': col,
            'college_tier': tier,
            'repo_url': f'https://github.com/{handle}/{tut_slug}',
            'project_type': tut['type'],
            'total_loc': random.randint(1200, 3200),
            'authenticity_score': score,
            'is_clone': True,
            'matched_tutorial': {
                'id': tut['id'],
                'name': tut['name'],
                'source_url': tut['url'],
                'youtube_url': tut['url'],
                'author': tut['author'],
                'origin_type': tut['origin_type'],
                'similarity_score': sim_score,
                'matched_files': ['server.js', 'routes/api.js', 'models/schema.js', 'package.json'],
                'verdict': f'PLAGIARISM DETECTED ({sim_pct}% copied): Exact forensic match with {tut["name"]} by {tut["author"]} ({tut["url"]}). 0 tests, {int(burst*100)}% burst dump.'
            },
            'viva_score': viva,
            'git_dna': {
                'total_commits': commits,
                'time_span_days': days,
                'burst_ratio': burst,
                'deletion_ratio': deletion,
                'organic_growth': False,
                'message_maturity_score': random.randint(15, 30),
                'test_files_detected': 0,
                'authenticity_score': score,
                'summary': f'Tutorial clone pattern: {commits} commits over {days} day(s). {int(burst*100)}% code dumped in single hour.'
            },
            'detected_files': ['server.js', 'routes/api.js', 'package.json'],
            'proof_card': {
                'status': 'REJECTED_PLAGIARISM',
                'headline': f'Flagged as clone of {tut["name"]}. Superficial viva responses.',
                'strengths': ['Familiar with basic file structure and dependencies'],
                'growth_area': 'Build authentic project from scratch; do not copy online tutorials or templates.',
                'specific_action': 'Implement custom business logic and error boundaries.',
                'tamper_proof_hash': f'SHA256:{hex(random.getrandbits(128))[2:]}'
            }
        }
    else:
        # Tier E: Dead dump / unmaintained single-commit repo
        tier = random.choice(['Tier-1', 'Tier-2', 'Tier-3'])
        col = random.choice(colleges_t1 if tier == 'Tier-1' else (colleges_t2 if tier == 'Tier-2' else colleges_t3))
        commits = 1
        days = 0
        burst = 1.00
        deletion = 0.00
        score = random.randint(9, 19)
        viva = random.randint(1, 2)
        c = {
            'candidate_id': cid,
            'name': name,
            'college': col,
            'college_tier': tier,
            'repo_url': f'https://github.com/{handle}/project_dump',
            'project_type': 'Unmaintained Repository Dump',
            'total_loc': random.randint(500, 1800),
            'authenticity_score': score,
            'is_clone': False,
            'matched_tutorial': None,
            'viva_score': viva,
            'git_dna': {
                'total_commits': 1,
                'time_span_days': 0,
                'burst_ratio': 1.00,
                'deletion_ratio': 0.00,
                'organic_growth': False,
                'message_maturity_score': 10,
                'test_files_detected': 0,
                'authenticity_score': score,
                'summary': 'Single initial commit dump. Zero iterative progression or refactoring.'
            },
            'detected_files': ['main.py', 'README.md'],
            'proof_card': {
                'status': 'REJECTED_DEAD_DUMP',
                'headline': 'Single-commit code dump with zero git history or architectural evolution.',
                'strengths': ['Uploaded executable script'],
                'growth_area': 'Develop projects incrementally using feature branches and descriptive commit logs.',
                'specific_action': 'Rebuild codebase with test-driven development over at least two weeks.',
                'tamper_proof_hash': f'SHA256:{hex(random.getrandbits(128))[2:]}'
            }
        }
    candidates.append(c)

cohort_data = {
    'total_candidates': len(candidates),
    'cohort': candidates
}

# Write backend JSON
out_json = Path(__file__).resolve().parent.parent / 'data' / 'cohort_100.json'
with open(out_json, 'w', encoding='utf-8') as f:
    json.dump(cohort_data, f, indent=2)

print(f"Successfully generated {len(candidates)} candidates into {out_json}")

# Also update web/src/data/cohortData.ts
ts_code = f"""import {{ CandidateProfile }} from '../types';

export const CAMPUS_COHORT_100: CandidateProfile[] = {json.dumps(candidates, indent=2)};
"""

web_ts = Path(__file__).resolve().parent.parent.parent / 'web' / 'src' / 'data' / 'cohortData.ts'
with open(web_ts, 'w', encoding='utf-8') as f:
    f.write(ts_code)

print(f"Successfully synced cohort data to {web_ts}")
