import {
	Box,
	CssBaseline,
	createTheme,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { getLocale, locales, setLocale } from "#/paraglide/runtime";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";

interface MyRouterContext {
	queryClient: QueryClient;
}

const theme = createTheme({
	palette: {
		mode: "light",
	},
});

// Helper: Extract locale from pathname
function extractLocaleFromPath(pathname: string): string | null {
	for (const locale of locales) {
		if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
			return locale;
		}
	}
	return null;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		// Extract locale from window.location (before rewrite transformations)
		const localeFromUrl = extractLocaleFromPath(window.location.pathname);
		if (localeFromUrl) {
			setLocale(localeFromUrl as (typeof locales)[number]);
		}

		if (typeof document !== "undefined") {
			document.documentElement.setAttribute("lang", getLocale());
		}
	},
	component: RootComponent,
	notFoundComponent: () => (
		<Box
			sx={{
				display: "flex",
				minHeight: "50vh",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: 1,
			}}
		>
			<Typography variant="h2" fontWeight={700}>
				404
			</Typography>
			<Typography variant="h6" color="text.secondary">
				Page not found
			</Typography>
		</Box>
	),
});

function RootComponent() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Box sx={{ overflowWrap: "anywhere" }}>
				<ThemeInitializer />
				<TanStackQueryProvider>
					<Header />
					<Outlet />
					<Footer />
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
