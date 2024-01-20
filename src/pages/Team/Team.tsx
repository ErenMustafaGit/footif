import { useParams } from "react-router";
import { useFetchTeamDetails } from "../../queries";
import {
  Image,
  Link,
  Heading,
  Box,
  Text,
  Spinner,
  Flex,
  Skeleton,
} from "@chakra-ui/react";

export const Team = () => {
  const { wikiId } = useParams();
  const { isLoading, data, error } = useFetchTeamDetails(wikiId ?? "");
  const json = data?.results?.bindings[0];
  console.log(json);
  const name = json?.name?.value;
  const thumbnail = json?.thumbnail?.value ?? "";
  const abstract = json?.abstract?.value ?? "N/A";
  const coach = json?.coach?.value ?? "N/A";
  const manager = json?.manager?.value ?? "N/A";
  const stadiumName = json?.stadiumName?.value ?? "N/A";
  const groundName = json?.groundName?.value ?? "N/A";
  const captain = json?.captain?.value ?? "N/A";
  const joueurName = json?.joueurName?.value ?? "N/A";
  const nickname = json?.nickname?.value ?? "N/A";
  const dateCreation = json?.dateCreation?.value ?? "N/A";
  const leagueID = json?.leagueID?.value ?? "N/A";
  const leagueName = json?.leagueName?.value ?? "N/A";
  const president = json?.president?.value ?? "N/A";

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
            <Link href={"/player/" + coach}>{coach}</Link>
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
            <Link href={"/player/" + captain}>{captain}</Link>
          </Box>
          <Box id="joueur">
            <Heading size="sm" marginY={"8px"}>
              Joueur
            </Heading>
            <Link href={"/player/" + joueurName}>{joueurName}</Link>
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
            <Link href={"/tournament/" + leagueID}>{leagueName}</Link>
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
