import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./containers/Layout";

function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
}

export default App;
