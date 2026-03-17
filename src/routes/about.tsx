import { Container, Paper, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<Container maxWidth="lg" sx={{ py: 6 }}>
			<Paper sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3 }} elevation={1}>
				<Typography variant="overline" color="text.secondary">
					About
				</Typography>
				<Typography variant="h3" sx={{ mb: 2, fontWeight: 800 }}>
					A small starter with room to grow.
				</Typography>
				<Typography sx={{ maxWidth: 900 }} color="text.secondary">
					TanStack Start gives you type-safe routing, server functions, and
					modern SSR defaults. Use this as a clean foundation, then layer in
					your own routes, styling, and add-ons.
				</Typography>
			</Paper>
		</Container>
	);
}
