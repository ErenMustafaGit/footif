import { Outlet, createBrowserRouter } from "react-router-dom";
import { Team } from "../pages/Team/Team";
import { Layout } from "../containers/Layout";
import { Home } from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "team",
        element: <Outlet />,
        children: [
            {
                path: ":name",
                element: <Team />,
            }
        ]
    },
  ]);