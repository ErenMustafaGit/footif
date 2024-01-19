import { Box, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Link = ({ link, text }: { link: string; text: string }) => {
  return (
    <NavLink to={link}>
      <Box
        padding={1}
        px={4}
        backgroundColor={
          window.location.pathname === link ? "#0C461E" : undefined
        }
        _hover={
          window.location.pathname === link
            ? {}
            : {
                backgroundColor: "#25753E",
              }
        }
        rounded={8}
      >
        <Text fontSize="xl" fontWeight="bold" color="#">
          {text}
        </Text>
      </Box>
    </NavLink>
  );
};
