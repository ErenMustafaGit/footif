import { useParams } from "react-router";
import {
  useFetchTeamDetails,
  useFetchWikiIdFromRessource,
} from "../../queries";
import {
  Image,
  Heading,
  Box,
  Text,
  Spinner,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "../../components";
import { Key } from "react";
import { getWikipediaThumbnail } from "../../utils";

export const Team = () => {
  const { wikiId } = useParams();
  const { isLoading, data, error } = useFetchTeamDetails(wikiId ?? "");
  const json = data?.results?.bindings[0];
  const name = json?.name?.value;
  const thumbnail = json?.thumbnail ? getWikipediaThumbnail(json) : "";
  const abstract = json?.abstract?.value ?? "N/A";
  var coach = json?.coach?.value ?? "N/A";
  if (coach.startsWith("http"))
    coach = coach.split("/").pop().replace("_", " "); // Not a player, no need to retrieve the wikiId
  var manager = json?.manager?.value ?? "N/A";
  if (manager.startsWith("http"))
    manager = manager.split("/").pop().replace("_", " "); // Not a player, no need to retrieve the wikiId
  const stadiumName = json?.stadiumName?.value ?? "N/A";
  const groundName = json?.groundName?.value ?? "N/A";
  var captain = json?.captain?.value ?? "N/A";
  if (captain.startsWith("http")) captain = captain.split("/").pop();
  const captainId =
    useFetchWikiIdFromRessource(captain).data?.results?.bindings[0].wikiId
      ?.value ?? "N/A";
  captain = captain.replace("_", " ");
  const joueursIds = json?.joueursIds?.value ?? "";
  const joueursNames = json?.joueursNames?.value ?? "";
  const joueurIdsArray = joueursIds.split(",");
  const joueurNamesArray = joueursNames.split(",");
  const nickname = json?.nickname?.value ?? "N/A";
  const dateCreation = json?.dateCreation?.value ?? "N/A";
  const leagueID = json?.leagueID?.value ?? "N/A";
  const leagueName = json?.leagueName?.value ?? "N/A";
  var president = json?.president?.value ?? "N/A";
  if (president.startsWith("http"))
    president = president.split("/").pop().replace("_", " "); // Not a player, no need to retrieve the wikiId

  if (isLoading)
    return (
      <Flex justifyContent="center" height="10rem" alignItems="center">
        <Spinner color="green" />
      </Flex>
    );
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "15px",
      }}
    >
      <Box
        id="blocgauche"
        style={{ flex: "35%", minWidth: "250px", padding: "16px" }}
      >
        {!!thumbnail ? (
          <Image src={thumbnail}></Image>
        ) : (
          <Skeleton height="400px" />
        )}
        <Box padding={"8px"}>
          <Heading size="md" marginY={"8px"}>
            Informations
          </Heading>
          <Box id="coach">
            <Heading size="sm" marginY={"8px"}>
              Coach
            </Heading>
            <Text>{coach}</Text>
          </Box>
          <Box id="manager">
            <Heading size="sm" marginY={"8px"}>
              Manager
            </Heading>
            <Text>{manager}</Text>
          </Box>
          <Box id="stadium">
            <Heading size="sm" marginY={"8px"}>
              Stadium
            </Heading>
            <Text>{stadiumName}</Text>
          </Box>
          <Box id="ground">
            <Heading size="sm" marginY={"8px"}>
              Ground
            </Heading>
            <Text>{groundName}</Text>
          </Box>
          <Box id="captain">
            <Heading size="sm" marginY={"8px"}>
              Captain
            </Heading>
            {captainId === "N/A" ? (
              <Text>{captain}</Text>
            ) : (
              <Link href={`/player/${captainId}`}>{captain}</Link>
            )}
          </Box>
          <Box id="joueurs">
            <Heading size="sm" marginY={"8px"}>
              Joueurs
            </Heading>
            {joueurIdsArray.map((joueurId: Key, index: string | number) => (
              <Box key={joueurId}>
                {joueurId === "N/A" ? <Text>{joueurNamesArray[index]}</Text> : <Link href={`/team/${joueurId}`}>{joueurNamesArray[index]}</Link>}
              </Box>
            ))}
          </Box>
          <Box id="nickname">
            <Heading size="sm" marginY={"8px"}>
              Surnom
            </Heading>
            <Text>{nickname}</Text>
          </Box>
          <Box id="dateCreation">
            <Heading size="sm" marginY={"8px"}>
              Date de création
            </Heading>
            <Text>{dateCreation}</Text>
          </Box>
          <Box id="league">
            <Heading size="sm" marginY={"8px"}>
              Ligue
            </Heading>
            {leagueID === "N/A" ? (
              <Text>{leagueName}</Text>
            ) : (
              <Link href={"/tournament/" + leagueID}>{leagueName}</Link>
            )}
          </Box>
          <Box id="president">
            <Heading size="sm" marginY={"8px"}>
              President
            </Heading>
            <Text>{president}</Text>
          </Box>
        </Box>
      </Box>
      <Box
        id="blocdroit"
        style={{ flex: "65%", minWidth: "200px", padding: "16px" }}
      >
        <Heading size="xl">{name}</Heading>
        <Text textAlign="justify">{abstract}</Text>
      </Box>
    </Box>
  );
};
