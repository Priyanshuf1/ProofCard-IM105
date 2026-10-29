import os
import re
import json
from typing import List, Dict, Any, Optional
import httpx
from backend.services.adversarial_defense import AdversarialDefensePipeline
from backend.services.ai_detector import AIDetector

class VivaEngine:
    """
    Dynamic Code Viva Generator & Conceptual Scoring Engine.
    Operates 100% offline deterministically when needed,
    or integrates with Gemini when an API key is present.
    """

    STOP_WORDS = {
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
        "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
        "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
        "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
        "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
        "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
        "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
        "at", "by", "for", "with", "about", "against", "between", "into", "through",
        "during", "before", "after", "above", "below", "to", "from", "up", "down",
        "in", "out", "on", "off", "over", "under", "again", "further", "then",
        "once", "here", "there", "when", "where", "why", "how", "all", "any",
        "both", "each", "few", "more", "most", "other", "some", "such", "no",
        "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s",
        "t", "can", "will", "just", "don", "should", "now", "also", "well", "like"
    }

    RAW_SYNONYMS = {
        "timeout": ["deadline", "abort", "cancel", "terminate", "disconnect", "hang"],
        "socket": ["tcp", "connection", "stream", "channel", "pipe", "descriptor"],
        "race": ["concurrency", "mutex", "lock", "atomic", "sync", "desynchronization", "debounce", "deadlock"],
        "pool": ["connectionpool", "starvation", "exhaust", "capacity", "buffer", "acquire", "release"],
        "backpressure": ["throttle", "queue", "overflow", "saturation", "limit", "slowdown", "drain", "semaphore"],
        "lora": ["low-rank", "rank", "fine-tuning", "finetuning", "adapter", "parameter", "weights"],
        "csi": ["wifi", "subcarrier", "rf", "antenna", "signal", "channel", "variance", "multipath"],
        "hash": ["sha256", "sha", "digest", "checksum", "integrity", "signature", "hmac", "tamper", "tampering", "hashes", "hashing"],
        "canonical": ["deterministic", "encoding", "bytes", "format", "reproducible", "canonicalize", "canonicalization", "determinism", "deterministically", "serialization"],
        "debounce": ["throttle", "lock", "guard", "flag", "state", "abortcontroller"],
        "isolation": ["sandbox", "modular", "boundary", "decouple", "trap", "isolate", "isolating", "fault", "tolerance", "layer"],
        "failure": ["fail", "error", "fault", "crash", "exception", "exceptions", "tolerance", "recovery"],
        "contract": ["contract", "partial", "success", "interface", "format", "schema"],
        "crash": ["process", "crash", "global", "handler", "bubble", "top-level", "terminate", "exit", "prevent", "unhandled"],
        "domain": ["domain", "command", "service", "layer", "module"],
        "idempotent": ["deduplication", "atomic", "unique", "safe", "idempotency", "idempotence"],
        "circuit": ["breaker", "tripped", "fallback", "degrade", "cascade", "resilience"],
        "telemetry": ["metrics", "logging", "tracing", "observability", "latency"],
        "validation": ["sanitize", "schema", "assert", "types", "defense", "boundary", "sanitization"],
        "comparison": ["constant-time", "hmac", "compare_digest", "timing", "side-channel", "fixed-time"],
        "normalization": ["crlf", "newline", "newlines", "linebreaks", "whitespace", "posix", "windows", "cross-platform"]
    }

    TECH_VOCAB = {
        "concurrency", "async", "backpressure", "pool", "socket", "timeout", "retry",
        "idempotent", "idempotency", "race", "mutex", "lock", "atomic", "cache",
        "buffer", "memory", "starvation", "debounce", "abortcontroller", "semaphore",
        "subcarrier", "variance", "multipath", "canonical", "normalization",
        "deterministic", "determinism", "lora", "gradient", "tradeoff", "payload", "latency",
        "streaming", "pipeline", "integrity", "cryptographic", "sha256", "hmac",
        "schema", "validation", "boundary", "mock", "fixture", "assertion",
        "deadlock", "crlf", "newline", "endianness", "serialization", "deserialization",
        "digest", "byte", "bytes", "timing", "constant-time", "tamper", "tampering",
        "hashing", "hashes", "side-channel", "attack"
    }

    # Precompute bidirectional synonym clusters
    CLUSTER_MAP: Dict[str, set] = {}
    for _k, _syns in RAW_SYNONYMS.items():
        _group = set([_k] + _syns)
        for _w in _group:
            CLUSTER_MAP.setdefault(_w, set()).update(_group)

    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY")

    @classmethod
    def _is_non_answer(cls, text: str) -> bool:
        """Detect common evasions, non-answers, memes, lyrics, and jokes."""
        clean = text.strip().lower()
        if not clean:
            return True

        evasions = [
            "i am groot", "i'm groot", "iam groot", "we are groot", "groot",
            "idk", "i dont know", "i don't know", "dont know", "don't know", "do not know",
            "no idea", "have no idea", "not sure", "no clue", "dunno", "skip", "pass",
            "none", "nothing", "na", "n/a", "no", "yes", "maybe", "nil", "zero",
            "i am batman", "batman", "superman", "iron man", "avengers",
            "never gonna give you up", "never gonna let you down", "rick roll", "rickroll",
            "lorem ipsum", "dolor sit amet",
            "hello world", "asdf", "test", "testing", "blah blah", "bla bla", "yolo",
            "why did the chicken cross the road", "haha", "lol", "lmao", "rofl", "hehe",
            "can't answer", "cant answer", "who knows", "whatever", "random answer", "no answer",
            "just give me marks", "give me points", "please pass me", "give me score", "ok"
        ]

        if clean in evasions:
            return True

        evasive_prefixes = [
            "i am groot", "i don't know", "i dont know", "no idea", "not sure",
            "never gonna give you up", "lorem ipsum", "why did the chicken"
        ]
        if any(clean.startswith(p) for p in evasive_prefixes):
            return True

        tokens = [w for w in re.findall(r"[a-z0-9]+", clean) if w not in cls.STOP_WORDS]
        if len(tokens) <= 2:
            has_tech = any(t in cls.TECH_VOCAB for t in tokens)
            if not has_tech:
                return True

        return False

    @staticmethod
    def _is_gibberish(text: str) -> bool:
        """Detect random typing, keyboard mashing, or nonsensical gibberish like 'jdv hbehbe'."""
        text_clean = text.strip().lower()
        if not text_clean or len(text_clean) < 4:
            return True

        words = re.findall(r"[a-z]+", text_clean)
        if not words:
            return True

        if re.search(r"(.)\1{3,}", text_clean):
            return True

        if any(re.search(r"([a-z]{3})\1", w) for w in words):
            return True

        keyboard_runs = ["asdf", "sdfg", "dfgh", "fghj", "ghjk", "hjkl", "qwerty", "zxcv", "xcvb", "cvbn", "vbnm"]
        if any(run in text_clean for run in keyboard_runs):
            return True

        if re.search(r"[bcdfghjklmnpqrstvwxz]{6,}", text_clean):
            return True

        vowels = sum(1 for c in text_clean if c in "aeiouy")
        letters = sum(1 for c in text_clean if c.isalpha())
        if letters > 8 and (vowels / letters < 0.12 or vowels / letters > 0.88):
            return True

        tech_acronyms = {"tcp", "dns", "sql", "ast", "api", "jwt", "url", "css", "dom", "npm", "loc", "cli", "tls", "ssl", "cpu", "gpu", "ssh"}
        vowelless = [w for w in words if len(w) >= 3 and not any(v in w for v in "aeiouy") and w not in tech_acronyms]
        if vowelless and (len(vowelless) / len(words) >= 0.5 or (len(words) <= 2 and len(vowelless) >= 1)):
            return True

        if len(words) >= 3 and len(set(words)) / len(words) <= 0.4:
            return True

        if len(words) >= 4 and sum(1 for w in words if len(w) <= 2) / len(words) >= 0.7:
            return True

        return False

    @classmethod
    def _is_buzzword_stuffing(cls, text: str, tech_vocab_matches: set, total_words: int) -> bool:
        """
        Detects adversarial attempts to game scoring by chaining disconnected
        technical buzzwords without explanatory sentence structure or verbs.
        """
        if total_words < 4:
            return False

        clean = text.lower().strip()
        tokens = re.findall(r"[a-z0-9]+", clean)
        if not tokens:
            return False

        vocab_ratio = len(tech_vocab_matches) / max(len(tokens), 1)

        explanatory_verbs = {
            "use", "uses", "using", "used", "prevent", "prevents", "preventing", "prevented",
            "ensure", "ensures", "ensuring", "ensured", "handle", "handles", "handling", "handled",
            "wrap", "wraps", "wrapping", "wrapped", "isolate", "isolates", "isolating", "isolated",
            "cancel", "cancels", "cancelling", "canceled", "invoke", "invokes", "invoking", "invoked",
            "dispatch", "dispatches", "dispatching", "execute", "executes", "executing", "executed",
            "mitigate", "mitigates", "mitigating", "mitigated", "guarantee", "guarantees", "guaranteeing",
            "rely", "relies", "relying", "check", "checks", "checking", "checked",
            "drop", "drops", "dropping", "throttle", "throttles", "throttling", "flush", "flushes"
        }
        verb_matches = [w for w in tokens if w in explanatory_verbs]

        if vocab_ratio >= 0.45 and len(verb_matches) == 0 and len(tokens) >= 5:
            return True

        connectives = {"to", "by", "for", "with", "in", "when", "if", "after", "before", "so", "that"}
        conn_matches = [w for w in tokens if w in connectives]
        if vocab_ratio >= 0.55 and len(conn_matches) <= 1 and len(verb_matches) <= 1 and len(tokens) >= 7:
            return True

        return False

    @staticmethod
    def _stem(word: str) -> str:
        """Strip standard English inflectional and derivational suffixes with strict min length."""
        w = word.lower().strip()
        if len(w) <= 4:
            return w
        suffixes = [
            "izations", "ization", "isations", "isation", "abilities", "ability",
            "ically", "atically", "ational", "tions", "tion", "ments", "ment",
            "ances", "ences", "ance", "ence", "izing", "ising", "ized", "ised",
            "ative", "atory", "ingly", "able", "ible", "ness", "ally", "ize", "ise",
            "ing", "ies", "ied", "ed", "es", "ly", "ic", "s"
        ]
        for s in suffixes:
            if w.endswith(s) and (len(w) - len(s)) >= 4:
                return w[:-len(s)]
        return w

    def generate_questions_for_functions(self, complex_functions: List[Dict[str, Any]], max_questions: int = 3) -> List[Dict[str, Any]]:
        """
        Takes complex functions extracted by AST analyzer and produces
        up to max_questions targeted technical questions probing author ownership.
        Defaults to 3 for standard viva, or expands to 5/10 upon interviewer request.
        """
        if not complex_functions:
            # Never manufacture a question about code that was not retrieved.
            # A synthetic ``handler`` made unavailable scans look verified and
            # directly undermined the ownership check this module is meant to
            # perform.
            return []

        questions = []
        target_count = max(3, min(10, max_questions))
        for idx, func in enumerate(complex_functions[:target_count]):
            q_id = f"viva_q_{idx + 1}"
            fname = func.get("function_name", f"function_{idx+1}")
            fpath = func.get("file", "source_file")
            lineno = func.get("line_number", 1)
            raw_snippet = func.get("snippet", "")
            snippet = AdversarialDefensePipeline.sanitize_untrusted_text(raw_snippet)

            text_corpus = f"{fname} {fpath} {snippet}".lower()

            is_crypto_audit = any(k in text_corpus for k in ["pipeline_hash", "audit_codebase", "tamper", "sha256", "hmac", "canonical", "compute_pipeline_hash"]) or ("verify" in fname and "hash" in text_corpus)
            is_signal_or_radar = any(k in text_corpus for k in ["csi", "radar", "sensor", "subcarrier", "signal", "packet", "vital", "amplitude", "phase", "rf", "antenna", "frame_to_csi"])
            is_ml_lora = (
                any(k in text_corpus for k in ["lora", "cogpose", "checkpoint", "cog_calibrate", "optimizer", "gradient_descent", "backprop"])
                or (fname in ["fit", "infer"] and "calibrate" in text_corpus)
                or ("forward(self" in snippet or "def forward(" in snippet)
            )

            is_api_file = any(p in fpath.lower().replace("\\", "/").split("/") for p in ["api", "server", "routes", "controllers"]) or fpath.startswith("api")
            is_react_ui = (
                not is_api_file
                and (
                    any(p in fpath.lower() for p in ["component", "page", "view", "src/app", "src/components"])
                    or (fname.startswith("handle") and fname != "handler")
                    or any(k in snippet for k in ["useState", "useEffect", "e.preventDefault", "isResolving", "setState"])
                )
            )
            is_serverless_proxy = (
                not is_react_ui
                and not is_crypto_audit
                and (
                    is_api_file
                    or any(k in text_corpus for k in ["vercelrequest", "rapidapi", "https.request", "res.status", "req.method", "proxy", "proxyreq", ".pipe(res)"])
                )
            )
            is_concurrency_or_broker = any(k in text_corpus for k in ["semaphore", "circuit", "xadd", "dlq", "dead_letter", "backpressure"])
            has_storage = any(db in text_corpus for db in ["mongo", "redis", "postgresql", "query", "schema", "pool.acquire", "conn.execute"])
            is_async = "async" in snippet or "await" in snippet or "promise" in text_corpus
            has_error_handling = "try" in snippet or "catch" in snippet or "except" in snippet
            has_loops = "for " in snippet or "while " in snippet or "map(" in snippet or "foreach" in text_corpus

            if is_crypto_audit:
                q_text = f"In cryptographic routine '{fname}' ({fpath}:{lineno}), how do you ensure the computed verification hash is deterministic across platforms and resistant to state tampering?"
                expected = ["Deterministic byte canonicalization", "Constant-time comparison", "Tamper-evident verification", "Cross-platform newline normalization"]
                difficulty = "hard"
            elif is_signal_or_radar:
                q_text = f"In signal processing function '{fname}' ({fpath}:{lineno}), how do you filter high-frequency environmental noise and calibrate phase drift across antenna subcarriers?"
                expected = ["Multipath noise filtering", "Antenna phase calibration", "Subcarrier variance normalization", "Signal-to-noise ratio"]
                difficulty = "hard"
            elif is_ml_lora:
                q_text = f"In model routine '{fname}' ({fpath}:{lineno}), how do you configure low-rank adaptation (LoRA) rank and learning rate parameters to prevent catastrophic forgetting while tuning weights?"
                expected = ["Low-rank adaptation rank tradeoff", "Catastrophic forgetting mitigation", "Gradient stability", "Weight parameter isolation"]
                difficulty = "hard"
            elif is_react_ui and is_async:
                q_text = f"In asynchronous UI handler '{fname}' ({fpath}:{lineno}), how do you guard against race conditions and UI state desynchronization if multiple user queries execute concurrently?"
                expected = ["Concurrency debounce / locks", "Request cancellation (AbortController)", "Defensive state isolation", "Idempotent state updates"]
                difficulty = "hard"
            elif is_react_ui:
                q_text = f"In component handler '{fname}' ({fpath}:{lineno}), what validation ensures input sanitization and defensive boundary isolation before state dispatch?"
                expected = ["Input sanitization", "URI component encoding", "Defensive state dispatch", "Boundary isolation"]
                difficulty = "medium"
            elif is_serverless_proxy:
                q_text = f"In serverless proxy handler '{fname}' ({fpath}:{lineno}), how do you mitigate upstream service timeouts and ensure external proxy sockets are cleanly terminated on network dropouts?"
                expected = ["Upstream timeout mitigation", "Socket cleanup and error handling", "Serverless lifecycle bounds", "Streaming backpressure"]
                difficulty = "hard"
            elif is_concurrency_or_broker:
                q_text = f"In concurrency routine '{fname}' ({fpath}:{lineno}), how do you manage worker backpressure and avoid deadlocks when upstream queues surge?"
                expected = ["Semaphore backpressure throttling", "Deadlock avoidance", "Exponential backoff retry", "Buffer overflow protection"]
                difficulty = "hard"
            elif is_async and has_storage:
                q_text = f"In function '{fname}' ({fpath}:{lineno}), what happens if the database connection pool is exhausted during peak concurrent async queries? How is backpressure mitigated?"
                expected = ["Connection pool starvation", "Async timeout propagation", "Queue backpressure / retry backoff"]
                difficulty = "hard"
            elif has_error_handling:
                q_text = f"In '{fname}' ({fpath}:{lineno}), why did you catch and isolate exceptions at this layer rather than allowing them to propagate to top-level handlers?"
                expected = ["Domain-specific failure isolation", "Clean error contract", "Preventing process crash / memory leak"]
                difficulty = "medium"
            elif has_loops:
                q_text = f"In function '{fname}' ({fpath}:{lineno}), what is the algorithmic time and space complexity of your data processing loop under high input scale?"
                expected = ["Big-O time complexity", "Memory allocation / buffer overhead", "Stream vs batch processing"]
                difficulty = "medium"
            elif is_async:
                q_text = f"In function '{fname}' ({fpath}:{lineno}), what ensures race conditions and unhandled promise rejections do not occur during concurrent invocations?"
                expected = ["Atomic operations / locks", "Idempotency", "Stateless request lifecycles"]
                difficulty = "hard"
            else:
                q_text = f"In '{fname}' ({fpath}:{lineno}), what were the primary architectural trade-offs you made when structuring this logic?"
                expected = ["Modularity vs cohesion", "Separation of concerns", "Testability and mocking"]
                difficulty = "easy"

            questions.append({
                "question_id": q_id,
                "function_name": fname,
                "file": fpath,
                "line_number": lineno,
                "question": q_text,
                "expected_concepts": expected,
                "difficulty": difficulty
            })

        primary = complex_functions[0]
        p_name = primary.get("function_name", "main_routine")
        p_file = primary.get("file", "project_root")

        probe_templates = [
            ("State isolation and error handling", f"How do you ensure state isolation and deterministic failure recovery when '{p_name}' encounters unhandled runtime rejections?", ["State isolation", "Unhandled rejection traps", "Graceful degradation"]),
            ("Automated unit test coverage", f"If you were writing automated unit tests for '{p_name}', what specific boundary conditions and mock fixtures would you test?", ["Boundary condition testing", "Mocking external I/O", "Assertion coverage"]),
            ("Concurrency and async backpressure", f"In a high-throughput production environment, how does '{p_name}' mitigate connection starvation and queue backpressure?", ["Async backpressure", "Queue saturation limits", "Connection pooling"]),
            ("Data validation and schema defense", f"How do you defend '{p_name}' against malformed inputs or untrusted external API payloads?", ["Defensive schema validation", "Payload sanitization", "Type safety assertions"]),
            ("Memory footprint and resource release", f"What mechanisms are in place within '{p_name}' to prevent memory leaks or socket descriptor exhaustion over prolonged execution?", ["Deterministic cleanup", "Descriptor deallocation", "Garbage collection optimization"]),
            ("Idempotency and failure recovery", f"If a network glitch causes '{p_name}' to execute duplicate invocations, how is idempotency guaranteed to prevent duplicate state writes?", ["Idempotent operations", "Deduplication keys", "Atomic commits"]),
            ("Circuit breaker and timeout cascades", f"When external downstream dependencies fail or lag during '{p_name}', how do you prevent cascading thread starvation?", ["Circuit breaker pattern", "Timeout deadlines", "Fallback degradation"]),
            ("Observability and telemetry logging", f"What structured logging or telemetry metrics would you emit from '{p_name}' to diagnose production degradation in real-time?", ["Structured telemetry", "Correlation IDs", "Latency percentile metrics"]),
            ("Zero-trust security and privilege boundary", f"How does '{p_name}' adhere to zero-trust privilege minimization when executing with sensitive resources?", ["Least privilege principle", "Credential sanitization", "Boundary isolation"]),
            ("Horizontal scalability and state sharing", f"If '{p_name}' must scale across 10 distributed nodes, how is state partitioned to avoid synchronization bottlenecks?", ["Stateless architecture", "Distributed cache / Redis", "Partition sharding"])
        ]

        probe_idx = 0
        while len(questions) < target_count:
            q_num = len(questions) + 1
            tpl_title, tpl_q, tpl_concepts = probe_templates[probe_idx % len(probe_templates)]
            probe_idx += 1
            questions.append({
                "question_id": f"viva_q_{q_num}",
                "function_name": p_name,
                "file": p_file,
                "line_number": primary.get("line_number", 1),
                "question": tpl_q,
                "expected_concepts": tpl_concepts,
                "difficulty": "medium"
            })

        return questions

    def _evaluate_with_gemini(
        self,
        question_text: str,
        expected_concepts: List[str],
        candidate_answer: str,
        api_key: str
    ) -> Optional[Dict[str, Any]]:
        """
        Calls Gemini API with strict 3.0s timeout to evaluate answer.
        Returns None on any network failure, invalid key, or malformed response.
        """
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
            prompt = (
                "You are an expert technical interviewer evaluating a software engineering candidate's code defense viva.\n"
                f"Question: {question_text}\n"
                f"Expected Concepts: {json.dumps(expected_concepts)}\n"
                f"Candidate Answer:\n{AdversarialDefensePipeline.wrap_untrusted_answer(candidate_answer)}\n\n"
                "Strict Placement Grading Rubric:\n"
                "- 0: Non-answers, jokes, evasions ('idk', 'I am Groot'), gibberish, or 0 concepts demonstrated.\n"
                "- 1-3: Weak/buzzword-only answer with no mechanism explanation.\n"
                "- 4-5: Borderline answer, shallow coverage without architectural depth.\n"
                "- 6-7: Competent pass, explains mechanics with cause-and-effect reasoning.\n"
                "- 8-10: Exemplary deep rationale, handles edge cases, trade-offs, and security/concurrency.\n\n"
                "Return raw JSON with exactly these keys: "
                "{\"score\": int (0-10), \"concepts_demonstrated\": list of str, \"concepts_missing\": list of str, \"feedback\": str, \"passed\": bool}"
            )
            payload = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {
                    "temperature": 0.1,
                    "response_mime_type": "application/json"
                }
            }
            with httpx.Client(timeout=3.0) as client:
                resp = client.post(url, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    res = json.loads(text)
                    is_valid, schema_err = AdversarialDefensePipeline.validate_llm_json_schema(res)
                    if not is_valid:
                        return None
                    score = int(res.get("score", 0))
                    score = max(0, min(10, score))
                    return {
                        "score": score,
                        "concepts_demonstrated": res.get("concepts_demonstrated", []),
                        "concepts_missing": res.get("concepts_missing", expected_concepts),
                        "feedback": res.get("feedback", f"Gemini Evaluation: {score}/10"),
                        "passed": score >= 6,
                        "evaluator": "gemini-1.5-flash"
                    }
        except Exception:
            return None
        return None

    def evaluate_answer(
        self,
        question_text: str,
        expected_concepts: List[str],
        candidate_answer: str,
        gemini_api_key: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Evaluates candidate answer on conceptual mastery using campus placement standards.
        Strictly returns 0 for empty, evasive, non-answers, or gibberish.
        Uses exact token and verified technical stem matching with zero substring leakage.
        Includes Adversarial Prompt Injection Defense and AI Text Pattern Analysis.
        """
        # Step 0: Adversarial Prompt Injection Defense
        is_injection, _ = AdversarialDefensePipeline.detect_prompt_injection(candidate_answer)
        clean_input = AdversarialDefensePipeline.sanitize_untrusted_text(candidate_answer)
        ans_clean = clean_input.lower().strip()

        # Run AI text pattern detector on the answer
        ai_detection = AIDetector().detect(clean_input)

        # Step 1: Detect non-answers, evasions, memes, jokes, and gibberish
        if not ans_clean or self._is_non_answer(ans_clean) or self._is_gibberish(ans_clean):
            return {
                "score": 0,
                "concepts_demonstrated": [],
                "concepts_missing": expected_concepts,
                "feedback": "Response is empty, non-answer, joke, or unparseable gibberish. Zero technical concepts demonstrated (Score: 0/10).",
                "passed": False,
                "ai_detection": ai_detection,
                "adversarial_injection_detected": is_injection
            }

        # Step 2: Attempt Gemini API evaluation if key is available
        active_key = gemini_api_key or self.gemini_key or os.getenv("GEMINI_API_KEY")
        if active_key:
            gemini_eval = self._evaluate_with_gemini(question_text, expected_concepts, clean_input, active_key)
            if gemini_eval is not None:
                if ai_detection.get("classification") == "ai_like":
                    gemini_eval["score"] = max(0, min(gemini_eval["score"], 3))
                    gemini_eval["passed"] = False
                    gemini_eval["feedback"] += f" [AI Pattern Detected ({int((ai_detection.get('ai_probability') or 0.8) * 100)}% prob) - Score penalized]."
                gemini_eval["ai_detection"] = ai_detection
                gemini_eval["adversarial_injection_detected"] = is_injection
                return gemini_eval

        # Step 3: Hardened Deterministic Evaluation Engine
        ans_normalized = ans_clean.replace("-", " ")
        all_raw_tokens = re.findall(r"[a-z0-9]+", ans_clean)
        
        # Candidate content words excluding stop words and short noise
        ans_tokens = [w for w in all_raw_tokens if w not in self.STOP_WORDS and len(w) >= 3]
        ans_token_set = set(ans_tokens)
        ans_stem_set = {self._stem(w) for w in ans_tokens if len(w) >= 4}

        demonstrated = []
        missing = []
        consumed_tokens = set()

        for concept in expected_concepts:
            concept_clean = concept.lower().replace("-", " ")
            
            # Check for direct phrase match in normalized text
            if concept_clean in ans_normalized:
                demonstrated.append(concept)
                continue

            concept_raw = re.findall(r"[a-z0-9]+", concept.lower())
            concept_keywords = [w for w in concept_raw if w not in self.STOP_WORDS and len(w) >= 3]
            match_found = False

            for cw in concept_keywords:
                cw_stem = self._stem(cw)

                # 1. Exact token match (unconsumed token)
                avail_tokens = [w for w in ans_tokens if w not in consumed_tokens]
                if cw in avail_tokens:
                    consumed_tokens.add(cw)
                    match_found = True
                    break

                # 2. Strict stem match (only if stem has >= 4 chars)
                if len(cw_stem) >= 4:
                    stem_matches = [w for w in avail_tokens if len(w) >= 4 and self._stem(w) == cw_stem]
                    if stem_matches:
                        consumed_tokens.add(stem_matches[0])
                        match_found = True
                        break

                # 3. Bidirectional cluster synonym match (NO substring matching!)
                synonyms = self.CLUSTER_MAP.get(cw, set())
                matched_syn = None
                for syn in synonyms:
                    syn_stem = self._stem(syn)
                    for w in avail_tokens:
                        if w == syn or (len(w) >= 4 and len(syn_stem) >= 4 and self._stem(w) == syn_stem):
                            matched_syn = w
                            break
                    if matched_syn:
                        break
                if matched_syn:
                    consumed_tokens.add(matched_syn)
                    match_found = True
                    break

            if match_found:
                demonstrated.append(concept)
            else:
                missing.append(concept)

        # Count recognized technical vocabulary words
        matched_vocab = set()
        for tv in self.TECH_VOCAB:
            if tv in ans_token_set or (len(tv) >= 4 and self._stem(tv) in ans_stem_set):
                matched_vocab.add(tv)

        # Non-demonstrated -> absolute 0
        if len(demonstrated) == 0:
            top_missing = missing[:2] or expected_concepts[:2]
            return {
                "score": 0,
                "concepts_demonstrated": [],
                "concepts_missing": expected_concepts,
                "feedback": f"Did not address any required technical concepts: {', '.join(top_missing)} (Score: 0/10).",
                "passed": False,
                "ai_detection": ai_detection,
                "adversarial_injection_detected": is_injection
            }

        # Step 3b: Adversarial Buzzword Stuffing Detection
        if self._is_buzzword_stuffing(ans_clean, matched_vocab, len(all_raw_tokens)):
            return {
                "score": 2,
                "concepts_demonstrated": list(matched_vocab)[:2],
                "concepts_missing": expected_concepts,
                "feedback": "Answer flagged as disconnected keyword stuffing. Merely listing technical terms without explanatory sentence structure or mechanisms earns no placement credit (Score: 2/10).",
                "passed": False,
                "ai_detection": ai_detection,
                "adversarial_injection_detected": is_injection
            }

        # Step 4: Calibrated Placement Rubric
        n_dem = len(demonstrated)
        n_exp = max(len(expected_concepts), 1)
        ratio = n_dem / n_exp

        rationale_keywords = [
            "because", "in order to", "to ensure", "ensure", "ensuring", "ensures",
            "prevent", "prevents", "preventing", "mitigate", "mitigates", "mitigating",
            "tradeoff", "trade-off", "rather than", "instead of",
            "guarantee", "guarantees", "guaranteeing", "eliminates", "reproducible", "constant-time"
        ]
        has_rationale = any(rk in ans_clean for rk in rationale_keywords)
        vocab_count = len(matched_vocab)
        token_count = len(ans_tokens)

        if n_dem == 1:
            raw_score = 2 + (1 if has_rationale and token_count >= 8 else 0)
            final_score = min(3, max(1, raw_score))
        elif n_dem == 2:
            raw_score = 4 + (1 if has_rationale else 0) + (1 if vocab_count >= 2 else 0) + (1 if ratio >= 0.65 and has_rationale and vocab_count >= 2 else 0)
            final_score = min(7, max(4, raw_score))
        elif n_dem == 3 and ratio < 1.0:
            raw_score = 6 + (1 if has_rationale else 0) + (1 if vocab_count >= 2 else 0)
            final_score = min(8, max(6, raw_score))
        else:  # n_dem >= 4 or (ratio == 1.0 and n_dem >= 3)
            raw_score = 8 + (1 if has_rationale else 0) + (1 if vocab_count >= 3 else 0)
            final_score = min(10, max(8, raw_score))

        passed = final_score >= 6

        if final_score >= 8:
            top_demonstrated = demonstrated[:3]
            feedback = f"Exemplary architectural rationale. Thoroughly demonstrated: {', '.join(top_demonstrated)} (Score: {final_score}/10)."
        elif passed:
            top_demonstrated = demonstrated[:2]
            feedback = f"Solid technical competence. Demonstrated command of: {', '.join(top_demonstrated)} (Score: {final_score}/10)."
        elif final_score >= 4:
            top_missing = missing[:2] or expected_concepts[:2]
            feedback = f"Borderline response. Mentioned baseline concepts but lacked depth on: {', '.join(top_missing)} (Score: {final_score}/10)."
        else:
            top_missing = missing[:2] or expected_concepts[:2]
            feedback = f"Weak buzzword response without architectural mechanism. Missing: {', '.join(top_missing)} (Score: {final_score}/10)."

        # Apply AI penalty if AI pattern is detected
        if ai_detection.get("classification") == "ai_like":
            final_score = max(0, min(final_score, 3))
            passed = False
            feedback += f" [AI Pattern Detected ({int((ai_detection.get('ai_probability') or 0.8) * 100)}% prob) - Score penalized]."

        return {
            "score": final_score,
            "concepts_demonstrated": demonstrated,
            "concepts_missing": missing,
            "feedback": feedback,
            "passed": passed,
            "ai_detection": ai_detection,
            "adversarial_injection_detected": is_injection
        }
