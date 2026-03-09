# Security Audit Report — LGBT Center of Greater Reading Website

**Date:** March 2026
**Scope:** Full-stack application (backend, cms-admin, frontend)

---

## Critical Issues (FIXED)

### 1. No Security Headers
**Risk:** Missing Content-Security-Policy, X-Frame-Options, HSTS, etc. allows clickjacking and other attacks.
**Fix:** Added `helmet` middleware to backend — automatically sets all recommended security headers.

### 2. No Rate Limiting on Login
**Risk:** Brute force attacks on the login endpoint could crack passwords.
**Fix:** Added `express-rate-limit` — max 10 login attempts per 15-minute window. Also applied to setup endpoint.

### 3. SVG Uploads Allowed
**Risk:** SVG files can contain embedded JavaScript — stored XSS attack vector.
**Fix:** Removed `image/svg+xml` from allowed upload MIME types. Only JPEG, PNG, GIF, and WebP are now accepted.

### 4. Path Traversal in Upload Filenames
**Risk:** Original filenames were only stripped of whitespace. A crafted filename like `../../etc/passwd` could write outside the uploads directory.
**Fix:** Sanitized filenames to only allow alphanumeric characters, dots, hyphens, and underscores.

### 5. Inconsistent Password Requirements
**Risk:** Register endpoint allowed 6-char passwords while setup required 8. Weak passwords are easier to brute force.
**Fix:** Changed register endpoint to require minimum 8 characters. Bcrypt rounds increased to 12 everywhere.

---

## Warnings

### 1. Weak Default JWT Secret
The `.env` file contains `JWT_SECRET=lcgr-site-secret-key-change-in-production`. This is trivially guessable.
**Action:** MUST change to a strong random string (32+ characters) before any production deployment. A comment has been added to `.env` as a reminder.

### 2. Hardcoded CORS Origins
CORS is set to `localhost:3000` and `localhost:5173`. In production, these must be changed to the actual domain.
**Action:** Use environment variables for CORS origins.

### 3. JWT Stored in localStorage
The CMS stores the JWT in `localStorage`, which is accessible to any JavaScript on the page. If XSS is ever exploited, tokens could be stolen.
**Action:** Consider migrating to httpOnly cookies for token storage in a future update.

### 4. No Input Length Validation on Text Fields
Text fields (titles, descriptions, bios) have no maximum length enforcement on the backend.
**Action:** Add `maxlength` checks to prevent abuse (e.g., someone submitting a 10MB text field).

### 5. SQLite Database File Location
The database file is in `backend/database/lcgr.db`. Ensure it's not in a web-accessible directory in production.
**Action:** The Express static middleware only serves `/uploads`, so this is not currently exposed, but verify in production config.

### 6. Upload Field Name
The CMS `ImageUpload` component should use the field name `file` to match the backend's `upload.single('file')` configuration. Verify this matches.

---

## Recommendations for Production

1. **CSRF Protection** — Add `csurf` or similar middleware for cookie-based auth
2. **Request Logging** — Add `morgan` for HTTP request logging (helpful for security monitoring)
3. **Token Refresh** — Implement refresh tokens so users don't need to re-login every 24 hours
4. **Password Complexity** — Require at least one uppercase letter, number, and special character
5. **Environment-Based API URLs** — Use `NEXT_PUBLIC_API_URL` and `VITE_API_URL` env vars instead of hardcoded `localhost`
6. **npm audit** — Run `npm audit` regularly across all three projects
7. **Create `.env.example`** — Include placeholder values so others know what variables are needed
8. **Account Lockout** — Lock accounts after 5 failed login attempts (on top of rate limiting)
9. **Magic Bytes Validation** — Don't trust MIME types alone for uploads; validate file headers
10. **Root `.gitignore`** — Add a project-level `.gitignore` covering all three sub-projects

---

## What's Already Good

1. **All SQL queries are parameterized** — No SQL injection risk (better-sqlite3 prepared statements)
2. **Passwords hashed with bcrypt** — 12 rounds, industry standard
3. **Setup endpoint properly locked** — Returns 403 after initial account creation
4. **All mutating routes protected** — JWT auth middleware on all POST/PUT/DELETE endpoints
5. **File upload size limit** — 10MB max enforced by multer
6. **Generic error messages** — No internal details leaked to clients
7. **No hardcoded secrets in source** — Secrets only in `.env` (which is gitignored)
8. **Proper `.gitignore`** — Excludes `node_modules`, `.env`, `uploads/*`, and `*.db`
9. **CORS restricts origins** — Only allowed origins can make requests
10. **JWT tokens expire** — 24-hour expiration prevents indefinite access
11. **No public API keys** — Zero API keys found anywhere in the codebase

---

## Before Deployment Checklist

- [ ] Change `JWT_SECRET` to a strong random string (32+ chars): `openssl rand -base64 32`
- [ ] Set up HTTPS (required for secure headers and cookies)
- [ ] Change CORS origins to production domain(s)
- [ ] Set `NODE_ENV=production`
- [ ] Remove seed data or re-seed with real content
- [ ] Set up automated backups for SQLite database
- [ ] Configure proper file permissions on `uploads/` directory
- [ ] Set up monitoring and error logging
- [ ] Run `npm audit fix` on all three projects
- [ ] Test all upload functionality with various file types
- [ ] Verify rate limiting works as expected
