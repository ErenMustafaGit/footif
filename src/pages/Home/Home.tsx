import { Box, Spinner, Text } from "@chakra-ui/react";
import { Card, Searchbar } from "../../components";
import { useEffect, useState } from "react";
import { useFetchSearch } from "../../queries";
import { INITIAL_DATA } from "../../utils";

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

  if (error) return <Text>{error.message}</Text>;

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
        width="100%"
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
              />
            ))}
          </>
        ) : (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              INITIAL_DATA.map((item) => (
                <Card
                  title={item.title}
                  subtitle={item.subtitle}
                  type={item.type}
                  wikiId={item.wikiId}
                  icon={item.icon}
                />
              ))
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
