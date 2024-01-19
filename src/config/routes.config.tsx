import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Player } from "../pages/Player/Player";
import { Team } from "../pages/Team/Team";
import { Layout } from "../containers/Layout";
import { Tournament } from "../pages/Tournament";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "team",
        children: [
          {
            path: ":wikiId",
            element: <Team />,
          },
        ],
      },
      {
        path: "tournament",
        children: [
          {
            path: ":wikiId",
            element: <Tournament />,
          },
        ],
      },
      {
        path: "player",
        children: [
          {
            path: ":wikiId",
            element: <Player />,
          },
        ],
      },
    ],
  },
]);
