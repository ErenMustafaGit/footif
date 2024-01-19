import { Card as CardBase, CardBody } from "@chakra-ui/card";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export interface CardProps {
    icon?: string;
    title?: string;
    subtitle?: string;
    type?: string;
    width?: string;
};



export const Card = ({ icon, title, subtitle, type, width }: CardProps) => {
    const navigator = useNavigate();

    const handleClick = () => {
        console.log(title);
        switch (type) {
            case "player":
                navigator(`/player/${title}`);
                break;
            case "team":
                navigator(`/team/${title}`);
                break;
            default:
                break;
        }
    }
    return (
        <CardBase variant={"outline"} width={width} onClick={()=>handleClick()}>
            <Image src="" />
            <Stack>
                <CardBody>
                    <Heading size={"md"}>{title}</Heading>
                    <Text>{subtitle}</Text>
                </CardBody>
            </Stack>
        </CardBase>
    );
};