import { Input } from "@chakra-ui/react";

export interface SearchbarProps {
    placeholder?: string;
    width?: string;
}

export const Searchbar = (props: SearchbarProps) => {
    return (
        <Input
            placeholder={props.placeholder}
            width={props.width}
        />
    )
}