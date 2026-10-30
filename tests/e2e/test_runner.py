"""
ProofCard-IM105 E2E Test Suite Runner
=====================================
Unified CLI runner for executing E2E tests across Tiers 1-4.
Usage:
    python tests/e2e/test_runner.py [--tier {1,2,3,4,all}] [-v]
"""

import sys
import argparse
from pathlib import Path
import pytest

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
E2E_DIR = ROOT_DIR / "tests" / "e2e"

TIER_FILES = {
    "1": str(E2E_DIR / "test_tier1_features.py"),
    "2": str(E2E_DIR / "test_tier2_boundaries.py"),
    "3": str(E2E_DIR / "test_tier3_cross_feature.py"),
    "4": str(E2E_DIR / "test_tier4_scenarios.py"),
}

def main():
    parser = argparse.ArgumentParser(description="ProofCard E2E Test Suite Runner")
    parser.add_argument(
        "--tier",
        choices=["1", "2", "3", "4", "all"],
        default="all",
        help="Test tier to execute (default: all)"
    )
    parser.add_argument("-v", "--verbose", action="store_true", help="Verbose pytest output")
    args = parser.parse_args()

    pytest_args = []
    if args.verbose:
        pytest_args.append("-v")

    if args.tier == "all":
        pytest_args.append(str(E2E_DIR))
    else:
        pytest_args.append(TIER_FILES[args.tier])

    print("=" * 70)
    print(f"ProofCard-IM105: Running E2E Test Suite [Tier: {args.tier.upper()}]")
    print(f"Target: {pytest_args[-1]}")
    print("=" * 70)

    exit_code = pytest.main(pytest_args)
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
