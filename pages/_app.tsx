import React from "react";
import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import { AppProps } from "next/app";
function App({ Component, pageProps }: AppProps): React.ReactNode {
    return (
        <ThemeProvider>
            <CSSReset />
            <Box minH="100vh" d="grid" gridTemplateRows="auto 1fr auto">
                <Component {...pageProps} />

            </Box>
        </ThemeProvider>
    );
}
export default App;