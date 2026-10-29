"""
Pariksha IM-105: Dynamic College Tier Classifier
Categorizes institutions into Tier-1, Tier-2, and Tier-3 based on established
national accreditation (NIRF, NAAC, Institutes of National Importance) and global standards.
"""

import re
from typing import Dict, Any, Tuple

TIER_1_PATTERNS = [
    # IITs
    r"\biit\b",
    r"indian\s+institute\s+of\s+technology",
    # BITS
    r"\bbits\b",
    r"birla\s+institute\s+of\s+technology\s+and\s+science",
    # NITs
    r"\bnit\b",
    r"national\s+institute\s+of\s+technology",
    r"\bmnnit\b",
    r"\bvnit\b",
    r"\bsvnit\b",
    r"\bmanit\b",
    # IIITs
    r"\biiit\b",
    r"indian\s+institute\s+of\s+information\s+technology",
    r"international\s+institute\s+of\s+information\s+technology",
    # Premier Science & Tech
    r"\biisc\b",
    r"indian\s+institute\s+of\s+science",
    r"\bisi\b",
    r"indian\s+statistical\s+institute",
    r"\bcmi\b",
    r"chennai\s+mathematical\s+institute",
    r"\bdtu\b",
    r"delhi\s+technological\s+university",
    r"\bnsut\b",
    r"\bnsit\b",
    r"netaji\s+subhas",
    r"jadavpur\s+university",
    r"anna\s+university",
    r"\bcoep\b",
    r"college\s+of\s+engineering\s+pune",
    r"\bvjti\b",
    r"veermata\s+jijabai",
    # Top Global
    r"\bmit\b(?!\s*pune)",
    r"massachusetts\s+institute\s+of\s+technology",
    r"\bstanford\b",
    r"\bharvard\b",
    r"carnegie\s+mellon",
    r"\bcmu\b",
    r"\bberkeley\b",
    r"\bcambridge\b",
    r"\boxford\b",
    r"\bcaltech\b",
    r"\bprinceton\b",
    r"\beth\s+zurich\b",
    r"imperial\s+college"
]

TIER_2_PATTERNS = [
    r"gla\s+university",
    r"\bgla\b",
    r"vellore\s+institute\s+of\s+technology",
    r"\bvit\b",
    r"thapar",
    r"\btiet\b",
    r"manipal",
    r"\bmahe\b",
    r"srm\s+institute",
    r"srm\s+university",
    r"\bsrm\b",
    r"kalinga\s+institute",
    r"\bkiit\b",
    r"pes\s+university",
    r"\bpesit\b",
    r"\bpes\b",
    r"\brvce\b",
    r"r\.?v\.?\s+college\s+of\s+engineering",
    r"\bbmsce\b",
    r"\bbms\s+college\b",
    r"\bmsrit\b",
    r"ramaiah\s+institute",
    r"amity\s+university",
    r"\bamity\b",
    r"lovely\s+professional\s+university",
    r"\blpu\b",
    r"shiv\s+nadar",
    r"ashoka\s+university",
    r"bennett\s+university",
    r"graphic\s+era",
    r"jaypee\s+institute",
    r"\bjiit\b",
    r"\bupes\b",
    r"chitkara",
    r"chandigarh\s+university",
    r"mit\s*-\s*wpu",
    r"mit\s+pune",
    r"symbiosis",
    r"da-?iict",
    r"nirma\s+university",
    r"psg\s+college",
    r"heritage\s+institute",
    r"institute\s+of\s+engineering\s+and\s+management",
    r"\biem\b",
    r"\bhbtu\b",
    r"\bmmmut\b",
    r"\bakgec\b",
    r"\bkiet\b",
    r"\bjss\b",
    r"galgotias",
    r"cummin",
    r"walchand",
    r"delhi\s+university",
    r"mumbai\s+university",
    r"pune\s+university",
    r"savitribai\s+phule"
]

class CollegeTierClassifier:
    """Classifies colleges into Tier-1, Tier-2, or Tier-3."""

    @staticmethod
    def classify(college_name: str) -> Tuple[str, str]:
        """
        Returns (tier_code, tier_label)
        e.g. ('Tier-1', 'Tier-1 Elite (IIT / NIT / BITS / Premier)')
        """
        if not college_name or not college_name.strip():
            return "Tier-3", "Tier-3 Regional (State Affiliated / Regional College)"

        name = college_name.strip().lower()

        # Check Tier 1
        for pattern in TIER_1_PATTERNS:
            if re.search(pattern, name, re.IGNORECASE):
                return "Tier-1", "Tier-1 Elite (IIT / NIT / BITS / Premier)"

        # Check Tier 2
        for pattern in TIER_2_PATTERNS:
            if re.search(pattern, name, re.IGNORECASE):
                return "Tier-2", "Tier-2 Accredited (Established University / Technical Institute)"

        # Default Tier 3
        return "Tier-3", "Tier-3 Regional (State Affiliated / Regional College)"
