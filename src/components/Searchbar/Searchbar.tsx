import { Input } from "@chakra-ui/react";

export interface SearchbarProps {
  onChange?: () => void;
  onSubmit?: (search: string) => void;
  placeholder?: string;
  width?: string;
}

export const Searchbar = (props: SearchbarProps) => {
  const handleSubmit = (e: any) => {
    // Prevents the page from reloading
    e.preventDefault();
    // Gets the value of the input
    const search = e.target[0].value;
    // Calls the onSubmit function with the search value
    if (props.onSubmit) props.onSubmit(search);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100% " }}>
      <Input
        color={"green.500"}
        placeholder={props.placeholder}
        onSubmit={() => console.log("heyy")}
        width={props.width}
      />
    </form>
  );
};
