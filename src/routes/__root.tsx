import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { getLocale } from "#/paraglide/runtime";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import StoreDevtools from "../lib/demo-store-devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		// Other redirect strategies are possible; see
		// https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
		if (typeof document !== "undefined") {
			document.documentElement.setAttribute("lang", getLocale());
		}
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<div className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
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
						StoreDevtools,
						TanStackQueryDevtools,
					]}
				/>
			</TanStackQueryProvider>
		</div>
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
