import { CardProps } from "../components";
import { TYPE } from "./enums";

export const INITIAL_DATA: CardProps[] = [
  {
    icon: "barca.png",
    title: "FC Barcelone",
    subtitle: "Club",
    type: TYPE.TEAM,
    wikiId: "68187",
  },
  {
    icon: "ronaldo.jpeg",
    title: " Cristiano Ronaldo",
    subtitle: "Joueur",
    type: TYPE.PLAYER,
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
