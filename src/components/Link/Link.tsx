import { Link as LinkBase, LinkProps } from '@chakra-ui/react';

export const Link = (props: LinkProps) => {
    const { children, color } = props;

    const defaultColor = "#276648";

    return (
        <LinkBase {...props} color={color ?? defaultColor}>{children}</LinkBase>
    );
};