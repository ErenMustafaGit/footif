import { Card as CardBase, CardBody } from "@chakra-ui/card";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FADE_UP_ANIMATION_VARIANTS, TYPE } from "../../utils";
import { motion } from "framer-motion";

export interface CardProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  wikiId?: string;
  type?: string;
}

export const Card = ({ icon, title, subtitle, wikiId, type }: CardProps) => {
  const navigator = useNavigate();

  const handleClick = () => {
    console.log(title);
    switch (type) {
      case TYPE.PLAYER:
        navigator(`/player/${wikiId}`);
        break;
      case TYPE.TEAM:
        navigator(`/team/${wikiId}`);
        break;
      case TYPE.TOURNAMENT:
        navigator(`/tournament/${wikiId}`);
        break;
      default:
        break;
    }
  };

  return (
    <CardBase
      as={motion.div}
      variants={FADE_UP_ANIMATION_VARIANTS}
      borderRadius="md"
      size="100px"
      direction={{ base: "column", sm: "row" }}
      variant={"outline"}
      width="100%"
      onClick={() => handleClick()}
      _hover={{
        backgroundColor: "gray.50",
        transform: "scale(1.01)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      style={{
        cursor: "pointer",
      }}
    >
      <Image
        objectFit="cover"
        src={icon}
        height={{ base: "100px", sm: "100px" }}
        width={{ base: "100%", sm: "100px" }}
      />
      <Stack padding="2">
        <CardBody>
          <Heading size={"md"}>{title}</Heading>
          <Text py="2">{subtitle}</Text>
        </CardBody>
      </Stack>
    </CardBase>
  );
};
