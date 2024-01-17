export interface SearchbarProps {
    placeholder?: string;
}

export const Searchbar = (props: SearchbarProps) => {
    return (
        <div>
            <input placeholder={props.placeholder} />
        </div>
    )
}