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
│ └── ui/ # Reusable UI components (Button, Input, etc.)
├── features/
│ └── users/
│ ├── api/ # Axios calls and React Query hooks
│ ├── components/ # User-specific components (UserTable, UserForm)
│ ├── store/ # Zustand store for UI state
│ └── schema/ # Zod validation schemas


## State Management Approach
- **React Query** is used for all server-side data, including fetching, caching, and mutations. Since the API used is a mock service (DummyJSON), manual cache updates using `setQueryData` are implemented so the UI updates immediately after Create, Update, and Delete operations.

- **Zustand** is used only for temporary UI-related state, such as modal visibility and the currently selected user for editing. This helps keep the global state minimal and avoids unnecessary prop drilling.

## Getting Started
1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   npm run dev
