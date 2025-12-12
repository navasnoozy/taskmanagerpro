# Task Manager Pro

A full-stack task management application 

## Tech Stack

### Frontend
brary
- **Vite with React 19 + TypeScript** - Build tool
- **** - Type safety
- **Material UI (MUI)** - Component library
- **Redux Toolkit** - State management
  > Since I'm already using TanStack Query, using Redux Toolkit is redundant because TanStack Query supports caching and provides more than enough state management for this kind of app. However, Even though it is redundant,I used it for task UI state management.
- **React Query (TanStack)** - Server state & caching
- **React Hook Form + Zod** - Form handling & validation
- **React Router** - Routing
- **Axios** - HTTP client

### Backend
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database
- **Better Auth** - OAuth authentication
- **JWT** - Token-based auth with refresh token
- **Zod** - Schema validation
  > Since I'm not familiar with Joi or express-validator, I used Zod for validation.
- **Bcrypt** - Password hashing

## Design Decisions & Best Practices

- **JWT Security**: Implemented JWT following enterprise-level standards and best practices, which prevents XSS and CSRF attacks.
- **Error Handling**: Used enterprise-level error handling by leveraging Zod for schema validation and type-safe error responses.
- **Password Hashing**: Implemented password hashing in the Mongoose schema using pre-save middleware, which is a best practice for data integrity.

## Architecture & Reusability

### Client-Side
- Created reusable components such as AppButton, Dropdown, CardContainer, Form, SearchBar, Pagination, and custom hooks to maintain maximum reusability.
- Used the modern **features folder structure** for better code organization and scalability.
- Centralized theming in `theme.ts` file for better maintainability and consistent styling across the app.

### Server-Side
- Created reusable utilities and middlewares for authentication and error handling.
- Implemented response formatting utility for consistent API responses across all endpoints.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies:
```bash
# Server
cd server && npm install

# Client
cd client && npm install
```

3. Create `.env` file in server folder:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_KEY=your_jwt_secret
BETTER_AUTH_SECRET=your_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_BASE_URL=http://localhost:3000
```

4. Run the development servers:
```bash
# Server
cd server && npm run dev

# Client
cd client && npm run dev
```

## Folder Structure

```
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature modules (auth, tasks)
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Page components
│   │   ├── schemas/          # Zod schemas
│   │   ├── store/            # Redux store & slices
│   │   ├── lib/              # Utilities (axios)
│   │   └── config/           # App configuration
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── middlewares/      # Express middlewares
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── schemas/          # Validation schemas
│   │   ├── config/           # App configuration
│   │   └── utils/            # Helper functions
│   └── package.json
│
└── README.md
```

---

Made by **navasnoozy**
