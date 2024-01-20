import { CardProps } from "../components";
import { TYPE } from "./enums";

export const WIKIPEDIA_RESSOURCE_URL = "https://en.wikipedia.org/wiki/File:";

export const INITIAL_DATA: CardProps[] = [
  {
    icon: "galatasaray.png",
    title: "Galatasaray S.K.",
    subtitle: "Club",
    type: TYPE.TEAM,
    wikiId: "23608452",
  },
  {
    icon: "psg.jpg",
    title: "Paris Saint-Germain F.C.",
    subtitle: "Club",
    type: TYPE.TEAM,
    wikiId: "357488",
  },
  {
    icon: "ronaldo.jpeg",
    title: " Cristiano Ronaldo",
    subtitle: "Joueur",
    type: TYPE.PLAYER,
    wikiId: "623737",
  },
  {
    icon: "ligue1.png",
    title: "Ligue 1",
    subtitle: "Ligue",
    type: TYPE.TOURNAMENT,
    wikiId: "1082929",
  },
  {
    icon: "barca.png",
    title: "FC Barcelone",
    subtitle: "Club",
    type: TYPE.TEAM,
    wikiId: "68187",
  },
  {
    icon: "messi.jpg",
    title: "Lionel Messi",
    subtitle: "Joueur",
    type: TYPE.PLAYER,
    wikiId: "2150841",
  },
];
