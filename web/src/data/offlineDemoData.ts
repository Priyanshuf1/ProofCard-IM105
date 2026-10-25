import { CandidateProfile, RecruiterDecision } from '../types';

export const OFFLINE_DEMO_PROFILES: CandidateProfile[] = [
  {
    candidate_id: "cand_priyanshu_sih",
    name: "Priyanshu Awasthi & Team",
    college: "GLA University (Mathura)",
    college_tier: "Tier-2",
    repo_url: "https://github.com/shivendra1911/Data_SIH",
    project_name: "Data_SIH",
    project_type: "Fullstack AI / Water Quality Telemetry & ML Pipeline",
    total_loc: 214440,
    authenticity_score: 95,
    is_clone: false,
    matched_tutorial: null,
    git_dna: {
      total_commits: 157,
      time_span_days: 32,
      burst_ratio: 0.52,
      deletion_ratio: 0.38,
      organic_growth: true,
      message_maturity_score: 94,
      test_files_detected: 8,
      authenticity_score: 95,
      summary: "157 organic commits over 32.36 days with 38% refactoring deletion ratio (80,977 lines deleted / 214,440 lines added). Priyanshu authored 80 commits (51.0%) and initiated the project."
    },
    detected_files: [
      "src/components/WaterMonitoringDashboard.tsx",
      "src/ml/water_quality_predictor.py",
      "src/services/telemetryStream.ts",
      "backend/api/sensors.py",
      "backend/models/neural_net.py",
      "datasets/neernetra_hybrid_dataset.csv"
    ],
    structural_token_sequence: "Program>ImportDeclaration>ClassDeclaration>MethodDefinition>AsyncFunctionDef>TryStatement>AwaitExpression>CallExpression>ReturnStatement",
    complex_functions: [
      {
        file: "src/ml/water_quality_predictor.py",
        function_name: "train_hybrid_ensemble",
        complexity: 9,
        line_number: 84,
        snippet: "def train_hybrid_ensemble(sensor_matrix: np.ndarray, labels: np.ndarray, k_folds: int = 5):\n    scaler = RobustScaler()\n    norm_data = scaler.fit_transform(sensor_matrix)\n    xgb_model = XGBClassifier(n_estimators=300, max_depth=6, learning_rate=0.03)\n    rf_model = RandomForestClassifier(n_estimators=200, criterion='entropy')\n    ensemble = VotingClassifier(estimators=[('xgb', xgb_model), ('rf', rf_model)], voting='soft')\n    cv_scores = cross_val_score(ensemble, norm_data, labels, cv=k_folds, scoring='f1_macro')\n    ensemble.fit(norm_data, labels)\n    return ensemble, float(np.mean(cv_scores))"
      },
      {
        file: "src/services/telemetryStream.ts",
        function_name: "handleSensorTelemetryBatch",
        complexity: 8,
        line_number: 45,
        snippet: "export async function handleSensorTelemetryBatch(readings: SensorReadingBatch): Promise<TelemetryAck> {\n  const sanitized = readings.items.filter(r => r.ph >= 0 && r.ph <= 14 && r.turbidity >= 0);\n  if (sanitized.length === 0) return { accepted: 0, rejected: readings.items.length };\n  const batchPayload = {\n    timestamp: Date.now(),\n    readings: sanitized,\n    checksum: computeSha256(JSON.stringify(sanitized))\n  };\n  await db.telemetry_stream.insertMany(batchPayload);\n  return { accepted: sanitized.length, rejected: readings.items.length - sanitized.length };\n}"
      },
      {
        file: "backend/api/sensors.py",
        function_name: "evaluate_anomaly_drift",
        complexity: 7,
        line_number: 112,
        snippet: "async def evaluate_anomaly_drift(sensor_id: str, sliding_window_sec: int = 3600):\n    telemetry_window = await redis_client.zrangebyscore(f'sensor:{sensor_id}', min=time.time() - sliding_window_sec, max='+inf')\n    if len(telemetry_window) < 30:\n        return {'status': 'INSUFFICIENT_TELEMETRY'}\n    z_scores = np.abs(stats.zscore([float(r.split(':')[1]) for r in telemetry_window]))\n    anomalies = np.where(z_scores > 3.0)[0]\n    return {'anomalies_detected': len(anomalies), 'drift_index': float(np.max(z_scores))}"
      }
    ],
    viva_questions: [
      {
        question_id: "q1",
        function_name: "train_hybrid_ensemble",
        file: "src/ml/water_quality_predictor.py",
        line_number: 84,
        question: "In train_hybrid_ensemble ('src/ml/water_quality_predictor.py':84), why did you choose soft voting over hard majority voting for combining XGBoost and Random Forest?",
        expected_concepts: [
          "Calibrated probability averaging",
          "Soft voting weights confidence margins",
          "Lower variance on borderline sensor readings"
        ],
        difficulty: "hard",
        mock_answer: "Soft voting computes weighted class probabilities rather than raw binary counts, which preserves nuance for borderline contamination readings where one classifier has 92% confidence and the other has 51%.",
        score: 10,
        feedback: "Exceptional machine learning intuition regarding probabilistic consensus."
      },
      {
        question_id: "q2",
        function_name: "handleSensorTelemetryBatch",
        file: "src/services/telemetryStream.ts",
        line_number: 45,
        question: "In handleSensorTelemetryBatch ('src/services/telemetryStream.ts':45), how do you prevent database lock contention during high-velocity sensor telemetry spikes?",
        expected_concepts: [
          "Batch inserts (insertMany) vs sequential roundtrips",
          "Input sanitization & checksum verification",
          "Backpressure buffering"
        ],
        difficulty: "hard",
        mock_answer: "We aggregate raw sensor readings into bulk batches of 250 items with SHA-256 integrity verification and execute a single insertMany call, cutting network roundtrips by 99%.",
        score: 9,
        feedback: "Solid production data ingestion architectural understanding."
      },
      {
        question_id: "q3",
        function_name: "evaluate_anomaly_drift",
        file: "backend/api/sensors.py",
        line_number: 112,
        question: "In evaluate_anomaly_drift ('backend/api/sensors.py':112), why did you use Redis Sorted Sets (zrangebyscore) for temporal sensor telemetry storage?",
        expected_concepts: [
          "O(log N + M) range lookups by timestamp score",
          "Automatic temporal ordering",
          "Efficient sliding window TTL evictions"
        ],
        difficulty: "medium",
        mock_answer: "Redis sorted sets allow O(log N) retrieval of timestamps within our sliding 1-hour window, enabling real-time Z-score calculations without querying the primary SQL database.",
        score: 10,
        feedback: "Clean temporal caching pattern."
      }
    ],
    viva_score: 9,
    proof_card: {
      status: "VERIFIED_EXEMPLARY",
      headline: "Exemplary fullstack and ML telemetry builder with 157 authentic git commits, 38% refactoring ratio, and verified sensor architecture.",
      strengths: [
        "157 organic commits across 32.36 days with 38% refactoring deletion ratio (80,977 lines deleted)",
        "Priyanshu authored 80 commits (51%) and established the core application architecture",
        "Robust ensemble ML pipeline with soft voting and Redis sorted set temporal sliding window"
      ],
      growth_area: "Incorporate Kafka or RabbitMQ distributed message brokers for scale beyond 10,000 concurrent IoT probes.",
      specific_action: "Add integration tests simulating intermittent sensor connectivity and payload corruption.",
      tamper_proof_hash: "SHA256:d8a9b2c3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1"
    },
    consent_recorded: true
  },
  {
    candidate_id: "cand_priyanshu_04",
    name: "Priyanshu Awasthi",
    college: "GLA University (Mathura)",
    college_tier: "Tier-2",
    repo_url: "https://github.com/Priyanshuf1",
    project_name: "instagram-id-lookup-gui",
    project_type: "TypeScript / React / RapidAPI Serverless",
    total_loc: 2450,
    authenticity_score: 96,
    is_clone: false,
    matched_tutorial: null,
    git_dna: {
      total_commits: 28,
      time_span_days: 32,
      burst_ratio: 0.14,
      deletion_ratio: 0.24,
      organic_growth: true,
      message_maturity_score: 92,
      test_files_detected: 4,
      authenticity_score: 96,
      summary: "28 organic commits over 32 days with 24% refactoring deletion ratio. Genuine iterative engineering progression."
    },
    detected_files: [
      "api/insta.ts",
      "src/components/InstagramLookup.tsx",
      "src/components/PhotoCarousel.tsx",
      "src/App.tsx",
      "src/types.ts",
      "vite.config.ts"
    ],
    structural_token_sequence: "Program>ImportDeclaration>ExportDeclaration>FunctionDeclaration>VariableDeclaration>TryStatement>AwaitExpression>CallExpression>ReturnStatement",
    complex_functions: [
      {
        file: "api/insta.ts",
        function_name: "handler",
        complexity: 7,
        line_number: 6,
        snippet: "export default function handler(req: VercelRequest, res: VercelResponse) {\n  const RAPIDAPI_KEY = process.env.VITE_RAPIDAPI_KEY || '';\n  const RAPIDAPI_HOST = 'flashapi1.p.rapidapi.com';\n  const rawPath = (req.url || '').replace(/^\\/api\\/insta/, '') || '/';\n  const targetUrl = new URL(`https://${RAPIDAPI_HOST}${rawPath}`);\n  const options = {\n    hostname: RAPIDAPI_HOST,\n    path: targetUrl.pathname + targetUrl.search,\n    method: req.method || 'GET',\n    headers: { 'x-rapidapi-key': RAPIDAPI_KEY, 'x-rapidapi-host': RAPIDAPI_HOST }\n  };\n  const proxyReq = https.request(options, (proxyRes) => {\n    res.status(proxyRes.statusCode || 200);\n    proxyRes.pipe(res);\n  });\n  proxyReq.on('error', (err) => res.status(502).json({ error: err.message }));\n}"
      },
      {
        file: "src/components/InstagramLookup.tsx",
        function_name: "handleResolve",
        complexity: 9,
        line_number: 43,
        snippet: "const handleResolve = async (e: React.FormEvent) => {\n  e.preventDefault();\n  if (!usernameInput.trim()) return;\n  setIsResolving(true);\n  try {\n    const res = await fetch(`/api/insta/user/info?username=${encodeURIComponent(usernameInput.trim())}`);\n    const data = await res.json();\n    if (data && data.id) {\n      setResolvedId(String(data.id));\n      onResolveId(usernameInput.trim(), String(data.id));\n    }\n  } catch (err) {\n    onAddLog?.(`Lookup failed: ${err}`, 'error');\n  } finally {\n    setIsResolving(false);\n  }\n};"
      },
      {
        file: "src/components/InstagramLookup.tsx",
        function_name: "handleLoadTarget",
        complexity: 7,
        line_number: 68,
        snippet: "const handleLoadTarget = (target: string) => {\n  if (!target.trim()) return;\n  setIsResolving(true);\n  try {\n    onLoadTarget(target.trim(), target.trim());\n    onAddLog?.(`Target loaded: ${target.trim()}`, 'success');\n  } finally {\n    setIsResolving(false);\n  }\n};"
      }
    ],
    viva_questions: [
      {
        question_id: "q1",
        function_name: "handler",
        file: "api/insta.ts",
        line_number: 6,
        question: "In your serverless RapidAPI proxy handler ('api/insta.ts':6), how do you mitigate upstream service timeouts and ensure external proxy sockets are cleanly terminated on network dropouts?",
        expected_concepts: [
          "Upstream timeout mitigation",
          "Socket cleanup and error handling",
          "Serverless lifecycle bounds"
        ],
        difficulty: "hard",
        mock_answer: "I attached an explicit error listener on proxyReq and piped the stream directly to res, returning a 502 Bad Gateway with connection closure if upstream drops.",
        score: 10,
        feedback: "Superb architectural clarity regarding streaming reverse proxy error isolation."
      },
      {
        question_id: "q2",
        function_name: "handleResolve",
        file: "src/components/InstagramLookup.tsx",
        line_number: 43,
        question: "In asynchronous handler 'handleResolve' ('src/components/InstagramLookup.tsx':43), how do you guard against race conditions and UI state desynchronization if multiple user queries execute concurrently?",
        expected_concepts: [
          "Concurrency debounce / locks",
          "Request cancellation (AbortController)",
          "Defensive state isolation"
        ],
        difficulty: "hard",
        mock_answer: "We toggle isResolving state to lock duplicate form submissions and encodeURIComponent on the parameter to prevent malformed URI requests.",
        score: 9,
        feedback: "Strong understanding of client-side concurrency guardrails."
      },
      {
        question_id: "q3",
        function_name: "handleLoadTarget",
        file: "src/components/InstagramLookup.tsx",
        line_number: 68,
        question: "In 'handleLoadTarget' ('src/components/InstagramLookup.tsx':68), what validation prevents injection or invalid URI encoding when transferring user identifiers to downstream photo carousel modules?",
        expected_concepts: [
          "Input sanitization",
          "URI component encoding",
          "Defensive state dispatch"
        ],
        difficulty: "medium",
        mock_answer: "Input trimming and defensive validation ensure empty or whitespace identifiers cannot corrupt the downstream photo viewer.",
        score: 9,
        feedback: "Clean component-level contract validation."
      }
    ],
    viva_score: 9,
    proof_card: {
      status: "VERIFIED_EXEMPLARY",
      headline: "Exceptional fullstack engineering intuition with verified custom serverless proxy and clean component state.",
      strengths: [
        "28 organic commits over 32 days with 24% refactoring deletion ratio",
        "Clean serverless reverse proxy pipeline isolating RapidAPI upstream errors",
        "Robust React component architecture with defensive input sanitization"
      ],
      growth_area: "Add automated Vitest integration suites for serverless route boundary mocking.",
      specific_action: "Implement mock-service-worker (MSW) tests for /api/insta HTTP timeout handling.",
      tamper_proof_hash: "SHA256:7f9a88e9b112c334d556677889900aabbccddeeff112233445566778899aabb0"
    },
    consent_recorded: true
  },
  {
    candidate_id: "cand_copier_01",
    name: "Rohan Sharma",
    college: "Delhi Technological Institute (Tier-1 Elite)",
    college_tier: "Tier-1",
    repo_url: "https://github.com/rohan-tech/mern-goals-app",
    project_name: "mern-goals-app",
    project_type: "Node.js / Express / MongoDB",
    total_loc: 1420,
    authenticity_score: 18,
    is_clone: true,
    matched_tutorial: {
      id: "traversy_mern_2023",
      name: "Traversy Media MERN Stack Tutorial",
      source_url: "https://github.com/bradtraversy/mern-tutorial",
      youtube_url: "https://www.youtube.com/watch?v=-0exw-9YJBo",
      author: "Brad Traversy",
      origin_type: "YOUTUBE_TUTORIAL_CLONE",
      uploaded: "2023-03-15",
      similarity_score: 0.89,
      matched_files: [

        "server.js",
        "backend/routes/goalRoutes.js",
        "backend/controllers/goalController.js",
        "backend/models/goalModel.js",
        "backend/middleware/errorMiddleware.js"
      ],
      verdict: "CRITICAL ALERT: 89% structural AST match with Traversy Media MERN Tutorial on YouTube. Single commit burst over 2.8 hours. Zero unit tests."
    },
    git_dna: {
      total_commits: 3,
      time_span_days: 1,
      burst_ratio: 0.94,
      deletion_ratio: 0.02,
      organic_growth: false,
      message_maturity_score: 24,
      test_files_detected: 0,
      authenticity_score: 18,
      summary: "3 commits in 2.8 hours. Deletion ratio 2%. Tutorial clone pattern detected."
    },
    detected_files: [
      "server.js",
      "backend/routes/goalRoutes.js",
      "backend/controllers/goalController.js",
      "backend/models/goalModel.js",
      "backend/middleware/errorMiddleware.js",
      "package.json"
    ],
    structural_token_sequence: "Program>ImportDeclaration>ExpressionStatement>CallExpression>VariableDeclaration>FunctionDeclaration>TryStatement>MemberExpression",
    complex_functions: [
      {
        file: "backend/middleware/errorMiddleware.js",
        function_name: "errorHandler",
        complexity: 3,
        line_number: 1,
        snippet: "const errorHandler = (err, req, res, next) => {\n  const statusCode = res.statusCode ? res.statusCode : 500;\n  res.status(statusCode);\n  res.json({\n    message: err.message,\n    stack: process.env.NODE_ENV === 'production' ? null : err.stack,\n  });\n};"
      },
      {
        file: "backend/controllers/goalController.js",
        function_name: "setGoal",
        complexity: 4,
        line_number: 14,
        snippet: "const setGoal = asyncHandler(async (req, res) => {\n  if (!req.body.text) {\n    res.status(400);\n    throw new Error('Please add a text field');\n  }\n  const goal = await Goal.create({\n    text: req.body.text,\n    user: req.user.id,\n  });\n  res.status(200).json(goal);\n});"
      }
    ],
    viva_questions: [
      {
        question_id: "q1",
        function_name: "errorHandler",
        file: "backend/middleware/errorMiddleware.js",
        line_number: 1,
        question: "In your errorHandler middleware, why did you check process.env.NODE_ENV === 'production' before exposing err.stack?",
        expected_concepts: ["Information disclosure security", "Stack traces expose internal paths to attackers", "Environment toggling"],
        difficulty: "medium",
        mock_answer: "Because stack trace has sensitive errors.",
        score: 4,
        feedback: "Superficial answer. Lacks knowledge of OWASP path traversal and information leakage vectors."
      },
      {
        question_id: "q2",
        function_name: "setGoal",
        file: "backend/controllers/goalController.js",
        line_number: 14,
        question: "What happens if MongoDB times out during the await Goal.create() call? How is connection pooling handled?",
        expected_concepts: ["Mongoose connection pool buffer", "Async error catching in express-async-handler", "Timeout retry"],
        difficulty: "hard",
        mock_answer: "It throws an error and goes to catch block.",
        score: 3,
        feedback: "Candidate does not understand express-async-handler propagation or pool disconnection states."
      },
      {
        question_id: "q3",
        function_name: "registerUser",
        file: "backend/controllers/userController.js",
        line_number: 8,
        question: "Why did you use bcrypt.genSalt(10) instead of a higher work factor like 14?",
        expected_concepts: ["CPU cost vs brute force protection tradeoff", "Node event loop blocking", "Hashing work factor exponential time"],
        difficulty: "medium",
        mock_answer: "It is standard in the code.",
        score: 2,
        feedback: "Confirms tutorial copying without understanding cryptographic computation cost."
      }
    ],
    viva_score: 3,
    proof_card: {
      status: "FLAGGED_CLONE",
      headline: "High probability tutorial clone detected (89% forensic similarity).",
      strengths: [
        "Dependencies correctly configured in package.json",
        "Basic Express middleware wiring completed"
      ],
      growth_area: "Build original architectural features rather than copying linear video tutorials.",
      specific_action: "Implement a custom Redis caching layer or write 5 Jest integration tests to demonstrate authentic engineering.",
      tamper_proof_hash: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
    },
    consent_recorded: true
  },
  {
    candidate_id: "cand_builder_02",
    name: "Ananya Patel",
    college: "Government Engineering College (Tier-3 State University)",
    college_tier: "Tier-3",
    repo_url: "https://github.com/ananya-dev/event-mesh-broker",
    project_name: "event-mesh-broker",
    project_type: "Python / FastAPI / AsyncIO / Redis",
    total_loc: 4820,
    authenticity_score: 96,
    is_clone: false,
    matched_tutorial: null,
    git_dna: {
      total_commits: 54,
      time_span_days: 52,
      burst_ratio: 0.12,
      deletion_ratio: 0.28,
      organic_growth: true,
      message_maturity_score: 92,
      test_files_detected: 14,
      authenticity_score: 96,
      summary: "54 commits across 7 weeks. 28% refactoring deletion ratio. Exceptional organic progression."
    },
    detected_files: [
      "core/broker.py",
      "core/circuit.py",
      "api/fastapi_app.py",
      "db/postgres_pool.py",
      "cache/redis_client.py",
      "tests/test_broker.py",
      "Dockerfile",
      "docker-compose.yml"
    ],
    structural_token_sequence: "Program>ImportDeclaration>AsyncFunctionDef>TryStatement>AsyncWith>AwaitExpression>CallExpression>WhileStatement>IfStatement>ReturnStatement",
    complex_functions: [
      {
        file: "core/broker.py",
        function_name: "dispatch_dead_letter_queue",
        complexity: 8,
        line_number: 42,
        snippet: "async def dispatch_dead_letter_queue(self, payload: EventPayload, retry_count: int = 3):\n    async with self.concurrency_semaphore:\n        for attempt in range(retry_count):\n            try:\n                return await self.redis_pool.xadd('dlq:stream', payload.to_dict())\n            except ConnectionError:\n                await asyncio.sleep(0.5 * (2 ** attempt))\n        logger.critical(f'DLQ overflow on payload {payload.id}')"
      },
      {
        file: "core/circuit.py",
        function_name: "reconnect_circuit_breaker",
        complexity: 7,
        line_number: 88,
        snippet: "async def reconnect_circuit_breaker(self):\n    async with self._lock:\n        if self.state == CircuitState.HALF_OPEN:\n            is_healthy = await self._probe_health()\n            self.state = CircuitState.CLOSED if is_healthy else CircuitState.OPEN"
      }
    ],
    viva_questions: [
      {
        question_id: "q1",
        function_name: "dispatch_dead_letter_queue",
        file: "core/broker.py",
        line_number: 42,
        question: "Why did you use asyncio.Semaphore(15) alongside exponential backoff when flushing messages to DLQ?",
        expected_concepts: ["Backpressure management", "Preventing Redis buffer saturation", "Throttling concurrent network I/O"],
        difficulty: "hard",
        mock_answer: "I introduced the semaphore because under high throughput spikes, flushing 1000 failing payloads at once caused downstream Redis socket timeouts. Limiting to 15 concurrent dispatchers keeps memory predictable and respects downstream socket backpressure.",
        score: 10,
        feedback: "Exceptional production-grade systems understanding. Candidate reasoned through memory pressure and socket saturation."
      },
      {
        question_id: "q2",
        function_name: "reconnect_circuit_breaker",
        file: "core/circuit.py",
        line_number: 88,
        question: "How did you avoid race conditions when transitioning the circuit breaker state from HALF_OPEN to OPEN in a multithreaded worker pool?",
        expected_concepts: ["Atomic CAS (compare-and-swap)", "Threading Lock vs Asyncio Lock", "Idempotency"],
        difficulty: "hard",
        mock_answer: "I used an asyncio.Lock combined with an atomic status check before executing the probe call so only one coroutine conducts health checks while others wait in standby.",
        score: 9,
        feedback: "Strong concurrency foundations and distributed systems intuition."
      },
      {
        question_id: "q3",
        function_name: "test_burst_consumer_failover",
        file: "tests/test_broker.py",
        line_number: 19,
        question: "In your pytest suite, how do you simulate network partition without killing the Redis test container?",
        expected_concepts: ["Mocking transport layer", "Toxiproxy / Socket monkeypatching", "Deterministic testing"],
        difficulty: "medium",
        mock_answer: "I monkeypatched the redis.asyncio ConnectionPool.get_connection method to raise ConnectionResetError on every 3rd invocation, ensuring our retry policies were covered deterministically.",
        score: 10,
        feedback: "Mastery of automated resilience testing."
      }
    ],
    viva_score: 10,
    proof_card: {
      status: "VERIFIED_EXEMPLARY",
      headline: "High-confidence authentic systems engineer (96% originality rating).",
      strengths: [
        "54 organic commits over 7 weeks demonstrating iterative refactoring (28% deletion ratio)",
        "14 test files with 86% coverage including resilience and race condition tests",
        "Architectural depth in async I/O backpressure and fault-tolerant event processing"
      ],
      growth_area: "Add OpenAPI documentation tags and deploy containerized helm charts for Kubernetes.",
      specific_action: "Package the broker as a pip library and publish performance benchmarks comparing throughput against Celery.",
      tamper_proof_hash: "SHA256:3a1b89ef48c08d13e9a93c8340d892dfec05847321e0e84b80a6c2f9d146312a"
    },
    consent_recorded: true
  },
  {
    candidate_id: "cand_middle_03",
    name: "Vikram Rao",
    college: "Vellore Institute of Technology",
    college_tier: "Tier-2",
    repo_url: "https://github.com/vikram-r/ecommerce-platform",
    project_name: "ecommerce-platform",
    project_type: "React / Node.js / PostgreSQL",
    total_loc: 2980,
    authenticity_score: 64,
    is_clone: false,
    matched_tutorial: {
      id: "webdevsimplified_shopping_cart",
      name: "Web Dev Simplified React Shopping Cart",
      youtube_url: "https://www.youtube.com/watch?v=lATafp15HWA",
      uploaded: "2022-07-28",
      similarity_score: 0.42,
      matched_files: ["src/context/ShoppingCartContext.tsx", "src/hooks/useLocalStorage.ts"],
      verdict: "PARTIAL ADAPTATION: The frontend shopping cart context matches a tutorial, but candidate added custom PostgreSQL backend routes and Stripe webhook logic."
    },
    git_dna: {
      total_commits: 19,
      time_span_days: 18,
      burst_ratio: 0.45,
      deletion_ratio: 0.14,
      organic_growth: true,
      message_maturity_score: 62,
      test_files_detected: 2,
      authenticity_score: 64,
      summary: "19 commits over 18 days. 14% deletion ratio. Custom backend built around public UI scaffolding."
    },
    detected_files: [
      "src/context/ShoppingCartContext.tsx",
      "src/hooks/useLocalStorage.ts",
      "server/webhooks.js",
      "server/taxService.js",
      "server/db/postgres.js",
      "Dockerfile"
    ],
    structural_token_sequence: "Program>ImportDeclaration>FunctionDeclaration>IfStatement>ReturnStatement>VariableDeclaration>CallExpression>MemberExpression",
    complex_functions: [
      {
        file: "server/webhooks.js",
        function_name: "handleStripeWebhook",
        complexity: 6,
        line_number: 22,
        snippet: "export async function handleStripeWebhook(req, res) {\n  const sig = req.headers['stripe-signature'];\n  let event;\n  try {\n    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_SECRET);\n  } catch (err) {\n    return res.status(400).send(`Webhook Error: ${err.message}`);\n  }\n  if (event.type === 'checkout.session.completed') {\n    await fulfillOrder(event.data.object);\n  }\n  res.json({ received: true });\n}"
      }
    ],
    viva_questions: [
      {
        question_id: "q1",
        function_name: "handleStripeWebhook",
        file: "server/webhooks.js",
        line_number: 22,
        question: "How do you verify the authenticity of incoming Stripe events to prevent signature spoofing?",
        expected_concepts: ["Stripe-Signature header", "Raw body parsing vs JSON body", "Webhook secret verification"],
        difficulty: "medium",
        mock_answer: "We use stripe.webhooks.constructEvent passing the raw request buffer and endpoint secret.",
        score: 8,
        feedback: "Correctly identified raw body requirement for cryptographic verification."
      },
      {
        question_id: "q2",
        function_name: "useLocalStorage",
        file: "src/hooks/useLocalStorage.ts",
        line_number: 5,
        question: "Why did you use typeof window !== 'undefined' check inside the initializer?",
        expected_concepts: ["Next.js SSR safety", "Window object undefined on server runtime"],
        difficulty: "easy",
        mock_answer: "To prevent crash during server rendering because local storage does not exist on server.",
        score: 7,
        feedback: "Understands SSR hydration lifecycle."
      },
      {
        question_id: "q3",
        function_name: "calculateCartTaxes",
        file: "server/taxService.js",
        line_number: 31,
        question: "How do you avoid floating point roundoff errors when totaling currency amounts?",
        expected_concepts: ["Storing in cents / lowest denomination integer", "Decimal.js or BigNumber", "Avoid float arithmetic in money"],
        difficulty: "medium",
        mock_answer: "I multiplied by 100 and used Math.round.",
        score: 6,
        feedback: "Acceptable practical solution, though arbitrary precision decimal library is preferred in enterprise."
      }
    ],
    viva_score: 7,
    proof_card: {
      status: "VERIFIED_COMPETENT",
      headline: "Competent fullstack builder with solid custom backend additions.",
      strengths: [
        "Successfully integrated Stripe webhooks with raw body signature verification",
        "Connected custom PostgreSQL schema with migration scripts",
        "Organic commit history across 18 days"
      ],
      growth_area: "Increase test coverage for cart calculation edge cases and refactor away from tutorial state boilerplate.",
      specific_action: "Write 4 Jest tests for discount code validation and cart checkout tax calculations.",
      tamper_proof_hash: "SHA256:5d41402abc4b2a76b9719d911017c592b04f1fedf3e3e8f85d1e2e3f4e5a6b7c"
    },
    consent_recorded: true
  }
];

export const SAMPLE_RECRUITER_DECISIONS: RecruiterDecision[] = [
  { candidate_id: "rec_c1", name: "Rishi Kapoor", college: "IIT Delhi", college_tier: "Tier-1", skill_score: 68, recruiter_shortlisted: true },
  { candidate_id: "rec_c2", name: "Siddharth Jain", college: "IIT Bombay", college_tier: "Tier-1", skill_score: 64, recruiter_shortlisted: true },
  { candidate_id: "rec_c3", name: "Varun Mehta", college: "BITS Pilani", college_tier: "Tier-1", skill_score: 72, recruiter_shortlisted: true },
  { candidate_id: "rec_c4", name: "Ananya Patel", college: "GEC Bilaspur (Tier-3)", college_tier: "Tier-3", skill_score: 96, recruiter_shortlisted: false },
  { candidate_id: "rec_c5", name: "Sunil Verma", college: "BIET Jhansi (Tier-3)", college_tier: "Tier-3", skill_score: 91, recruiter_shortlisted: false },
  { candidate_id: "rec_c6", name: "Pooja Reddy", college: "REC Warangal (Tier-3)", college_tier: "Tier-3", skill_score: 87, recruiter_shortlisted: false }
];

export const PRESET_JOB_DESCRIPTIONS = [
  {
    title: "Distributed Systems & Cloud Engineer",
    text: "We are seeking a Backend Systems Engineer with deep proficiency in Python, FastAPI, Redis message brokers, PostgreSQL, and Docker. Experience with asyncio backpressure, testing with pytest, and microservice resiliency is required."
  },
  {
    title: "Senior Fullstack React & Node.js Developer",
    text: "Looking for an experienced engineer skilled in React, Next.js, Node.js, TypeScript, REST APIs, and automated Jest testing. Must have hands-on experience integrating third-party payment webhooks and managing database states."
  }
];
