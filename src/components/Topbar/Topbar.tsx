import { Box, Image, Flex, Spacer, Text } from "@chakra-ui/react";
import { Home, Search } from "lucide-react";
import { Link } from "./Link";

export interface TopbarProps {
  placeholder?: string;
}

export const Topbar = (props: TopbarProps) => {
  return (
    <Flex
      p="4"
      bgGradient={"linear(to-r, green.700, green.800)"}
      color="white"
      alignItems="center"
      boxShadow="lg"
    >
      <Box>
        <Image
          src="logo_footif.png"
          alt="Logo"
          boxSize="50px"
          borderRadius="full"
        />
      </Box>
      <Box ml="4">
        <Text fontSize="xl" fontWeight="bold">
          Le moteur de recherche préféré des footix
        </Text>
      </Box>
      <Spacer />
      <Flex gap={4}>
        <Link link="/" text="Accueil" icon={<Home />} />
        <Link link="/features" text="Features" icon={<Search />} />
      </Flex>
    </Flex>
  );
};
