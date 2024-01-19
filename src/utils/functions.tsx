import { TYPE } from "./enums";

export const getType = (item: any): TYPE => {
  if (item.playerName?.value) return TYPE.PLAYER;
  if (item.clubName?.value) return TYPE.TEAM;
  if (item.ligueName?.value) return TYPE.TOURNAMENT;
  return TYPE.UNKNOWN;
};
