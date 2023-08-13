import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { createEmotionCache, MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { reactQueryClient } from "configs";
import { ModalsProvider } from "@mantine/modals";

const myCache = createEmotionCache({ key: "mantine", prepend: false });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={reactQueryClient}>
			<MantineProvider withGlobalStyles withNormalizeCSS emotionCache={myCache}>
				<ModalsProvider>
					<Component {...pageProps} />
				</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
