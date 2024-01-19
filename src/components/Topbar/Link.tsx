import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Link = ({
  link,
  text,
  icon,
}: {
  link: string;
  text: string;
  icon: any;
}) => {
  return (
    <NavLink to={link}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
        padding={1}
        px={4}
        backgroundColor={
          window.location.pathname === link ? "green.900" : undefined
        }
        _hover={
          window.location.pathname === link
            ? {}
            : {
                backgroundColor: "green.700",
              }
        }
        rounded={8}
      >
        {icon}
        <Text fontSize="xl" fontWeight="bold">
          {text}
        </Text>
      </Flex>
    </NavLink>
  );
};
