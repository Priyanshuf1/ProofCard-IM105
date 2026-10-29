"""
Adversarial Prompt Injection Defense & Sanitization Pipeline.
Protects LLM viva generators and evaluation engines against prompt injection,
HTML/Markdown comment payloads, system directive overrides, and hallucinated line citations.
"""

import re
import html
from typing import Dict, Any, List, Tuple, Optional


class AdversarialDefensePipeline:
    """
    AppSec Sanitization & Boundary Defense Pipeline.
    1. Strips HTML/Markdown comments (<!-- ... -->) and code comment blocks.
    2. Detects and neutralizes prompt injection patterns (system prompt overrides, jailbreaks).
    3. Encloses untrusted candidate code and answers in strict XML boundaries.
    4. Enforces strict JSON Schema validation on LLM output.
    5. Validates cited code line numbers against real repository files.
    """

    # Common prompt injection signatures used in README.md, code comments, or viva answers
    INJECTION_PATTERNS = [
        # Explicit system prompt / instruction overrides
        r"(?i)<\!--\s*system\s*prompt[\s\S]*?-->",
        r"(?i)<\!--[\s\S]*?ignore\s+all\s+(?:previous|prior)[\s\S]*?-->",
        r"(?i)\b(?:system\s*prompt\s*:?|system\s*instruction\s*:?)",
        r"(?i)\bignore\s+(?:all\s+)?(?:previous|prior|above)\s+instructions?\b",
        r"(?i)\bdisregard\s+(?:all\s+)?(?:previous|prior|above)\s+(?:instructions?|rules?|prompts?)\b",
        r"(?i)\byou\s+are\s+now\s+(?:in\s+developer\s+mode|dan|an\s+unrestricted\s+ai)\b",
        r"(?i)\bassign\s+(?:100%|full|maximum)\s+(?:confidence|score|marks|grade)\b",
        r"(?i)\bgive\s+(?:this\s+candidate\s+)?(?:10\s*\/\s*10|100%|maximum\s+score|full\s+marks)\b",
        r"(?i)\byou\s+must\s+score\s+(?:10|100)\b",
        r"(?i)\boverride\s+(?:all\s+)?(?:grading\s+rubrics?|instructions?|system\s+directives?)\b",
        r"(?i)\bjailbreak\b",
        r"(?i)\bdo\s+anything\s+now\b",
        # Expanded indirect prompt injection signatures in comments, docstrings, READMEs
        r"(?i)\[(?:SYSTEM\s+NOTE|AI_EVALUATION_DIRECTIVE|CRITICAL\s+INSTRUCTION)[\s\S]*?\]",
        r"(?i)\b(?:note\s+to\s+ai\s+(?:grader|agent|reviewer|model)|instruction\s+for\s+ai\s+agents?)\b",
        r"(?i)\b(?:give|assign|award)\s+(?:this\s+candidate\s+|this\s+module\s+|this\s+repository\s+)?(?:\d+\s*(?:out\s+of|\/)\s*\d+|maximum\s+score|full\s+marks)\b",
        r"(?i)\bbypass\s+(?:standard|verification)?\s*checks\b",
        r"(?i)\bautomatic\s+bypass\s+applied\b"
    ]

    # Zero-width unicode characters used to bypass keyword filters
    ZERO_WIDTH_CHARS = [
        "\u200b",  # zero-width space
        "\u200c",  # zero-width non-joiner
        "\u200d",  # zero-width joiner
        "\ufeff",  # zero-width no-break space (BOM)
        "\u200e",  # left-to-right mark
        "\u200f",  # right-to-left mark
        "\u2060",  # word joiner
    ]

    @classmethod
    def strip_zero_width_chars(cls, text: str) -> str:
        """Removes stealth zero-width and invisible formatting characters."""
        if not text:
            return ""
        clean = text
        for zw in cls.ZERO_WIDTH_CHARS:
            clean = clean.replace(zw, "")
        return clean

    @classmethod
    def strip_html_and_markdown_comments(cls, text: str) -> str:
        """
        Strips all HTML/Markdown comment tags:
        <!-- comment -->
        """
        if not text:
            return ""
        clean = cls.strip_zero_width_chars(text)
        # Strip HTML/Markdown comments (including multi-line)
        clean = re.sub(r"<!--[\s\S]*?-->", "", clean)
        return clean

    @classmethod
    def detect_prompt_injection(cls, text: str) -> Tuple[bool, List[str]]:
        """
        Scans input for known prompt injection payloads and jailbreak attempts.
        Returns (is_injection_detected, matched_patterns).
        """
        if not text:
            return False, []

        clean = cls.strip_zero_width_chars(text)
        # Decode HTML entities if any
        clean_decoded = html.unescape(clean)

        matched = []
        for pat in cls.INJECTION_PATTERNS:
            if re.search(pat, clean_decoded):
                matched.append(pat)

        return len(matched) > 0, matched

    @classmethod
    def sanitize_untrusted_text(cls, text: str, placeholder: str = "[SANITIZED_PROMPT_INJECTION]") -> str:
        """
        Full sanitization pipeline:
        1. Strips zero-width characters.
        2. Strips HTML/Markdown comment tags (<!-- ... -->).
        3. Neutralizes adversarial prompt injection patterns.
        """
        if not text:
            return ""

        sanitized = cls.strip_html_and_markdown_comments(text)

        for pat in cls.INJECTION_PATTERNS:
            sanitized = re.sub(pat, placeholder, sanitized)

        return sanitized.strip()

    @classmethod
    def wrap_untrusted_code(
        cls,
        code: str,
        file_path: str = "snippet",
        line_start: int = 1,
        line_end: int = 1
    ) -> str:
        """
        Encloses repository snippets in strict XML data boundaries to prevent
        the LLM from interpreting candidate code as instructions.
        """
        sanitized_code = cls.sanitize_untrusted_text(code)
        safe_file = re.sub(r'[^\w\-./]', '_', str(file_path))
        return (
            f'<untrusted_candidate_code file="{safe_file}" start_line="{line_start}" end_line="{line_end}">\n'
            f'{sanitized_code}\n'
            f'</untrusted_candidate_code>'
        )

    @classmethod
    def wrap_untrusted_answer(cls, answer: str) -> str:
        """
        Encloses candidate viva answer in strict XML boundary.
        """
        sanitized_ans = cls.sanitize_untrusted_text(answer)
        return (
            f'<untrusted_candidate_answer>\n'
            f'{sanitized_ans}\n'
            f'</untrusted_candidate_answer>'
        )

    @classmethod
    def validate_llm_json_schema(cls, response_obj: Any) -> Tuple[bool, Optional[str]]:
        """
        Enforces strict JSON Schema validation on LLM output.
        Required Schema:
        {
            "score": int (0 to 10),
            "concepts_demonstrated": list[str],
            "concepts_missing": list[str],
            "feedback": str,
            "passed": bool
        }
        """
        if not isinstance(response_obj, dict):
            return False, "Response must be a JSON object (dictionary)."

        required_keys = {"score", "concepts_demonstrated", "concepts_missing", "feedback", "passed"}
        missing_keys = required_keys - set(response_obj.keys())
        if missing_keys:
            return False, f"Missing required schema keys: {sorted(list(missing_keys))}"

        score = response_obj.get("score")
        if not isinstance(score, int) or isinstance(score, bool):
            return False, f"'score' must be an integer, got {type(score).__name__}"
        if score < 0 or score > 10:
            return False, f"'score' must be between 0 and 10, got {score}"

        concepts_dem = response_obj.get("concepts_demonstrated")
        if not isinstance(concepts_dem, list):
            return False, f"'concepts_demonstrated' must be a list of strings, got {type(concepts_dem).__name__}"

        concepts_mis = response_obj.get("concepts_missing")
        if not isinstance(concepts_mis, list):
            return False, f"'concepts_missing' must be a list of strings, got {type(concepts_mis).__name__}"

        feedback = response_obj.get("feedback")
        if not isinstance(feedback, str) or not feedback.strip():
            return False, "'feedback' must be a non-empty string"

        passed = response_obj.get("passed")
        if not isinstance(passed, bool):
            return False, f"'passed' must be a boolean, got {type(passed).__name__}"

        return True, None

    @classmethod
    def validate_code_line_citation(
        cls,
        file_path: str,
        line_number: int,
        detected_files: Optional[List[str]] = None,
        file_line_counts: Optional[Dict[str, int]] = None
    ) -> bool:
        """
        Validates that a cited line number and file correspond to real, existing code files.
        Prevents hallucinated or injected file/line references.
        """
        if line_number < 1:
            return False

        if detected_files is not None and len(detected_files) > 0:
            # Normalize path comparison
            norm_path = file_path.replace("\\", "/").lower()
            matching = [f for f in detected_files if f.replace("\\", "/").lower() == norm_path or norm_path.endswith(f.replace("\\", "/").lower())]
            if not matching:
                return False

        if file_line_counts is not None and file_path in file_line_counts:
            max_lines = file_line_counts[file_path]
            if line_number > max_lines:
                return False

        return True
