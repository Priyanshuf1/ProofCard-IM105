import ast
import re
from typing import List, Dict, Any, Tuple
try:
    from radon.complexity import cc_visit
    HAS_RADON = True
except ImportError:
    HAS_RADON = False

class ASTAnalyzer:
    """
    Extracts structural AST complexity and fingerprints from source code files.
    Works for Python, JavaScript, TypeScript, Java, and C++.
    """

    @staticmethod
    def analyze_python_complexity(code: str, file_path: str) -> List[Dict[str, Any]]:
        results = []
        if HAS_RADON:
            try:
                blocks = cc_visit(code)
                for b in blocks:
                    lines = code.splitlines()
                    start = max(0, b.lineno - 1)
                    end = min(len(lines), b.lineno + 25)
                    snippet = "\n".join(lines[start:end])
                    results.append({
                        "file": file_path,
                        "function_name": b.name,
                        "complexity": b.complexity,
                        "line_number": b.lineno,
                        "snippet": snippet
                    })
            except Exception:
                pass

        if not results:
            # Fallback to standard library ast module
            try:
                tree = ast.parse(code)
                for node in ast.walk(tree):
                    if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                        # Simple cyclomatic complexity approximation
                        branch_count = 1
                        for subnode in ast.walk(node):
                            if isinstance(subnode, (ast.If, ast.For, ast.AsyncFor, ast.While, 
                                                    ast.ExceptHandler, ast.With, ast.AsyncWith, 
                                                    ast.BoolOp, ast.IfExp)):
                                branch_count += 1
                        
                        lines = code.splitlines()
                        start = max(0, node.lineno - 1)
                        end = min(len(lines), node.lineno + 25)
                        snippet = "\n".join(lines[start:end])
                        results.append({
                            "file": file_path,
                            "function_name": node.name,
                            "complexity": branch_count,
                            "line_number": node.lineno,
                            "snippet": snippet
                        })
            except Exception:
                pass
        return results

    @staticmethod
    def analyze_js_ts_complexity(code: str, file_path: str) -> List[Dict[str, Any]]:
        """
        Parses JS/TS functions and calculates McCabe cyclomatic complexity.
        """
        results = []
        lines = code.splitlines()
        
        # Regex to locate JS/TS function declarations & arrow functions
        func_patterns = [
            # function foo(...)
            (r"(?:export\s+)?(?:async\s+)?function\s+([a-zA-Z0-9_$]+)\s*\(", "func"),
            # const foo = async (...) => or const foo = function(...)
            (r"(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z0-9_$]+)\s*=>", "arrow"),
            # method(...) {
            (r"(?:async\s+)?([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*\{", "method")
        ]

        found_funcs = []
        for idx, line in enumerate(lines):
            line_clean = line.strip()
            if line_clean.startswith("//") or line_clean.startswith("/*") or line_clean.startswith("*"):
                continue
            for pat, ftype in func_patterns:
                match = re.search(pat, line)
                if match:
                    func_name = match.group(1)
                    if func_name not in {"if", "for", "while", "switch", "catch"}:
                        found_funcs.append((idx + 1, func_name))
                        break

        # For each function found, measure complexity in its block
        for i, (lineno, name) in enumerate(found_funcs):
            start = lineno - 1
            # Estimate end line
            next_start = found_funcs[i+1][0] - 1 if i + 1 < len(found_funcs) else len(lines)
            end = min(start + 35, next_start, len(lines))
            func_code = "\n".join(lines[start:end])

            # McCabe complexity: count decisions
            decisions = len(re.findall(r"\b(if|else\s+if|for|while|case|catch)\b|\?|&&|\|\|", func_code))
            complexity = max(1, decisions + 1)

            results.append({
                "file": file_path,
                "function_name": name,
                "complexity": complexity,
                "line_number": lineno,
                "snippet": func_code
            })

        return results

    @staticmethod
    def analyze_c_like_complexity(code: str, file_path: str, ext: str) -> List[Dict[str, Any]]:
        """
        Parses Java, Go, C++, and Rust functions and calculates McCabe cyclomatic complexity.
        """
        if "\x00" in code:
            return []

        results = []
        lines = code.splitlines()

        # Regex patterns for method/function definitions in Java, Go, C++, Rust
        patterns = {
            ".java": r"(?:public|protected|private|static|\s)+[\w<>\[\],\s]+\s+([a-zA-Z0-9_$]+)\s*\([^)]*\)\s*(?:throws\s+[\w,\s]+)?\{",
            ".go": r"func\s+(?:\([^)]*\)\s+)?([a-zA-Z0-9_]+)\s*\([^)]*\)",
            ".cpp": r"(?:[a-zA-Z0-9_:<>&*]+\s+)+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*(?:const)?\s*\{",
            ".rs": r"fn\s+([a-zA-Z0-9_]+)\s*(?:<[^>]+>)?\s*\([^)]*\)"
        }

        pat = patterns.get(ext, patterns[".java"])
        found_funcs = []

        for idx, line in enumerate(lines):
            line_clean = line.strip()
            if line_clean.startswith(("//", "/*", "*")):
                continue
            match = re.search(pat, line)
            if match:
                fname = match.group(1)
                if fname not in {"if", "for", "while", "switch", "catch", "main"}:
                    found_funcs.append((idx + 1, fname))

        for i, (lineno, name) in enumerate(found_funcs):
            start = lineno - 1
            next_start = found_funcs[i+1][0] - 1 if i + 1 < len(found_funcs) else len(lines)
            end = min(start + 35, next_start, len(lines))
            func_code = "\n".join(lines[start:end])

            decisions = len(re.findall(r"\b(if|else\s+if|for|while|case|catch|match)\b|\?|&&|\|\|", func_code))
            complexity = max(1, decisions + 1)

            results.append({
                "file": file_path,
                "function_name": name,
                "complexity": complexity,
                "line_number": lineno,
                "snippet": func_code
            })

        return results

    @staticmethod
    def extract_structural_token_sequence(code: str, extension: str) -> str:
        """
        Converts code into language-agnostic structural tokens,
        ignoring variable and function names.
        """
        if "\x00" in code:
            return "Program>BinaryData"

        tokens = []
        lines = code.splitlines()
        for line in lines:
            line_str = line.strip()
            if not line_str or line_str.startswith(("//", "#", "/*", "*")):
                continue
            # Extract keywords representing control flow and structure
            matches = re.findall(r"\b(import|from|class|interface|package|public|private|static|void|func|fn|def|function|return|if|else|elif|for|while|try|catch|except|finally|async|await|const|let|var|switch|case|throw|raise|match)\b", line_str)
            for m in matches:
                tokens.append(m.capitalize())
        return ">".join(tokens[:150]) if tokens else "Program>BlockStatement"
