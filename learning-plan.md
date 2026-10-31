# BIO FORTIS - Phase 2 Implementation Plan (React Learning Focus)

## Goal Description
To expand the BIO FORTIS dashboard with advanced features designed to help you learn core and advanced **ReactJS** concepts. This phase will introduce complex state management, side-effects, form handling, and component architecture while adding real-world features like User Registration, Admin Approval workflows, Email OTP verification, and deeper UI interactions.

---

## Proposed Changes & Learning Objectives

### 1. User Registration & Admin Approval
**React Concepts:** Controlled Components, Form Validation, Lifting State Up.
*   **`frontend/src/pages/Register.js`**: A new glassmorphic registration form. Users will input their details, and we'll learn how to handle multiple controlled inputs and front-end validation (e.g., password strength, matching fields).
*   **`backend/server.js`**: Update the registration endpoint to flag new users as `status: 'pending'`.
*   **`frontend/src/components/UserManagement.js`**: A new admin-only view added to the sidebar. Admins will see a list of pending users and can click "Approve" or "Reject". This will teach us how to render lists using `.map()` and pass callback functions as props.

### 2. Email OTP Verification
**React Concepts:** Conditional Rendering, the `useEffect` Hook (for timers/resend limits).
*   **`frontend/src/pages/VerifyOTP.js`**: A screen that appears after a successful login if the user hasn't verified their device. We'll build a custom 6-digit input component that auto-advances focus to the next box—a great exercise in React `useRef`.
*   **`backend/server.js`**: We will integrate `nodemailer` (using a free Ethereal testing account) to actually send a real email with the OTP when a user registers or logs in from a new device.

### 3. Enhancing Existing Pages
**React Concepts:** Custom Hooks, Context API, React Portals (Modals).

#### Patient & Biomarker View
*   **Feature**: Add a "Create/Edit Patient" Modal.
*   **Learning**: We will use React Portals to render a modal overlay. We will also implement the `useReducer` hook here instead of `useState` to manage the complex form state of a patient's medical history.

#### Storage Management
*   **Feature**: Drag-and-Drop Sample Allocation.
*   **Learning**: We will implement a drag-and-drop interface (using a library like `@dnd-kit/core`) so you can drag a sample from the table into a specific freezer card. This teaches advanced event handling and layout shifts in React.

#### Client Dashboards
*   **Feature**: Live Polling & Custom Hooks.
*   **Learning**: We will build a custom hook called `usePolling` that automatically fetches new shipment data every 10 seconds. This is a fantastic way to learn how to clean up intervals inside a `useEffect` hook to prevent memory leaks.

---

## Design & Implementation Choices
1. **Email Delivery**: For the Email OTP, we will set up a mock email service (like Nodemailer with Ethereal) so you can actually see the email being "sent" and learn how backend side-effects work.
2. **State Management**: We will introduce **React Context API** for managing global user authentication and role state to avoid prop-drilling across the dashboard components.
