import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// route protection
import AuthPrivateRoute from "./private/AuthPrivateRoute";
import PublicOnlyRoute from "./private/PublicOnlyRoute";
import AdminPrivateRoute from "./private/AdminPrivateRoute";

// layout
import AppLayout from "./layout/AppLayout";

// pages
import Login from "./pages/auth/Login";
import Notifications from "./pages/Notifications";
import Projects from "./pages/Projects";
import SelectedProject from "./pages/SelectedProject";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import SelectedTask from "./pages/SelectedTask";
import UserTasks from "./pages/UserTasks";
import Profile from "./pages/Profile";
import Users from "./pages/admin/Users";
import SelectedUser from "./pages/admin/SelectedUser";
import AllProjects from "./pages/admin/AllProjects";

// loaders
import { loader as projectDetailsLoader } from "./pages/SelectedProject";
import { loader as projectDataLoader } from "./pages/EditProject";
import { loader as taskDetailsLoader } from "./pages/SelectedTask";
import { loader as profileDataLoader } from "./pages/Profile";
import { loader as regularUserDetailsLoader } from "./pages/admin/SelectedUser";

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            index: true,
            element: <Login />
          }
        ]
      },
      {
        element: <AuthPrivateRoute />,
        children: [
          {
            path: '/notifications',
            element: <Notifications />,
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
            loader: projectDetailsLoader
          },
          {
            path: '/projects/:id/edit',
            element: <EditProject />,
            loader: projectDataLoader
          },
          {
            path: '/tasks',
            element: <UserTasks />
          },
          {
            path: '/tasks/:id',
            element: <SelectedTask />,
            loader: taskDetailsLoader
          },
          {
            path: '/profile',
            element: <Profile />,
            loader: profileDataLoader
          },
          {
            element: <AdminPrivateRoute />,
            children: [
              {
                path: '/admin/users',
                element: <Users />,
              },
              {
                path: '/admin/users/:id',
                element: <SelectedUser />,
                loader: regularUserDetailsLoader
              },
              {
                path: '/admin/projects',
                element: <AllProjects />,
              },
            ]
          }
        ]
      }
    ]
  }
]);

const App = (): JSX.Element => <RouterProvider router={router} />;

export default App;