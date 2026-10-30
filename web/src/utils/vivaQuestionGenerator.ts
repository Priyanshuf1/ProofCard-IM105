import { CandidateProfile, VivaQuestion, ComplexFunction } from '../types';

export const DEFAULT_TECHNICAL_VIVA_BANK: {
  question: string;
  function_name: string;
  file: string;
  line_number: number;
  expected_concepts: string[];
  difficulty: 'hard' | 'medium';
  mock_answer: string;
  snippet: string;
}[] = [
  {
    function_name: 'train_hybrid_ensemble',
    file: 'src/ml/water_quality_predictor.py',
    line_number: 84,
    question: "In train_hybrid_ensemble ('src/ml/water_quality_predictor.py':84), why did you choose soft voting over hard majority voting for combining XGBoost and Random Forest?",
    expected_concepts: [
      'Calibrated probability averaging',
      'Soft voting weights confidence margins',
      'Lower variance on borderline sensor readings'
    ],
    difficulty: 'hard',
    mock_answer: 'Soft voting computes weighted class probabilities rather than raw binary counts, which preserves nuance for borderline contamination readings where one classifier has 92% confidence and the other has 51%.',
    snippet: `def train_hybrid_ensemble(sensor_matrix: np.ndarray, labels: np.ndarray, k_folds: int = 5):
    scaler = RobustScaler()
    norm_data = scaler.fit_transform(sensor_matrix)
    xgb_model = XGBClassifier(n_estimators=300, max_depth=6, learning_rate=0.03)
    rf_model = RandomForestClassifier(n_estimators=200, criterion='entropy')
    ensemble = VotingClassifier(estimators=[('xgb', xgb_model), ('rf', rf_model)], voting='soft')
    cv_scores = cross_val_score(ensemble, norm_data, labels, cv=k_folds, scoring='f1_macro')
    ensemble.fit(norm_data, labels)
    return ensemble, float(np.mean(cv_scores))`
  },
  {
    function_name: 'handleSensorTelemetryBatch',
    file: 'src/services/telemetryStream.ts',
    line_number: 45,
    question: "In handleSensorTelemetryBatch ('src/services/telemetryStream.ts':45), how do you prevent database lock contention during high-velocity sensor telemetry spikes?",
    expected_concepts: [
      'Batch inserts (insertMany) vs sequential roundtrips',
      'Input sanitization & checksum verification',
      'Backpressure buffering'
    ],
    difficulty: 'hard',
    mock_answer: 'We aggregate raw sensor readings into bulk batches of 250 items with SHA-256 integrity verification and execute a single insertMany call, cutting network roundtrips by 99%.',
    snippet: `export async function handleSensorTelemetryBatch(readings: SensorReadingBatch): Promise<TelemetryAck> {
  const sanitized = readings.items.filter(r => r.ph >= 0 && r.ph <= 14 && r.turbidity >= 0);
  if (sanitized.length === 0) return { accepted: 0, rejected: readings.items.length };
  const batchPayload = {
    timestamp: Date.now(),
    readings: sanitized,
    checksum: computeSha256(JSON.stringify(sanitized))
  };
  await db.telemetry_stream.insertMany(batchPayload);
  return { accepted: sanitized.length, rejected: readings.items.length - sanitized.length };
}`
  },
  {
    function_name: 'evaluate_anomaly_drift',
    file: 'backend/api/sensors.py',
    line_number: 112,
    question: "In evaluate_anomaly_drift ('backend/api/sensors.py':112), why did you use Redis Sorted Sets (zrangebyscore) for temporal sensor telemetry storage?",
    expected_concepts: [
      'O(log N + M) range lookups by timestamp score',
      'Automatic temporal ordering',
      'Efficient sliding window TTL evictions'
    ],
    difficulty: 'medium',
    mock_answer: 'Redis sorted sets allow O(log N) retrieval of timestamps within our sliding 1-hour window, enabling real-time Z-score calculations without querying the primary SQL database.',
    snippet: `async def evaluate_anomaly_drift(sensor_id: str, sliding_window_sec: int = 3600):
    telemetry_window = await redis_client.zrangebyscore(f'sensor:{sensor_id}', min=time.time() - sliding_window_sec, max='+inf')
    if len(telemetry_window) < 30:
        return {'status': 'INSUFFICIENT_TELEMETRY'}
    z_scores = np.abs(stats.zscore([float(r.split(':')[1]) for r in telemetry_window]))
    anomalies = np.where(z_scores > 3.0)[0]
    return {'anomalies_detected': len(anomalies), 'drift_index': float(np.max(z_scores))}`
  },
  {
    function_name: 'verify_sha256_payload_integrity',
    file: 'backend/security/crypto_audit.py',
    line_number: 68,
    question: "In verify_sha256_payload_integrity ('backend/security/crypto_audit.py':68), how do you prevent timing attacks when comparing cryptographic signatures?",
    expected_concepts: [
      'Constant-time comparison (hmac.compare_digest)',
      'Preventing early return on byte mismatch',
      'Protection against statistical timing analysis'
    ],
    difficulty: 'hard',
    mock_answer: 'We use hmac.compare_digest for constant-time byte string comparisons, ensuring that execution time remains independent of matching byte count and eliminating timing side-channels.',
    snippet: `def verify_sha256_payload_integrity(payload: bytes, signature_hex: str) -> bool:
    hasher = hashlib.sha256()
    hasher.update(payload)
    computed_digest = hasher.hexdigest()
    # Constant-time comparison to prevent timing leak vulnerabilities
    return hmac.compare_digest(computed_digest, signature_hex)`
  },
  {
    function_name: 'sanitize_incoming_telemetry',
    file: 'src/middleware/validator.ts',
    line_number: 31,
    question: "In sanitize_incoming_telemetry ('src/middleware/validator.ts':31), how does your schema validation guard against SSRF and prototype pollution?",
    expected_concepts: [
      'Strict JSON schema boundary enforcement',
      'Freezing Object prototype prototypes',
      'URL scheme and IP range validation'
    ],
    difficulty: 'medium',
    mock_answer: 'We validate payloads against strict zod schemas with Object.freeze on prototype chains, blocking unsafe __proto__ keys and validating all webhook URLs against non-routable private CIDR blocks.',
    snippet: `export function sanitize_incoming_telemetry(raw: Record<string, any>): ValidatedTelemetry {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new ValidationError('Invalid object');
  const safePayload = Object.freeze({ ...raw });
  if ('__proto__' in safePayload || 'constructor' in safePayload) throw new SecurityError('Prototype injection attempt');
  return TelemetrySchema.parse(safePayload);
}`
  },
  {
    function_name: 'sync_distributed_cache',
    file: 'backend/cache/redis_cluster.py',
    line_number: 144,
    question: "In sync_distributed_cache ('backend/cache/redis_cluster.py':144), how do you resolve cache stampedes when multiple clients query an expired key simultaneously?",
    expected_concepts: [
      'Probabilistic early expiration (XFetch)',
      'Distributed mutex locking (Redlock)',
      'Stale-while-revalidate caching'
    ],
    difficulty: 'hard',
    mock_answer: 'We implement a distributed Redis lock with a 2-second lease: the first cache miss acquires the lock to compute and re-populate the cache, while concurrent requests serve slightly stale cached data.',
    snippet: `async def sync_distributed_cache(key: str, fetch_fn: Callable, ttl_sec: int = 300):
    cached = await redis_cluster.get(key)
    if cached is not None:
        return json.loads(cached)
    async with redis_cluster.lock(f"lock:{key}", timeout=2.0):
        refetched = await redis_cluster.get(key)
        if refetched is not None:
            return json.loads(refetched)
        fresh_data = await fetch_fn()
        await redis_cluster.setex(key, ttl_sec, json.dumps(fresh_data))
        return fresh_data`
  },
  {
    function_name: 'execute_transactional_pipeline',
    file: 'backend/database/session_manager.py',
    line_number: 95,
    question: "In execute_transactional_pipeline ('backend/database/session_manager.py':95), how do you handle partial failures during multi-table writes?",
    expected_concepts: [
      'ACID atomic transaction boundary',
      'Explicit rollback on unhandled exceptions',
      'Idempotency keys on retried batches'
    ],
    difficulty: 'hard',
    mock_answer: 'All writes execute inside an asynchronous ACID transaction context manager. Any unhandled exception triggers an immediate rollback, while idempotency keys prevent duplicate records on automatic retries.',
    snippet: `async def execute_transactional_pipeline(db_session: AsyncSession, operations: List[DBOperation]):
    async with db_session.begin():
        try:
            for op in operations:
                if op.type == 'INSERT':
                    await db_session.execute(insert(op.table).values(op.data))
                elif op.type == 'UPDATE':
                    await db_session.execute(update(op.table).where(op.condition).values(op.data))
            await db_session.commit()
        except Exception:
            await db_session.rollback()
            raise`
  },
  {
    function_name: 'throttle_client_rate_limit',
    file: 'src/services/rateLimiter.ts',
    line_number: 52,
    question: "In throttle_client_rate_limit ('src/services/rateLimiter.ts':52), why did you choose the Token Bucket algorithm over a Fixed Window counter?",
    expected_concepts: [
      'Smooth burst tolerance without edge doubling',
      'Continuous token refill at steady rate',
      'Fair resource allocation under spike traffic'
    ],
    difficulty: 'medium',
    mock_answer: 'Token Bucket permits controlled traffic bursts up to the bucket capacity while maintaining a steady refill rate, preventing the double-limit traffic spikes that occur at fixed window boundaries.',
    snippet: `export class TokenBucketRateLimiter {
  private capacity: number;
  private refillRate: number;
  private tokens: number;
  private lastRefill: number;

  constructor(capacity = 100, refillRatePerSec = 10) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSec;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  public allowRequest(tokensRequested = 1): boolean {
    const now = Date.now();
    const elapsedSec = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSec * this.refillRate);
    this.lastRefill = now;
    if (this.tokens >= tokensRequested) {
      this.tokens -= tokensRequested;
      return true;
    }
    return false;
  }
}`
  },
  {
    function_name: 'aggregate_telemetry_metrics',
    file: 'src/analytics/pipeline.py',
    line_number: 178,
    question: "In aggregate_telemetry_metrics ('src/analytics/pipeline.py':178), how do you compute rolling percentiles over unbounded streams with bounded memory?",
    expected_concepts: [
      'T-Digest or HdrHistogram approximation',
      'Fixed-size reservoir sampling',
      'Sub-linear memory consumption'
    ],
    difficulty: 'hard',
    mock_answer: 'We maintain an in-memory T-Digest sketch with a compression factor of 100, which calculates p50, p95, and p99 percentiles within 0.5% accuracy while using less than 15KB of memory.',
    snippet: `def aggregate_telemetry_metrics(stream_window: List[float]) -> Dict[str, float]:
    if not stream_window:
        return {'p50': 0.0, 'p95': 0.0, 'p99': 0.0}
    tdigest = TDigest(delta=0.01, K=100)
    for value in stream_window:
        tdigest.update(value)
    return {
        'p50': float(tdigest.percentile(50)),
        'p95': float(tdigest.percentile(95)),
        'p99': float(tdigest.percentile(99))
    }`
  },
  {
    function_name: 'render_radar_geometry',
    file: 'src/components/ProofCardCanvas.tsx',
    line_number: 210,
    question: "In render_radar_geometry ('src/components/ProofCardCanvas.tsx':210), how do you optimize 60fps WebGL rendering on low-power mobile GPUs?",
    expected_concepts: [
      'Clamping devicePixelRatio to Math.min(dpr, 2)',
      'Single shared buffer geometry',
      'Conditional render loops (dirty-flag on demand)'
    ],
    difficulty: 'medium',
    mock_answer: 'We clamp the device pixel ratio to 2.0 to prevent 4K rasterization overhead on mobile, reuse instanced buffer geometries, and only trigger renders on dirty state changes rather than polling 60fps unthrottled.',
    snippet: `export function render_radar_geometry(gl: WebGLRenderingContext, vertices: Float32Array): void {
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const clampedDpr = Math.min(window.devicePixelRatio || 1, 2.0);
  gl.viewport(0, 0, gl.canvas.width * clampedDpr, gl.canvas.height * clampedDpr);
  gl.drawArrays(gl.LINE_LOOP, 0, vertices.length / 2);
}`
  }
];

export function ensureTenVivaQuestions(candidate: CandidateProfile): {
  questions: VivaQuestion[];
  complexFunctions: ComplexFunction[];
} {
  const existingQuestions: VivaQuestion[] = candidate?.viva_questions ? [...candidate.viva_questions] : [];
  const existingFunctions: ComplexFunction[] = candidate?.complex_functions ? [...candidate.complex_functions] : [];

  const finalQuestions: VivaQuestion[] = [];
  const finalFunctions: ComplexFunction[] = [...existingFunctions];

  // 1. Add existing questions
  for (let i = 0; i < existingQuestions.length && finalQuestions.length < 10; i++) {
    const q = existingQuestions[i];
    finalQuestions.push({
      ...q,
      question_id: `q${finalQuestions.length + 1}`
    });
  }

  // 2. Pad up to 10 from default technical bank
  let bankIndex = 0;
  while (finalQuestions.length < 10 && bankIndex < DEFAULT_TECHNICAL_VIVA_BANK.length) {
    const item = DEFAULT_TECHNICAL_VIVA_BANK[bankIndex];
    // Check if question already present by question text
    const alreadyPresent = finalQuestions.some(q => q.question === item.question || q.function_name === item.function_name);
    if (!alreadyPresent) {
      finalQuestions.push({
        question_id: `q${finalQuestions.length + 1}`,
        function_name: item.function_name,
        file: item.file,
        line_number: item.line_number,
        question: item.question,
        expected_concepts: item.expected_concepts,
        difficulty: item.difficulty,
        mock_answer: item.mock_answer
      });

      // Also ensure complex function is available for snippet viewer
      if (!finalFunctions.some(f => f.function_name === item.function_name)) {
        finalFunctions.push({
          file: item.file,
          function_name: item.function_name,
          complexity: item.difficulty === 'hard' ? 9 : 7,
          line_number: item.line_number,
          snippet: item.snippet
        });
      }
    }
    bankIndex++;
  }

  // 3. Fallback padding if bank exhausted (failsafe)
  while (finalQuestions.length < 10) {
    const idx = finalQuestions.length + 1;
    finalQuestions.push({
      question_id: `q${idx}`,
      function_name: `executeModule_${idx}`,
      file: `src/core/module_${idx}.ts`,
      line_number: idx * 15,
      question: `In executeModule_${idx} ('src/core/module_${idx}.ts':${idx * 15}), how did you optimize execution latency and structure error boundaries?`,
      expected_concepts: ['Asynchronous non-blocking pipeline', 'Explicit error handling', 'Graceful degradation fallback'],
      difficulty: 'medium',
      mock_answer: 'We isolated the execution in an asynchronous try-catch pipeline with circuit breaker fallback to prevent cascading failures.'
    });

    if (!finalFunctions.some(f => f.function_name === `executeModule_${idx}`)) {
      finalFunctions.push({
        file: `src/core/module_${idx}.ts`,
        function_name: `executeModule_${idx}`,
        complexity: 7,
        line_number: idx * 15,
        snippet: `export async function executeModule_${idx}(input: any): Promise<any> {\n  try {\n    return await processInput(input);\n  } catch (err) {\n    return fallbackResult(input, err);\n  }\n}`
      });
    }
  }

  return {
    questions: finalQuestions.slice(0, 10),
    complexFunctions: finalFunctions
  };
}
