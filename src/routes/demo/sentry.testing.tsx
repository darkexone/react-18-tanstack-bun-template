import { Box, Container, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/sentry/testing")({
	component: SentryDemoRoute,
});

function SentryDemoRoute() {
	return (
		<Box sx={{ minHeight: "100vh", bgcolor: "grey.900", color: "grey.100" }}>
			<Container maxWidth="md" sx={{ py: 10 }}>
				<Typography variant="h3" fontWeight={700}>
					Sentry Demo
				</Typography>
				<Typography sx={{ mt: 2 }} color="grey.300">
					This template now runs as a plain Vite + TanStack Router app, so
					TanStack Start server-function examples are intentionally removed.
				</Typography>
				<Typography sx={{ mt: 2 }} color="grey.400">
					If you need Sentry in this setup, use the client SDK integration in
					Vite and wire API monitoring separately.
				</Typography>
			</Container>
		</Box>
	);
}
