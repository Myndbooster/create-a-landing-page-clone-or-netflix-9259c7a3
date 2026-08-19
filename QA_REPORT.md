# A6 QA Report

## Summary

1 passed, 1 failed (5 finding(s)), 0 skipped, 3 errored

## Dependency Vulnerabilities — ERROR

_pip-audit and/or npm audit failed to run_

- **medium** `package.json` — react-router-dom: moderate severity vulnerability
- **medium** `package.json` — react-router: moderate severity vulnerability

## Static Vulnerabilities — ERROR

_bandit failed to run_

## Hardcoded Secrets — PASS

No findings.

## Dead Code — ERROR

_vulture failed to run_

## Functional / Input Validation — FAIL

- **high** `api/` — declared endpoint GET /api/movies/:id not found in backend source
- **medium** `src/components/SignIn.jsx` — password input with no visible format validation (pattern/regex/minLength)
- **medium** `src/components/SignUp.jsx` — password input with no visible format validation (pattern/regex/minLength)
