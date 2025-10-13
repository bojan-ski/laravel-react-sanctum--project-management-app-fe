import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// layout
import AppLayout from "./layout/AppLayout";

// pages
import Login from "./pages/auth/Login";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ]
  }
]);

const App = (): JSX.Element => <RouterProvider router={router} />;

export default App;