import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/sentry/testing")({
	component: SentryDemoRoute,
});

function SentryDemoRoute() {
	return (
		<div className="min-h-screen bg-slate-950 text-slate-100">
			<div className="mx-auto max-w-3xl px-6 py-20">
				<h1 className="text-3xl font-bold tracking-tight">Sentry Demo</h1>
				<p className="mt-4 text-slate-300">
					This template now runs as a plain Vite + TanStack Router app, so
					TanStack Start server-function examples are intentionally removed.
				</p>
				<p className="mt-3 text-slate-400">
					If you need Sentry in this setup, use the client SDK integration in
					Vite and wire API monitoring separately.
				</p>
			</div>
		</div>
	);
}
