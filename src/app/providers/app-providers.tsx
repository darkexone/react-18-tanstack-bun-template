import {
	Box,
	CssBaseline,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { useEffect } from "react";
import {
	TanStackQueryDevtools,
	TanStackQueryProvider,
} from "@/shared/integrations/tanstack-query";

const theme = createTheme({
	palette: {
		mode: "light",
	},
});

export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ overflowWrap: "anywhere" }}>
				<ThemeInitializer />
				<TanStackQueryProvider>
					{children}
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</TanStackQueryProvider>
			</Box>
		</ThemeProvider>
	);
}

function ThemeInitializer() {
	useEffect(() => {
		const stored = window.localStorage.getItem("theme");
		const mode =
			stored === "light" || stored === "dark" || stored === "auto"
				? stored
				: "auto";
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode;
		const root = document.documentElement;

		root.classList.remove("light", "dark");
		root.classList.add(resolved);

		if (mode === "auto") {
			root.removeAttribute("data-theme");
		} else {
			root.setAttribute("data-theme", mode);
		}

		root.style.colorScheme = resolved;
	}, []);

	return null;
}