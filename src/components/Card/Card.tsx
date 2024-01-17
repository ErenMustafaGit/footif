import { Card as CardBase, CardBody, CardHeader } from "@chakra-ui/card";

export interface CardProps {
    icon?: string;
    title?: string;
    subtitle?: string;
};

export const Card = ({icon, title, subtitle}: CardProps) => {
    return (
        <CardBase>
            <CardHeader title={title}></CardHeader>
        </CardBase>
    );
};