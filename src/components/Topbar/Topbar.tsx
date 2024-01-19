import { Box, Image, Flex, Spacer, Link, Text } from '@chakra-ui/react';
import { NavLink } from "react-router-dom";

export interface TopbarProps {
    placeholder?: string;
}


export const Topbar = (props: TopbarProps) => {
    return (

    <Flex p="4" bg="#17642f" color="white" alignItems="center" boxShadow="lg">
      <Box>
        <Image src="logo_footif.png" alt="Logo" boxSize='50px' borderRadius='full'/>
      </Box>
      <Box ml="4">
      <Text fontSize='xl' fontWeight="bold">
        Le moteur de recherche préféré des footix
      </Text>
      </Box>
      <Spacer />
      <Box ml="10" >
      <NavLink to="/features" >
        <Text fontSize='xl' fontWeight="bold" textDecoration={window.location.pathname === "/features" ? "underline" : "none"} color="#" _hover={window.location.pathname === "/features" ? {} : { color: "#FFFFFF", opacity: 0.9, textShadow: "0px 0px 0px #333" }}>
          Features
        </Text>
      </NavLink>
      </Box>
      <Box ml="10" >
      <NavLink to="/" >
        <Text fontSize='xl' fontWeight="bold" textDecoration={window.location.pathname === "/" ? "underline" : "none"} color="#" _hover={window.location.pathname === "/" ? {} : { color: "#FFFFFF", opacity: 0.9, textShadow: "0px 0px 0px #333" }}>
          Accueil
        </Text>
      </NavLink>
      </Box>
    </Flex>
    )
}