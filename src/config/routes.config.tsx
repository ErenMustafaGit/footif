import { Outlet, createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Player } from "../pages/Player/Player";
import { Team } from "../pages/Team/Team";
import { Layout } from "../containers/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "team",
                children: [
                    {
                        path: ":name",
                        element: <Team />,
                    }
                ]
            },
            {
                path: "player",
                children: [
                    {
                        path: ":wikiId",
                        element: <Player />,
                    }
                ]
            },
        ]
    },
  ]);