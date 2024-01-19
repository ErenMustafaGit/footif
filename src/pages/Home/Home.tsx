import { Box, Spinner } from "@chakra-ui/react";
import { Card, Searchbar } from "../../components";
import { useEffect, useState } from "react";
import { useFetchSearch } from "../../queries";

export const Home = () => {
  const [search, setSearch] = useState<string>("");
  const { isLoading, data, error } = useFetchSearch(search);

  const handleSubmitSearch = (val: string) => {
    setSearch(val);
  };

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="32px"
      padding="32px"
      width="100%"
    >
      <Searchbar
        onSubmit={handleSubmitSearch}
        placeholder="Recherchez un joueur, un club, ..."
        width="60%"
      />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="16px"
        width="100%"
      >
        {data ? (
          <>
            {data?.results?.bindings?.map((item: any) => (
              <Card
                title={
                  item.playerName?.value ??
                  item.clubName?.value ??
                  item.ligueName?.value ??
                  "Unsupported type"
                }
                subtitle={
                  item.playerName?.value
                    ? "Joueur"
                    : item.clubName?.value
                    ? "Club"
                    : item.ligueName?.value
                    ? "Championnat"
                    : "Unsupported type"
                }
                type={
                  item.playedID?.value
                    ? "player"
                    : item.clubID?.value
                    ? "team"
                    : item.ligueID?.value
                    ? "ligue"
                    : ""
                }
                wikiId={
                  item.playedID?.value ??
                  item.clubID?.value ??
                  item.ligueID?.value ??
                  "-1"
                }
                width="100%"
              />
            ))}
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <Card
                  icon="messi.jpg"
                  title="Lionel Messi"
                  subtitle="Joueur"
                  type="player"
                  wikiId="2150841"
                  width="100%"
                />

                <Card
                  icon="barca.png"
                  title="FC Barcelone"
                  subtitle="Club"
                  type="team"
                  wikiId="68187"
                  width="100%"
                />

                <Card
                  icon="ronaldo.jpeg"
                  title=" Cristiano Ronaldo"
                  subtitle="Joueur"
                  type="team"
                  wikiId="68187"
                  width="100%"
                />
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
