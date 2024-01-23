import { useParams } from "react-router";
import { useFetchPlayerDetails } from "../../queries/queries";
import {
  Image,
  Heading,
  Box,
  Text,
  Spinner,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { Key } from "react";
import { Link } from "../../components";

export const Player = () => {
  const { wikiId } = useParams();
  const { isLoading, data, error } = useFetchPlayerDetails(wikiId ?? "");
  const json = data?.results?.bindings[0];
  const name = json?.name?.value;
  const thumbnail = json?.thumbnail?.value ?? "";
  const abstract = json?.abstract?.value ?? "N/A";
  const nationalteam = json?.nationalteamname?.value ?? "N/A";
  const nationalteamid = json?.nationalteamid?.value ?? "N/A";
  const positionname = json?.positionname?.value ?? "N/A";
  const birthdate = json?.datebirth?.value ?? "N/A";
  const birthplace = json?.placebirthname?.value ?? "N/A";
  const height = json?.height?.value ?? "N/A";
  const number = json?.number?.value ?? "N/A";
  const currentclubid = json?.currentclubid?.value ?? "N/A";
  const currentclubname = json?.currentclubname?.value ?? "N/A";
  const clubsids = json?.clubsids?.value ?? "";
  const clubsnames = json?.clubsnames?.value ?? "";
  const clubsidsArray = clubsids.split(",");
  const clubsnamesArray = clubsnames.split(",");

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
          <Box id="nationalteam">
            <Heading size="sm" marginY={"8px"}>
              Equipe nationale
            </Heading>
            {nationalteamid === "N/A" ? <Text>{nationalteamid}</Text> : <Link href={`/team/${nationalteamid}`}>{nationalteam}</Link>}
          </Box>
          <Box id="positionname">
            <Heading size="sm" marginY={"8px"}>
              Poste
            </Heading>
            {positionname}
          </Box>
          <Box id="birthdate">
            <Heading size="sm" marginY={"8px"}>
              Date de naissance
            </Heading>
            {birthdate}
          </Box>
          <Box id="birthplace">
            <Heading size="sm" marginY={"8px"}>
              Lieu de naissance
            </Heading>
            {birthplace}
          </Box>
          <Box id="height">
            <Heading size="sm" marginY={"8px"}>
              Taille
            </Heading>
            {height}
          </Box>
          <Box id="number">
            <Heading size="sm" marginY={"8px"}>
              Numéro
            </Heading>
            {number}
          </Box>
          <Box id="currentclub">
            <Heading size="sm" marginY={"8px"}>
              Club actuel
            </Heading>
            {currentclubid === "N/A" ? <Text>{currentclubid}</Text> : <Link href={`/team/${currentclubid}`}>{currentclubname}</Link>}
          </Box>
          <Box id="clubs">
            <Heading size="md" marginY={"8px"}>
              Clubs
            </Heading>
            {clubsidsArray.map((clubId: Key, index: string | number) => (
              <Box key={clubId}>
                {clubId === "N/A" ? <Text>{clubsnamesArray[index]}</Text> : <Link href={`/team/${clubId}`}>{clubsnamesArray[index]}</Link>}
              </Box>
            ))}
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
