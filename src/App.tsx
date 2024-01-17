import { Searchbar } from "./components/Searchbar";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      Footif letsgo
      <Searchbar placeholder="gabin" />
    </ChakraProvider>
  );
}

export default App;
