import { Outlet, createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Team } from "../pages/Team/Team";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
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

const routes = [

]