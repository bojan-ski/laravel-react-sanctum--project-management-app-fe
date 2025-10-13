import type { JSX } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

// layout
import AppLayout from "./layout/AppLayout";

// pages
import Login from "./pages/auth/Login";

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
    ]
  }
]);

const App = (): JSX.Element => <RouterProvider router={router} />;

export default App;