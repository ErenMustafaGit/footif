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
      <Box id="blocgauche" style={{ flex: "35%", minWidth: "100px" }}>
        <Image src={thumbnail}></Image>
        <Box>
          <Heading size="md">Main details</Heading>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">National: </Text>
            <Text>{nationalteam}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Position: </Text>
            <Text>{positionname}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Birth date: </Text>
            <Text>{birthdate}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Birth place: </Text>
            <Text>{birthplace}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Height: </Text>
            <Text>{height}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Number: </Text>
            <Text>{number}</Text>
          </Box>
          <Box display={"flex"} flexDirection={"row"}>
            <Text fontWeight="bold">Current club: </Text>
            <Link href={"/team/" + currentclubid}>{currentclubname}</Link>
          </Box>
        </Box>
      </Box>
      <Box id="blocdroit" style={{ flex: "65%", minWidth: "200px" }}>
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
