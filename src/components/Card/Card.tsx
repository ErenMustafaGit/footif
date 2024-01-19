import { Card as CardBase, CardBody } from "@chakra-ui/card";
import { Heading, Image, Stack, Text } from "@chakra-ui/react";

export interface CardProps {
    icon?: string;
    title?: string;
    subtitle?: string;
    width?: string;
};

export const Card = ({ icon, title, subtitle, width }: CardProps) => {
    return (
        <CardBase variant={"outline"} width={width}>
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