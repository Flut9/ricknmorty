import { SafeAreaProvider } from "react-native-safe-area-context"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"

import Navigator from "../navigation/Navigator"

const queryClient = new QueryClient()

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <Navigator />
            </SafeAreaProvider>
        </QueryClientProvider>
    )
}

export default App