import { Outlet, createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Player } from "../pages/Player/Player";
import { Team } from "../pages/Team/Team";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "player",
        element: <Outlet />,
        children: [
            {
                path: ":wikiId",
                element: <Player />,
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

const routes = [

]