import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { m } from "#/paraglide/messages";
import LocaleSwitcher from "../components/LocaleSwitcher";
import logo from "../logo.svg";

export const Route = createFileRoute("/demo/i18n")({
	component: App,
});

function App() {
	return (
		<Box
			component="header"
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#282c34",
				color: "#fff",
			}}
		>
			<Stack spacing={2} alignItems="center" textAlign="center" sx={{ px: 2 }}>
				<img
					src={logo}
					style={{
						height: "40vmin",
						pointerEvents: "none",
						animation: "spin 20s linear infinite",
					}}
					alt="logo"
				/>
				<Typography>{m.example_message({ username: "TanStack Router" })}</Typography>
				<MuiLink
					color="#61dafb"
					href="https://inlang.com/m/gerre34r/library-inlang-paraglideJs"
					target="_blank"
					rel="noopener noreferrer"
				>
					{m.learn_router()}
				</MuiLink>
				<LocaleSwitcher />
			</Stack>
			<style>{"@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }"}</style>
		</Box>
	);
}
