import { Card as CardBase, CardBody } from "@chakra-ui/card";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface CardProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  wikiId?: string;
  type?: string;
  width?: string;
}

export const Card = ({
  icon,
  title,
  subtitle,
  wikiId,
  type,
  width,
}: CardProps) => {
  const navigator = useNavigate();

  const handleClick = () => {
    console.log(title);
    switch (type) {
      case "player":
        navigator(`/player/${wikiId}`);
        break;
      case "team":
        navigator(`/team/${wikiId}`);
        break;
      case "tournament":
        navigator(`/tournament/${wikiId}`);
        break;
      default:
        break;
    }
  };

  return (
    <CardBase
      size="100px"
      direction={{ base: "column", sm: "row" }}
      variant={"outline"}
      width={width}
      onClick={() => handleClick()}
    >
      <Image objectFit="cover" src={icon} maxW={{ base: '100%', sm: '100px' }} />

      <Stack padding ="2">
        <CardBody>
          <Heading size={"md"}>{title}</Heading>
          <Text py="2">{subtitle}</Text>
        </CardBody>
      </Stack>
    </CardBase>
  );
};
