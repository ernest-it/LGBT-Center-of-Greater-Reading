# Agent Team Instructions

## 1. Backend Agent

**Objective:** Build the Backend API and Database for the LCGR website and CMS.

**Instructions:**
1. Initialize a new Node.js + Express project in `LCGR-Rebuilt-Site/backend`.
2. Set up SQLite database.
3. Create tables/models:
   - `Banners` (id, page_section, image_url, alt_text, link_url, created_at, updated_at)
   - `News_Events` (id, title, description, image_url, date, type, created_at, updated_at)
   - `StaticContent` (id, page_name, section_name, text_content, created_at, updated_at)
   - `Users` (id, username, password_hash, created_at)
4. Implement RESTful routes (GET, POST, PUT, DELETE) for all models.
5. Create a secure login endpoint that returns a JWT. Protect all POST/PUT/DELETE routes.
6. Implement file upload endpoint using `multer` that saves to `uploads/` directory.
7. Add CORS support for frontend and CMS origins.
8. Seed the database with sample data matching the current site content.

## 2. CMS / Admin Agent

**Objective:** Build an intuitive Content Management System dashboard.

**Instructions:**
1. Initialize a React application (via Vite) in `LCGR-Rebuilt-Site/cms-admin`.
2. Use Tailwind CSS for styling.
3. Build a Login page authenticating against the Backend API.
4. Build a Dashboard with sidebar navigating to: "Home Page Banners", "Upcoming Events", "News", "About Us Text", "Team Members", etc.
5. Build CRUD interfaces for each section.
6. Implement Image Uploading via the Backend's upload endpoint.
7. Handle success/error states with toast notifications.
8. Make it intuitive for non-technical users.

## 3. Frontend Redesign Agent

**Objective:** Redesign the public-facing website to be modern, professional, and dynamic.

**Instructions:**
1. Initialize a Next.js application in `LCGR-Rebuilt-Site/frontend`.
2. Review the old site's structure to retain core navigation: Home, About Us, Events & Programs, Services, Resources, Get Involved, Store, Donate.
3. Use Tailwind CSS and Framer Motion for premium aesthetic with smooth animations.
4. Use the site's color palette: teal (#217F93), navy (#06232C, #0D3B49), purple (#7200F3), cream (#FFFDF8).
5. Build all core pages, fetching dynamic content from the Backend API.
6. Implement fully responsive layout with mobile hamburger menu.
7. Prioritize accessibility (ARIA tags, contrast, heading structure) and SEO.
