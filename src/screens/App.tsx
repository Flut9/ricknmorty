import { SafeAreaProvider } from "react-native-safe-area-context"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ThemeProvider } from "styled-components"

import Navigator from "../navigation/Navigator"
import { theme } from "../shared/ui/theme/colors"

const queryClient = new QueryClient()

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider>
                    <Navigator />
                </SafeAreaProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App