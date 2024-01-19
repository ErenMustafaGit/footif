import { useParams } from "react-router";
import { useFetchPlayerDetails } from "../../queries/queries";
import { Image, Link, Heading, Box, Text } from "@chakra-ui/react";
import { Key } from "react";

export const Player = () => {
  const { wikiId } = useParams();
  const { isLoading, data, error } = useFetchPlayerDetails(wikiId ?? "");
  const json = data?.results?.bindings[0];
  console.log(json);
  const name = json?.name?.value;
  const thumbnail = json?.thumbnail?.value ?? "";
  const abstract = json?.abstract?.value ?? "N/A";
  const nationalteam = json?.nationalteamname?.value ?? "N/A";
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "15px",
      }}
    >
      <Box id="blocgauche" style={{ flex: "35%", minWidth: "250px", padding: "32px" }}>
        <Image src={thumbnail}></Image>
        <Box>
          <Heading size="md">Informations</Heading>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Equipe Nationale : </Text>
            <Text>{nationalteam}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Position : </Text>
            <Text>{positionname}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Date de naissance : </Text>
            <Text>{birthdate}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Lieu de naissance : </Text>
            <Text>{birthplace}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Taille : </Text>
            <Text>{height}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Numéo : </Text>
            <Text>{number}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Club actuel : </Text>
            <Link href={"/team/" + currentclubid}>{currentclubname}</Link>
          </Box>
        </Box>
      </Box>
      <Box id="blocdroit" style={{ flex: "65%", minWidth: "200px", padding: "32px" }}>
        <Heading size="xl">{name}</Heading>
        <Text>{abstract}</Text>
        <Box id="clubs">
            <Heading size="md">Clubs</Heading>
            {clubsidsArray.map((clubId: Key, index: string | number) => (
                <Box key={clubId}>
                <Link href={"/team/" + clubId}>{clubsnamesArray[index]}</Link>
                </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
