# CampusShare AI 📚✨

**An intelligent, AI-powered file sharing platform for academic institutions.**

CampusShare AI is a modern, secure, and intuitive web application designed to streamline academic collaboration. It features automatic document summarization, keyword extraction, and powerful semantic search, all powered by the Google Gemini API, to help students and faculty manage their course materials and research more effectively.

---

## Table of Contents

- [Live Demo & Screenshots](#live-demo--screenshots)
- [Key Features](#key-features)
  - [For Students & Faculty](#for-students--faculty)
  - [For Administrators](#for-administrators)
  - [AI-Powered Capabilities](#ai-powered-capabilities)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [How to Use](#how-to-use)
  - [Student/Faculty Login](#studentfaculty-login)
  - [Admin Login](#admin-login)
- [AI Integration](#ai-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Live Demo & Screenshots

*(This is a conceptual project. A live demo is not available.)*

### Admin Dashboard with Data Visualization


### AI-Powered File Upload & Analysis


---

## Key Features

### For Students & Faculty

-   **Secure File Upload & Management**: Upload, store, and manage various document types (PDF, DOCX, PPTX).
-   **Collaborative Workspaces**: Create and join shared workspaces for courses, project groups, or departments.
-   **Dashboard Overview**: At-a-glance statistics on course folders, collaborations, and recent activity.
-   **Activity Feed**: A real-time log of all platform activities, with filtering and search capabilities.
-   **Notifications**: Stay updated on file shares, downloads, and system announcements.
-   **Responsive Design**: A seamless experience across desktop and mobile devices.
-   **Dark/Light Mode**: User-configurable theme for comfortable viewing.

### For Administrators

-   **System Statistics Dashboard**: A comprehensive overview of platform health, including total users, files, storage usage, and active collaborations.
-   **Weekly Activity Chart**: A visual representation of platform engagement (uploads, downloads, shares) over the past week.
-   **User Management**: A searchable and filterable table to view, edit, or suspend user accounts.
-   **Role-Based Access Control (RBAC)**: Distinct interfaces and permissions for regular users and administrators.

### AI-Powered Capabilities

-   **Automatic File Analysis**: Upon upload, the AI analyzes the document to:
    -   Generate a concise summary.
    -   Extract relevant keywords.
    -   Suggest a standardized filename.
    -   Assign a relevant category (e.g., "Lecture Notes", "Research Paper").
-   **Semantic Search**: Use natural language queries (e.g., "find me documents about machine learning bias") to search through all managed files, getting both an AI-generated answer and a list of relevant documents.

---

## Technology Stack

-   **Frontend Framework**: [React](https://reactjs.org/) (with Hooks & Context API)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first, responsive design.
-   **Icons**: [Lucide React](https://lucide.dev/) for a clean and consistent icon set.
-   **State Management**: React Context API for centralized, accessible application state.
-   **AI Integration**: [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview) for all generative AI features.

---

## Project Structure

The codebase is organized into a modular and scalable component-based architecture.

```
/
├── components/
│   ├── admin/                 # Components for the Admin Dashboard
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── SystemStats.tsx
│   │   ├── UserManagement.tsx
│   │   └── WeeklyActivityChart.tsx
│   ├── dashboard/             # Components for the User Dashboard
│   │   ├── ActivityLog.tsx
│   │   ├── AIInsightsModal.tsx
│   │   ├── CollaborationsSection.tsx
│   │   ├── FilesSection.tsx
│   │   ├── Header.tsx
│   │   ├── ...
│   ├── AuthPage.tsx           # Login/Registration page
│   └── LandingPage.tsx        # Public landing page
├── context/
│   └── AppContext.tsx         # Global state management
├── hooks/
│   └── useOnClickOutside.ts   # Custom hook for UI interactions
├── App.tsx                    # Main application component/router
├── constants.ts               # Mock data and constants
├── index.html                 # Main HTML entry point
├── index.tsx                  # React application root
├── metadata.json              # Application metadata
└── types.ts                   # TypeScript type definitions
```

---

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   A modern web browser (Chrome, Firefox, Safari).
-   A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/campus-share-ai.git
    cd campus-share-ai
    ```

2.  **Set up Environment Variables:**
    The application loads the Gemini API key from environment variables. While you won't need to create a `.env` file in this specific development environment, in a real-world scenario you would:
    -   Create a file named `.env` in the root of the project.
    -   Add your API key to it:
        ```
        API_KEY=YOUR_GEMINI_API_KEY
        ```

3.  **Run the Application:**
    -   Open `index.html` in your web browser. The application is set up to work directly with ES modules and does not require a local build step.

---

## How to Use

### Student/Faculty Login

1.  Navigate to the landing page.
2.  Click `Login / Register` to go to the Auth page.
3.  Fill in the credentials and click `Sign In`.
4.  You will be redirected to the user dashboard where you can:
    -   Upload new files via the drag-and-drop interface.
    -   Review AI insights before saving the file.
    -   Use the AI search bar to find documents.
    -   Switch between "Course Folders", "Collaborations", and "Activity Feed" views.

### Admin Login

1.  Navigate to the Auth page.
2.  Check the **"Log in as Admin"** checkbox before submitting the form.
3.  Upon logging in, you will be directed to the Admin Dashboard.
4.  Use the sidebar to navigate between:
    -   **System Statistics**: View platform-wide metrics and the weekly activity chart.
    -   **User Management**: Search for and manage all users on the platform.

---

## AI Integration

This application heavily leverages the **Google Gemini API** to provide its intelligent features. All AI functionalities are currently mocked within the `AppContext.tsx` for demonstration purposes but are designed to be easily replaced with live API calls.

-   **File Analysis (`startFileUploadAnalysis`)**:
    -   **Model**: `gemini-2.5-flash`
    -   **Prompt Strategy**: A prompt would be constructed containing the extracted text from the uploaded document, asking the model to provide a summary, keywords, a suggested filename, and a category from a predefined list.
-   **Semantic Search (`performAISearch`)**:
    -   **Model**: `gemini-2.5-flash`
    -   **Prompt Strategy**: The user's natural language query is sent to the model along with a manifest of available files (name, summary, keywords). The model is asked to identify the most relevant files and provide a natural language response summarizing its findings.

---

## Contributing

Contributions are welcome! If you have suggestions or want to improve the application, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
