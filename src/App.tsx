import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "./containers/Layout";
import { router } from './config/routes.config';
import { RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {  
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
      <QueryClientProvider client={queryClient}>
        <Layout />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
