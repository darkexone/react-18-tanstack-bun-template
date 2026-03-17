import {
	Box,
	Typography,
} from "@mui/material";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/app/layout";
import { AppProviders } from "@/app/providers";
import { getLocale, locales, setLocale } from "@/shared/i18n";

interface MyRouterContext {
	queryClient: QueryClient;
}

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
		<AppProviders>
			<AppShell>
				<Outlet />
			</AppShell>
		</AppProviders>
	);
}
