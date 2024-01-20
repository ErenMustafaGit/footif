import { Box, Image, Flex, Spacer, Text } from "@chakra-ui/react";
import { Home, Search } from "lucide-react";
import { Link } from "./Link";
import { NavLink } from "react-router-dom";

export const Topbar = () => {
  return (
    <Flex
      p="4"
      bgGradient={"linear(to-r, green.700, green.800)"}
      color="white"
      alignItems="center"
      boxShadow="lg"
    >
      <Box>
        <NavLink to="/">
          <Image
            src="/logo_footif.png"
            alt="Logo"
            boxSize="50px"
            borderRadius="full"
          />
        </NavLink>
      </Box>
      <Box ml="4">
        <Text fontSize={{ base: "sm", md: "lg" }} fontWeight="bold">
          Le moteur de recherche préféré des footix
        </Text>
      </Box>
      <Spacer />
      <Flex hidden gap={4}>
        <Link link="/" text="Accueil" icon={<Home />} />
        <Link link="/features" text="Features" icon={<Search />} />
      </Flex>
    </Flex>
  );
};
