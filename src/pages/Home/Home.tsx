import { Box, Text } from "@chakra-ui/react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Card, Searchbar } from "../../components";
import { useEffect, useState } from "react";
import { useFetchSearch } from "../../queries";
import {
  INITIAL_DATA,
  getType,
  getWikipediaThumbnail,
  orderByPopularity,
} from "../../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";

export const Home = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const { isLoading, data, error } = useFetchSearch(search);

  const handleSubmitSearch = (val: string) => {
    setSearch(val);
    queryClient.resetQueries({ queryKey: ["fetchSearch"] });
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
        as={motion.div}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="16px"
        width="100%"
      >
        <AnimatePresence>
          {data ? (
            <>
              {orderByPopularity(data?.results?.bindings)?.map(
                (item: any, i: number) => (
                  <Card
                    key={i}
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
                    type={getType(item)}
                    wikiId={
                      item.playerID?.value ??
                      item.clubID?.value ??
                      item.ligueID?.value ??
                      "-1"
                    }
                    icon={getWikipediaThumbnail(item)}
                  />
                )
              )}
            </>
          ) : (
            <>
              {isLoading ? (
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/9e33836c-8565-4a36-92ac-97edb60d5a3e/Zw0nNwzkuz.json"
                  style={{ height: "300px", width: "300px" }}
                ></Player>
              ) : (
                INITIAL_DATA.map((item, i) => (
                  <Card
                    key={i}
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
        </AnimatePresence>
      </Box>
    </Box>
  );
};
