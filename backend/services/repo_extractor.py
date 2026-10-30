"""
backend/services/repo_extractor.py
Extracts public Git repositories and live deployment URLs from resume text.
Supports GitHub, GitLab, Bitbucket, Codeberg, and modern cloud deployment domains.
"""

import re
from typing import Dict, List, Set


class RepoUrlExtractor:
    """Service to parse and canonicalize Git repositories and live deployment URLs."""

    GIT_DOMAINS = {"github.com", "gitlab.com", "bitbucket.org", "codeberg.org"}

    GIT_BLACKLIST_PATHS = {
        "login", "signup", "features", "pricing", "topics", "explore",
        "search", "pulls", "issues", "marketplace", "trending", "about",
        "contact", "security", "customer-stories", "enterprise",
    }

    LIVE_HOST_PATTERNS = [
        r"[a-zA-Z0-9_\-]+\.vercel\.app",
        r"[a-zA-Z0-9_\-]+\.netlify\.app",
        r"[a-zA-Z0-9_\-]+\.onrender\.com",
        r"[a-zA-Z0-9_\-]+\.render\.com",
        r"[a-zA-Z0-9_\-]+\.herokuapp\.com",
        r"[a-zA-Z0-9_\-]+\.github\.io",
        r"[a-zA-Z0-9_\-]+\.pages\.dev",
        r"[a-zA-Z0-9_\-]+\.web\.app",
        r"[a-zA-Z0-9_\-]+\.firebaseapp\.com",
        r"[a-zA-Z0-9_\-]+\.railway\.app",
        r"[a-zA-Z0-9_\-]+\.fly\.dev",
        r"[a-zA-Z0-9_\-]+\.surge\.sh",
        r"[a-zA-Z0-9_\-]+\.amplifyapp\.com",
    ]

    EXCLUDED_DOMAINS = {
        "linkedin.com", "youtube.com", "youtu.be", "medium.com", "twitter.com",
        "x.com", "facebook.com", "instagram.com", "coursera.org", "udemy.com",
        "stackoverflow.com", "pypi.org", "npmjs.com", "google.com", "github.com",
        "gitlab.com", "bitbucket.org", "codeberg.org", "notion.site",
    }

    @classmethod
    def clean_url(cls, url: str) -> str:
        """Strips surrounding brackets, parentheses, and punctuation."""
        url = url.strip()
        # Strip trailing unwanted punctuation
        url = re.sub(r"[),.;:\]>\"'\s]+$", "", url)
        # Strip leading brackets/parens
        url = re.sub(r"^[(\[<\"']+", "", url)
        return url.strip()

    @classmethod
    def extract_git_repos(cls, text: str) -> List[str]:
        """Extracts canonical Git repository URLs."""
        if not text:
            return []

        # Find any URL containing git domains
        git_pattern = r"(?:https?://)?(?:www\.)?(github\.com|gitlab\.com|bitbucket\.org|codeberg\.org)/([a-zA-Z0-9_\-]+)/([a-zA-Z0-9_\-\.]+)(?:/[^\s,)\]]*)?"
        matches = re.finditer(git_pattern, text, re.IGNORECASE)

        repos: List[str] = []
        seen: Set[str] = set()

        for m in matches:
            domain = m.group(1).lower()
            owner = m.group(2)
            repo = m.group(3)

            # Strip trailing .git if present
            if repo.endswith(".git"):
                repo = repo[:-4]

            # Filter out blacklisted paths
            if owner.lower() in cls.GIT_BLACKLIST_PATHS or repo.lower() in cls.GIT_BLACKLIST_PATHS:
                continue

            # Strip out commit/pull/issues subpaths to canonical owner/repo
            canonical = f"https://{domain}/{owner}/{repo}"
            canonical = cls.clean_url(canonical)

            if canonical not in seen:
                seen.add(canonical)
                repos.append(canonical)

        return repos

    @classmethod
    def extract_live_deployments(cls, text: str) -> List[str]:
        """Extracts live web application URLs."""
        if not text:
            return []

        combined_host_regex = "|".join(f"(?:{p})" for p in cls.LIVE_HOST_PATTERNS)
        url_pattern = rf"https?://(?:{combined_host_regex})(?:/[^\s,)\]]*)?"
        matches = re.finditer(url_pattern, text, re.IGNORECASE)

        deployments: List[str] = []
        seen: Set[str] = set()

        for m in matches:
            raw_url = m.group(0)
            cleaned = cls.clean_url(raw_url)

            # Verify it's not in excluded domains
            is_excluded = any(ex in cleaned.lower() for ex in cls.EXCLUDED_DOMAINS)
            if not is_excluded and cleaned not in seen:
                seen.add(cleaned)
                deployments.append(cleaned)

        return deployments

    @classmethod
    def extract_urls(cls, text: str) -> Dict[str, List[str]]:
        """Extracts both Git repositories and live deployment URLs."""
        return {
            "git_repos": cls.extract_git_repos(text),
            "live_deployments": cls.extract_live_deployments(text),
        }
