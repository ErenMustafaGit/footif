import { WIKIPEDIA_RESSOURCE_URL } from "./const";
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
// Function for Export FilePath from http://commons.wikimedia.org/wiki/Special:FilePath/Henri_Scharry_(1928).jpg?width=300
export const getWikipediaFilePath = (filePathUrl: any): string => {
  const regex = /[^\/]+(?=\?width)/;
  const match = filePathUrl.match(regex);
  if (match && match[0]) {
    return match[0];
  }
  return "";
};

export const getWikipediaThumbnail = (item: any): string => {
  let thumbnail = "";
  if (item.imgPlayer?.value) thumbnail = item.imgPlayer.value;
  if (item.imgClub?.value) thumbnail = item.imgClub.value;
  if (item.imgLigue?.value) thumbnail = item.imgLigue.value;

  return `https://en.wikipedia.org/w/index.php?title=Special:Redirect/file/File:${getWikipediaFilePath(
    thumbnail
  )}`;
};
