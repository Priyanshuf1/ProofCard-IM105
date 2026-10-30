"""
backend/services/live_site_inspector.py
Live Website Inspector for ProofCard (IM-105).
Performs asynchronous HTTP/SSL validation, load latency measurement,
semantic HTML DOM parsing, viewport detection, and a11y auditing.
"""

import time
import httpx
from html.parser import HTMLParser
from typing import Dict, Any, List, Set, Optional


class SemanticDOMParser(HTMLParser):
    """Parses HTML DOM for viewport meta, semantic elements, and accessibility signals."""

    SEMANTIC_TAGS = {"header", "nav", "main", "footer", "section", "article", "aside", "figure", "h1", "h2", "h3"}

    def __init__(self):
        super().__init__()
        self.viewport_meta_detected: bool = False
        self.semantic_elements: Set[str] = set()
        self.has_title: bool = False
        self.has_lang: bool = False
        self.total_images: int = 0
        self.images_with_alt: int = 0
        self.in_title: bool = False

    def handle_starttag(self, tag: str, attrs: List[tuple]):
        tag_lower = tag.lower()
        if tag_lower in self.SEMANTIC_TAGS:
            self.semantic_elements.add(tag_lower)

        attr_dict = {k.lower(): (v or "") for k, v in attrs}

        if tag_lower == "html" and "lang" in attr_dict:
            self.has_lang = True

        if tag_lower == "meta":
            if attr_dict.get("name", "").lower() == "viewport":
                self.viewport_meta_detected = True

        if tag_lower == "title":
            self.in_title = True

        if tag_lower == "img":
            self.total_images += 1
            if "alt" in attr_dict and attr_dict["alt"].strip():
                self.images_with_alt += 1

    def handle_endtag(self, tag: str):
        if tag.lower() == "title":
            self.in_title = False

    def handle_data(self, data: str):
        if self.in_title and data.strip():
            self.has_title = True


class LiveSiteInspector:
    """Audits live candidate web deployment URLs."""

    @classmethod
    async def audit_url(cls, url: str, timeout: float = 8.0) -> Dict[str, Any]:
        """
        Inspects live deployment URL for HTTP status, SSL, latency, semantic DOM, and mobile viewport.
        Handles DNS errors, timeouts, and server errors gracefully.
        """
        clean_url = url.strip()
        if not clean_url.startswith(("http://", "https://")):
            clean_url = f"https://{clean_url}"

        start_time = time.perf_counter()
        http_status = 0
        is_live = False
        ssl_valid = False
        latency_ms = 0.0
        html_content = ""

        try:
            async with httpx.AsyncClient(timeout=timeout, follow_redirects=True, verify=True) as client:
                res = await client.get(clean_url)
                latency_ms = round((time.perf_counter() - start_time) * 1000, 1)
                http_status = res.status_code
                is_live = 200 <= http_status < 400
                ssl_valid = clean_url.startswith("https://")
                html_content = res.text

        except httpx.HTTPStatusError as status_err:
            latency_ms = round((time.perf_counter() - start_time) * 1000, 1)
            http_status = status_err.response.status_code
            is_live = False
            ssl_valid = clean_url.startswith("https://")

        except (httpx.ConnectError, httpx.ConnectTimeout, httpx.TimeoutException, httpx.RequestError) as exc:
            # If SSL certificate error, try again without SSL verification to diagnose
            if "certificate" in str(exc).lower() or "ssl" in str(exc).lower():
                try:
                    async with httpx.AsyncClient(timeout=timeout, follow_redirects=True, verify=False) as client:
                        res = await client.get(clean_url)
                        latency_ms = round((time.perf_counter() - start_time) * 1000, 1)
                        http_status = res.status_code
                        is_live = 200 <= http_status < 400
                        ssl_valid = False  # SSL failed verification
                        html_content = res.text
                except Exception:
                    http_status = 0
                    is_live = False
                    ssl_valid = False
            else:
                http_status = 0
                is_live = False
                ssl_valid = False

        except Exception:
            http_status = 0
            is_live = False
            ssl_valid = False

        # Parse DOM if HTML content was received
        parser = SemanticDOMParser()
        if html_content:
            try:
                parser.feed(html_content[:500_000])  # limit to 500KB
            except Exception:
                pass

        semantic_elements = sorted(list(parser.semantic_elements))
        viewport_detected = parser.viewport_meta_detected

        # Calculate a11y score
        a11y_pts = 0.0
        if parser.has_title:
            a11y_pts += 0.4
        if parser.has_lang:
            a11y_pts += 0.3
        if parser.total_images == 0 or (parser.images_with_alt / max(parser.total_images, 1)) >= 0.5:
            a11y_pts += 0.3
        a11y_score = round(a11y_pts, 2)

        # Calculate Category E Total Score out of 10.0
        if not is_live:
            total_score = 0.0
            feedback = f"Website is unreachable or returned HTTP {http_status}."
        else:
            score = 0.0
            # E1: HTTP Status & SSL (3 Marks)
            score += 2.0 if http_status == 200 else 1.5
            score += 1.0 if ssl_valid else 0.0

            # E2: Latency (2 Marks)
            if latency_ms < 800:
                score += 2.0
            elif latency_ms < 2000:
                score += 1.5
            else:
                score += 1.0

            # E3: Semantic HTML (2 Marks)
            if len(semantic_elements) >= 3:
                score += 2.0
            elif len(semantic_elements) >= 1:
                score += 1.0

            # E4: Viewport (2 Marks)
            if viewport_detected:
                score += 2.0

            # E5: a11y (1 Mark)
            score += round(a11y_score * 1.0, 1)

            total_score = round(min(10.0, score), 1)
            feedback = f"Live site verified: HTTP {http_status}, latency {latency_ms}ms, {len(semantic_elements)} semantic elements detected."

        return {
            "url": clean_url,
            "http_status": http_status,
            "is_live": is_live,
            "ssl_valid": ssl_valid,
            "latency_ms": latency_ms,
            "viewport_meta_detected": viewport_detected,
            "semantic_elements_found": semantic_elements,
            "a11y_score": a11y_score,
            "total": total_score,
            "feedback": feedback,
        }
