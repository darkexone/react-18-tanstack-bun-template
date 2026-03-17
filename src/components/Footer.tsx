import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<Box
			component="footer"
			sx={{ mt: 10, borderTop: 1, borderColor: "divider", py: 6 }}
		>
			<Container maxWidth="xl">
				<Stack
					direction={{ xs: "column", sm: "row" }}
					alignItems="center"
					justifyContent="space-between"
					spacing={1.5}
				>
					<Typography variant="body2" color="text.secondary">
						&copy; {year} Your name here. All rights reserved.
					</Typography>
					<Typography variant="overline" color="text.secondary">
						Built with TanStack Router + MUI
					</Typography>
				</Stack>
				<Stack
					direction="row"
					justifyContent="center"
					spacing={1.5}
					sx={{ mt: 2 }}
				>
					<IconButton
						href="https://x.com/tan_stack"
						target="_blank"
						rel="noreferrer"
						aria-label="Follow TanStack on X"
					>
						<XIcon />
					</IconButton>
					<IconButton
						href="https://github.com/TanStack"
						target="_blank"
						rel="noreferrer"
						aria-label="Go to TanStack GitHub"
					>
						<GitHubIcon />
					</IconButton>
				</Stack>
			</Container>
		</Box>
	);
}
