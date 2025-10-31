import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// layout
import AppLayout from "./layout/AppLayout";

// pages
import Login from "./pages/auth/Login";
import Projects from "./pages/Projects";
import SelectedProject from "./pages/SelectedProject";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import Profile from "./pages/Profile";
import Users from "./pages/admin/Users";
import SelectedUser from "./pages/admin/SelectedUser";

// loaders
import { loader as projectDetailsLoader } from "./pages/EditProject";

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
        path: '/add_project',
        element: <AddProject />,
      },
      {
        path: '/projects',
        element: <Projects />,
      },
      {
        path: '/projects/:id',
        element: <SelectedProject />,
      },
      {
        path: '/projects/:id/edit',
        element: <EditProject />,
        loader: projectDetailsLoader
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/:id',
        element: <SelectedUser />,
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