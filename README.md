# CareerLift - Project Help Manual

This manual provides complete instructions on how to set up and run the CareerLift platform. This project consists of a **Node.js/Express Backend** and a **React (Vite) Frontend**.

## 1. Prerequisites

Before running the project, ensure the following are installed on the target machine:

*   **Node.js** (Version 18 or higher recommended)
    *   Download: [https://nodejs.org/](https://nodejs.org/)
    *   Verify installation by running `node -v` in a terminal.
*   **Git** (Optional, for version control)

## 2. Project Structure

*   `backend/`: Contains the server-side logic, API endpoints, and data processing (Resume Analysis).
*   `client/`: Contains the user interface (React application).
*   `HELP_MANUAL.md`: This file.

## 3. Installation & Setup

You need to set up both the backend and frontend separately.

### Step 3.1: Backend Setup

1.  Open a terminal (Command Prompt or PowerShell).
2.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
3.  Install the necessary dependencies:
    ```bash
    npm install
    ```
4.  **Environment Configuration**:
    *   Ensure a file named `.env` exists in the `backend` folder.
    *   If it is missing, create it and add the following content (update the keys as needed):
        ```env
        PORT=5000
        SECRET_KEY=your_secret_key_here
        GEMINI_API_KEY=your_google_gemini_api_key_here
        ```
    *   *Note: The `GEMINI_API_KEY` is required for the Resume AI Analysis feature.*
5.  **Uploads Directory**:
    *   Ensure a folder named `uploads` exists inside `backend/`. If not, create it manually.

### Step 3.2: Frontend Setup

1.  Open a **new** terminal window.
2.  Navigate to the `client` folder:
    ```bash
    cd client
    ```
3.  Install the necessary dependencies:
    ```bash
    npm install
    ```

## 4. Running the Application

To run the full application, you need to keep **two terminal windows open**: one for the backend and one for the frontend.

### Terminal 1: Start Backend Server

1.  In the `backend` directory, run:
    ```bash
    npm start
    ```
    *   You should see: `Server running on http://localhost:5000`

### Terminal 2: Start Frontend Application

1.  In the `client` directory, run:
    ```bash
    npm run dev
    ```
2.  The terminal will show a local URL (e.g., `http://localhost:5173`).
3.  Open that URL in your web browser to use CareerLift.

## 5. Usage Guide

*   **Login/Register**: Create an account to access the dashboard.
*   **Job Board**: View and apply for jobs (requires resume upload).
*   **Resume Analysis**: Go to the "Beat the Algorithm" or "Resume Analysis" section to upload a PDF resume. The system uses AI to score your resume and provide feedback.
*   **Profile**: Manage your user details and analyzed resumes.

## 6. Troubleshooting

*   **"Module not found" Error**:
    *   This means dependencies are missing. Run `npm install` inside both `backend` and `client` folders again.
*   **API Connection Error (Network Error)**:
    *   Ensure the Backend Server (Terminal 1) is running.
    *   Check if the backend port (default 5000) matches what the frontend expects.
*   **Resume Analysis Failed**:
    *   Check the backend terminal for errors.
    *   Ensure your `GEMINI_API_KEY` in `backend/.env` is valid.
    *   Ensure the `backend/uploads` folder exists.

---
**Submission Note**: If copying to a pendrive, copy the entire project folder. On the new machine, you must run `npm install` in both folders as `node_modules` are usually not copied (or are too large/OS-specific).
