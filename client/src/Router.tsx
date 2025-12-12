// router.tsx
import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/ErrorBoundary";
import SigninPage from "./features/auth/pages/SigninPage";
import SignupPage from "./features/auth/pages/SignupPage";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import PersistLogin from "./components/PersistLogin";
import OauthCallback from "./features/auth/components/OauthCallback";

import TasksPage from "./features/tasks/pages/TasksPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <PersistLogin />,
    children: [
      {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "signup",
            element: <SignupPage />,
          },
          {
            path: "signin",
            element: <SigninPage />,
          },
          {
            path: "unauthorized",
            element: <UnauthorizedPage />,
          },
          {
            path: "oauth/callback",
            element: <OauthCallback />,
          },
          {
            path: "tasks",
            element: <TasksPage />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "*",
            element: <NotFoundPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
