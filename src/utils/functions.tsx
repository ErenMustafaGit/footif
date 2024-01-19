import { TYPE } from "./enums";

export const getType = (item: any): TYPE => {
  if (item.playerName?.value) return TYPE.PLAYER;
  if (item.clubName?.value) return TYPE.TEAM;
  if (item.ligueName?.value) return TYPE.TOURNAMENT;
  return TYPE.UNKNOWN;
};

export const getPopularity = (item: any): number => {
  if (item.popularityPlayer?.value)
    return parseInt(item.popularityPlayer.value);
  if (item.popularityClub?.value) return parseInt(item.popularityClub.value);
  if (item.popularityLigue?.value) return parseInt(item.popularityLigue.value);
  return 0;
};

export const orderByPopularity = (data: any) => {
  console.log(data);
  return data.sort((a: any, b: any) => {
    return getPopularity(b) - getPopularity(a);
  });
};
