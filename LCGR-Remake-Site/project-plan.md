# LCGR Rebuilt Site: Master Project Plan

## Overview
This document outlines the architecture, technology stack, and multi-agent workflow for rebuilding the LGBT Center of Greater Reading (LCGR) website. The new site will replace the existing, dense static (Wix-exported) site with a modern, dynamic web application governed by a custom Content Management System (CMS).

## Objectives
1. **Modernize the Frontend:** Improve aesthetics, performance, and accessibility while retaining the familiar organizational layout of the current site.
2. **Implement a Custom CMS:** Empower the client to easily update images, banners, posters, and news for various site sections without touching code.
3. **Robust Backend Architecture:** Support the CMS and frontend with a secure, scalable API and database.

## Proposed Technology Stack
- **Frontend (Public Facing):** Next.js (React) + Tailwind CSS (v4) + Framer Motion (for dynamic animations).
- **Backend (API Layer):** Node.js with Express. SQLite for MVP, PostgreSQL for production.
- **CMS (Admin Dashboard):** React (Vite) + Tailwind CSS, communicating with the Backend API.
- **Storage:** Local filesystem for uploaded photos, banners, and posters.

## Current Site Analysis (LCGR-Improved-Site)

### Pages (24 total):
- Home, About, Who We Are, Meet The Team, Board of Directors
- Counseling, Health & Wellness, Food Pantry, Library & Sensory Space, Community Center
- Support Groups, Social Groups, Arts & Culture Groups, Trans & Nonbinary, Third Thirsty Thursday
- Education (In Person Trainings), Online Trainings, Our Impact
- Events Calendar, Store, Donate, Volunteering, Work With Us, Partners

### Navigation Structure:
Home | About Us | Events & Programs | Services | Resources | Get Involved | Store | Donate

### Branding/Colors:
- **Teal/Cyan**: #217F93, #A1CFD8
- **Dark Navy**: #06232C, #0D3B49, #20455E
- **Purple/Violet**: #7200F3, #5000AA, #8B2DF5
- **Green**: #0d4f3d, #4B916D
- **Cream/Off-white**: #FFFDF8
- **Fonts**: Helvetica, Avenir, Poppins, Inter (for modern rebuild)

### Content Types:
- Hero banners (full-width background images)
- Service cards with images
- Team member profiles
- Photo galleries (carousels)
- Event listings
- Newsletter signup forms
- Donation CTAs

## Multi-Agent Team Strategy

### 1. Backend API & Database Agent
**Directory:** `LCGR-Rebuilt-Site/backend`
- Node.js + Express + SQLite
- Database models: Banners, News_Events, StaticContent, Users
- RESTful CRUD endpoints
- JWT authentication
- File upload with multer

### 2. CMS / Admin Dashboard Agent
**Directory:** `LCGR-Rebuilt-Site/cms-admin`
- React (Vite) + Tailwind CSS
- Login, Dashboard with sidebar navigation
- CRUD interfaces for all content types
- Image upload functionality
- Toast notifications for feedback

### 3. Frontend Redesign Agent
**Directory:** `LCGR-Rebuilt-Site/frontend`
- Next.js + Tailwind CSS + Framer Motion
- Modern, premium aesthetic matching existing branding
- Dynamic content from Backend API
- Fully responsive + accessible
- All 24 pages rebuilt

## Phase Execution Plan
**Phase 1:** Backend Agent creates the foundational database and API endpoints.
**Phase 2:** CMS Agent builds the admin panel and connects it to the backend.
**Phase 3:** Frontend Agent builds the modern UI, pulling data from the backend.
