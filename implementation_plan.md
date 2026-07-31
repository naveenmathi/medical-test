# BIO FORTIS Implementation Plan

## Goal Description
To build a comprehensive web application for managing clinical trials and biobank sample lifecycles. This is primarily a **frontend React JS learning project**, so the focus will be on building a robust, feature-rich UI, with a lightweight backend acting only as support. The application will track biomarkers, physical storage locations, sample expiry, and ensure audit compliance for Informed Consent Forms (ICFs). It will feature real-time analytics with charts and custom dashboards for clients.

## Proposed Tech Stack
*   **Frontend**: React.js (bundled with **Webpack**, as requested).
*   **Styling**: **Tailwind CSS** (as requested) for utility-first, rapid UI styling.
*   **Backend**: Node.js with Express.js (kept lightweight and basic; primarily supports the frontend).
*   **Database**: SQLite (fast, zero-config relational database).
*   **Charts**: Recharts (for line graphs and bar charts).

## Proposed Architecture & Features

### 1. Database Schema (SQLite)
*   **Users/Auth**: `id`, `username`, `email`, `password_hash` (basic), `role` (admin/client)
*   **OTP/Verification**: `id`, `user_id`, `otp_code`, `expires_at`
*   **Patients**: `id`, `name`, `informed_consent_status`, `icf_document_url`
*   **Biomarkers**: `id`, `patient_id`, `rbc`, `wbc`, `platelets`, `recorded_at`
*   **Samples**: `id`, `patient_id`, `type`, `created_at`, `expiry_date`, `status`
*   **StorageLocations**: `id`, `name` (e.g., Freezer A - Rack 2), `capacity`
*   **SampleStorage**: `id`, `sample_id`, `location_id`, `stored_at`
*   **Clients**: `id`, `name`
*   **Shipments**: `id`, `sample_id`, `client_id`, `status`, `chain_of_custody_log`

### 2. Backend API (Node.js/Express)
*   RESTful endpoints to manage samples, patients, and storage.
*   **Authentication**: Basic Auth Token filter. The backend will *not* have professional-grade security or strict checks, as the focus is on the frontend. It will issue a simple token upon login.
*   Analytical endpoints to provide aggregated data for dashboards.

### 3. Frontend Application (React.js)
*   **Authentication Flow**: Login, Registration, and OTP verification screens.
*   **Axios Interceptor**: A header interceptor to automatically attach the auth token to all API requests once logged in.
*   **Global Layout**: Sidebar navigation and dashboard layout built using Tailwind CSS.
*   **Admin Dashboard**: Overview of system metrics, active clinical trials, and system-wide expiry alerts.
*   **Patient & Biomarker View**: Interactive data tables and Recharts-based graphs for RBC, WBC, and Platelets.
*   **Storage Management**: Interface to allocate and track samples in specific freezers and racks.
*   **Client Dashboards (2 Custom Views)**:
    *   *Client Alpha*: Focused on shipment tracking and chain-of-custody.
    *   *Client Beta*: Focused on biological specimen spoilage and expiry warning alert systems.

## User Review Required

> [!IMPORTANT]
> **Plan Finalization**
> The plan has been updated to use **Webpack** for building the React app and **Tailwind CSS** for styling, per your latest feedback.
> If everything looks good, please approve this plan so we can move forward with execution!

## Verification Plan

### Frontend Focus
*   Set up a custom React environment using Webpack and Babel.
*   Configure Tailwind CSS in the Webpack setup.
*   Implement Axios interceptors for token management.
*   Build UI components (Tables, Charts, Forms) verifying responsive design via Tailwind CSS.
*   Manually verify routing and dashboard rendering with mock/backend data.

### Backend/DB Support
*   Create SQLite schema including user auth tables.
*   Implement basic login/registration endpoints returning a simple token.
*   Verify backend API correctly serves the frontend requests.
