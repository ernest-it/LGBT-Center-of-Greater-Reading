# Security Remediation Game Plan for Claude Team

This document outlines the ordered, step-by-step game plan for the Claude Agent Team to address and fix the remaining security vulnerabilities and warnings identified in `SECURITY-AUDIT.md`. 

**Target Repository:** `LCGR-Remake-Site`

## Phase 1: Environment & Configuration Security
**Agent:** Backend / Full-Stack Agent
**Objective:** Eliminate hardcoded secrets and tighten environment variable usage.

1. **JWT Secret Management:** 
   - Ensure the backend code throws a fatal error if `process.env.JWT_SECRET` is the default value (`lcgr-site-secret-key-change-in-production`) or is undefined in a production environment. 
   - Add a comment to the `.env` file explicitly stating to use a 32+ character random string in production.
2. **CORS Configuration:**
   - Modify backend CORS configuration to use a comma-separated list of allowed origins from an environment variable (e.g., `CORS_ORIGINS`). Fallback to localhost only in development.
3. **Environment Variables Updates:**
   - Implement `NEXT_PUBLIC_API_URL` for the frontend and `VITE_API_URL` for the CMS to replace any hardcoded `localhost` string references.
   - Create a `.env.example` file in the root (or in each sub-project) that defines all required keys without exposing actual secrets.

## Phase 2: Input Validation & Hardening 
**Agent:** Backend Agent
**Objective:** Strengthen API boundaries and data integrity.

1. **Input Length Validation:**
   - Review all API models and controllers. Apply maximum length restrictions to all text fields (titles, descriptions, bios) to prevent DoS via massive payloads.
2. **File Upload Hardening:**
   - Supplement the current MIME type checking (`multer` filter) with **Magic Bytes validation** (e.g., using a library like `file-type`). This ensures a malicious script isn't just renamed to `.jpg`.
   - Verify that the CMS `ImageUpload` component sends the file using the field name `file` to match the backend expectation `upload.single('file')`.
3. **Authentication Hardening:**
   - Enhance the `setup` and `register` endpoints to require minimum password complexity: at least one uppercase letter, one number, and one special character.
   - Implement account lockout logic: temporally disable login for an account after 5 failed attempts within a set time period (in addition to existing rate limiting).

## Phase 3: Architecture & Quality of Life
**Agent:** Backend & CMS Agent
**Objective:** Improve session management and overall project security hygiene.

1. **Session Management (Advanced):**
   - **Current State:** CMS stores JWT in `localStorage` (XSS risk).
   - **Action:** Refactor backend to issue tokens via `httpOnly` cookies. Implement CSRF protection to secure the cookie-based authentication.
   - Implement **Token Refresh** logic so users do not abruptly log out every 24 hours.
2. **Logging & Monitoring:**
   - Add `morgan` middleware to the backend for standard HTTP request logging.
3. **Git Hygiene:**
   - Ensure a robust root-level `.gitignore` exists that prevents any `.env` files, `node_modules`, `uploads/`, or `.db` files from being committed across all sub-projects.

## Phase 4: Pre-Deployment & Auditing
**Agent:** DevSecOps / Full-Stack Agent
**Objective:** Final checks before going live.

1. **Dependency Audit:**
   - Run `npm audit fix` recursively across `backend`, `frontend`, and `cms-admin`. Log any unfixable vulnerabilities for manual review.
2. **Database Verification:**
   - Write a script or setup-check that ensures `lcgr.db` (the SQLite database file) is not accessible from the Express static middleware.
3. **End-to-End Testing (Sanity Checks):**
   - Test standard file uploads to verify Magic Byte implementation works and doesn't break normal behavior.
   - Verify CORS origin environment variables successfully permit/deny origin traffic.
