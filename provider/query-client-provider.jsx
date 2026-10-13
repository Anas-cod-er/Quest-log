"use client";

import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function QueryClientProviderClient({children}){
    const [queryclient] = useState(()=> new QueryClient());
    
    return(
        <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    );
}

export default QueryClientProviderClient;