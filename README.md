# Task Manager Pro

A full-stack task management application

## Tech Stack

### Frontend
- **Vite + React 19 + TypeScript** - Build tool & framework
- **Material UI (MUI)** - Component library
- **Redux Toolkit** - State management
  > 💡 Since I'm already using TanStack Query, using Redux Toolkit is redundant because TanStack Query supports caching and provides more than enough state management for this kind of app. However, even though it is redundant, I used it for task UI state management.
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
  > 💡 Since I'm more familiar with zod validator than Joi  or express-validator, I used Zod for validation.
- **Bcrypt** - Password hashing

## Design Decisions & Best Practices

> ⭐ **JWT Security**: Implemented JWT following enterprise-level standards and best practices, which prevents XSS and CSRF attacks.

> ⭐ **Error Handling**: Used enterprise-level error handling by leveraging Zod for schema validation and type-safe error responses.

> ⭐ **Password Hashing**: Implemented password hashing in the Mongoose schema using pre-save middleware, which is a best practice for data integrity.

## Architecture & Reusability

### Client-Side
> ✅ Created reusable components such as **AppButton**, **Dropdown**, **CardContainer**, **Form**, **SearchBar**, **Pagination**, and **custom hooks** to maintain maximum reusability.

> ✅ Used the modern **features folder structure** for better code organization and scalability.

> ✅ Centralized theming in `theme.ts` file for better maintainability and consistent styling across the app.

### Server-Side
> ✅ Created reusable utilities and middlewares for authentication and error handling.

> ✅ Implemented response formatting utility for consistent API responses across all endpoints.

## API Documentation

Base URL: `http://localhost:3000`

### Overview

#### Authentication (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register a new user | No |
| POST | `/signin` | Login user | No |
| GET | `/signout` | Logout user | No |
| GET | `/currentuser` | Get current logged-in user | Yes |
| POST | `/refresh-token` | Refresh access token | No |

#### Tasks (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create a new task | Yes |
| GET | `/` | Get all tasks | Yes |
| GET | `/:id` | Get task by ID | Yes |
| PATCH | `/:id` | Update task | Yes |
| DELETE | `/:id` | Delete task | Yes |

#### OAuth (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/callback/google` | Google OAuth callback |

---

### Detailed Documentation

### Authentication Endpoints

#### POST `/api/users/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "string (min 2 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)",
  "confirmPassword": "string"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { "email": "user@example.com", "accessToken": "jwt_token" }
}
```

---

#### POST `/api/users/signin`
Login with credentials.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { "accessToken": "jwt_token" }
}
```

---

#### GET `/api/users/signout`
Logout user and clear cookies.

**Response:** `200 OK`

---

#### GET `/api/users/currentuser`
Get currently logged-in user. **Requires Authentication.**

**Headers:** `Authorization: Bearer <access_token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { "id": "user_id", "email": "user@example.com", "name": "John" }
}
```

---

#### POST `/api/users/refresh-token`
Refresh access token using refresh token cookie.

**Response:** `200 OK`
```json
{
  "success": true,
  "accessToken": "new_jwt_token"
}
```

---

### Task Endpoints

All task endpoints require authentication. **Headers:** `Authorization: Bearer <access_token>`

#### POST `/api/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "string (required)",
  "description": "string (optional)",
  "status": "pending | in-progress | completed (default: pending)",
  "priority": "low | medium | high (default: medium)",
  "dueDate": "ISO datetime string (optional)"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": { "_id": "task_id", "title": "...", ... }
}
```

---

#### GET `/api/tasks`
Get all tasks for the current user.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [{ "_id": "task_id", "title": "...", ... }]
}
```

---

#### GET `/api/tasks/:id`
Get a specific task by ID.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": { "_id": "task_id", "title": "...", ... }
}
```

---

#### PATCH `/api/tasks/:id`
Update a task. All fields are optional.

**Request Body:**
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "status": "pending | in-progress | completed (optional)",
  "priority": "low | medium | high (optional)",
  "dueDate": "ISO datetime string (optional)"
}
```

**Response:** `200 OK`

---

#### DELETE `/api/tasks/:id`
Delete a task.

**Response:** `200 OK`

---

### OAuth Endpoints

#### GET `/api/auth/callback/google`
Google OAuth callback (handled by Better Auth).

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
