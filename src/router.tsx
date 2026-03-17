import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { getContext } from "@/shared/integrations/tanstack-query";
import { deLocalizeUrl, localizeUrl } from "@/shared/i18n";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,

		context: getContext(),

		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,

		rewrite: {
			input: ({ url }) => deLocalizeUrl(url),
			output: ({ url }) => localizeUrl(url),
		},
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
