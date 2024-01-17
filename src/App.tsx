import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./containers/Layout";
import { useFetchPlayers } from './queries';

const queryClient = new QueryClient();

function App() {  
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
