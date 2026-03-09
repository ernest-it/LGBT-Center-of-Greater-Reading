# CMS and Frontend Action Plan

This document provides a delegated game plan for the Claude Agent Team to address specific functionality and aesthetic gaps in the `LCGR-Remake-Site`. Following these exact prompts will ensure that the content remains manageable for the LCGR staff while updating the public-facing footprint.

## 🤖 Agent 1: CMS Feature Specialist
**Role:** Extend the CMS Admin Application capabilities.
**Objective:** Add robust customizability for dynamic site elements.

**Tasks:**
1. **Dynamic Page Pictures:** 
   - Modify the CMS "Pages" or "Static Content" views.
   - Implement an ability for the CMS Manager to upload and swap out pictures directly. 
   - Ensure the image fields update the corresponding generic picture references in the database.
2. **Team & Board Customizability:**
   - Create distinct CMS management interfaces (e.g., dedicated dashboard tabs) for "Board Members" and "Meet the Team".
   - Each entry must be fully customizable. Forms should accept: Name, Role/Title, Biography, and an Image Upload.
   - Implement CRUD endpoints and CMS UI for both collections.

## 🤖 Agent 2: Integration Engineer
**Role:** Full-Stack Data Flow Implementation.
**Objective:** Connect the CMS inputs back to the Frontend so data strictly syncs.

**Tasks:**
1. **API Wiring:** Verify that when the CMS updates the Board Members, Meet the Team, or Page Pictures, the backend payload correctly serves this new data on the corresponding public API endpoints.
2. **Frontend Consumption:** 
   - Refactor the hardcoded frontend views for "Board of Directors" and "Meet the Team".
   - Implement `fetch` calls or Next.js `getServerSideProps`/loaders to pull in the dynamic data.
   - Map over the data array so that the customized cards from the CMS immediately display on the live site when the CMS is updated.

## 🤖 Agent 3: Frontend Polishing Agent
**Role:** Public Application Aesthetics and Information Accuracy.
**Objective:** Resolve layout bugs, insert necessary badging, and hunt down correct contact info.

**Tasks:**
1. **Footer Email Correction:**
   - The current email address in the footer is incorrect.
   - Search the project files (specifically legacy HTML files like `index.html` in the improved/original sites) to find the *correct* official LCGR email address.
   - Update the global frontend footer component with the correct email.
2. **Candid Platinum Integration:**
   - Locate or download a high-resolution, clean "Candid Platinum Seal of Transparency" logo.
   - Place this logo in a prominent location (e.g., the footer or an "About" section).
   - Wrap the logo in an anchor tag linking exactly to: `https://app.candid.org/profile/9566926/lgbt-center-of-greater-reading-81-3191097`.
   - Directly underneath or alongside the logo, cleanly render the text: **EIN: 81-3191097**.
