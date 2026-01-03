# User Management System (React + TypeScript)

This project is a frontend assignment built with a focus on **scalable architecture, clean code, and proper state management**. The main goal was to structure the application in a way that reflects real-world frontend development practices.

## Tech Stack
- **React** with **Vite** for a fast development experience
- **TypeScript** for type safety and better developer experience
- **Zustand** for lightweight UI/client-side state management
- **TanStack Query (React Query)** for handling server state
- **Formik** for form handling
- **Zod** for schema-based validation
- **Tailwind CSS** for styling

## Project Structure
The project follows a **feature-based architecture**, keeping related logic grouped together to improve maintainability and scalability.

src/
├── components/
│   └── ui/              # Reusable, "dumb" UI components (Button, Input)
├── features/
│   └── user/            # Self-contained domain module for User Management
│       ├── schema/      # Zod validation schemas & TypeScript interfaces
│       ├── services/    # API calls (Axios) and server-state hooks (React Query)
│       ├── store/       # Client-side UI state management (Zustand)
│       ├── User.tsx     # Feature entry point (orchestrator)
│       ├── UserForm.tsx # Logic-heavy Formik component
│       └── UserTable.tsx# Presentational table with pagination
├── pages/               # Page-level containers (UserPage.tsx)
├── App.tsx              # Main routing and provider setup
└── main.tsx 


## State Management Approach
- **React Query** is used for all server-side data, including fetching, caching, and mutations. Since the API used is a mock service (DummyJSON), manual cache updates using `setQueryData` are implemented so the UI updates immediately after Create, Update, and Delete operations.

- **Zustand** is used only for temporary UI-related state, such as modal visibility and the currently selected user for editing. This helps keep the global state minimal and avoids unnecessary prop drilling.

## Getting Started
1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   npm run dev
