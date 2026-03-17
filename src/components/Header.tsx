import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import MenuIcon from "@mui/icons-material/Menu";
import XIcon from "@mui/icons-material/X";
import {
	AppBar,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import ParaglideLocaleSwitcher from "./LocaleSwitcher.tsx";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

	const demoLinks = [
		{ label: "Store", href: "/demo/store" },
		{ label: "TanStack Table", href: "/demo/table" },
		{ label: "I18n example", href: "/demo/i18n" },
		{ label: "Simple Form", href: "/demo/form/simple" },
		{ label: "Address Form", href: "/demo/form/address" },
		{ label: "Sentry", href: "/demo/sentry/testing" },
		{ label: "TanStack Query", href: "/demo/tanstack-query" },
		{ label: "Storybook", href: "/demo/storybook" },
	];

	return (
		<AppBar
			position="sticky"
			color="transparent"
			elevation={0}
			sx={{
				borderBottom: 1,
				borderColor: "divider",
				backdropFilter: "blur(10px)",
			}}
		>
			<Container maxWidth="xl">
				<Toolbar sx={{ gap: 1.5, flexWrap: "wrap", py: 1.25 }} disableGutters>
					<Stack direction="row" spacing={0.75} sx={{ ml: "auto" }}>
						<IconButton
							href="https://x.com/tan_stack"
							target="_blank"
							rel="noreferrer"
							aria-label="Follow TanStack on X"
						>
							<XIcon fontSize="small" />
						</IconButton>
						<IconButton
							href="https://github.com/TanStack"
							target="_blank"
							rel="noreferrer"
							aria-label="Go to TanStack GitHub"
						>
							<GitHubIcon fontSize="small" />
						</IconButton>
						<ParaglideLocaleSwitcher />
						<ThemeToggle />
					</Stack>

					<Stack
						direction="row"
						spacing={1}
						sx={{ width: "100%", alignItems: "center", pb: 0.5 }}
					>
						<Button component={Link} to="/" color="inherit">
							Home
						</Button>
						<Button component={Link} to="/about" color="inherit">
							About
						</Button>
						<Button
							href="https://tanstack.com/router/latest/docs/framework/react/overview"
							target="_blank"
							rel="noreferrer"
							endIcon={<LaunchIcon fontSize="small" />}
							color="inherit"
						>
							Docs
						</Button>
						<IconButton
							onClick={(event) => setMenuAnchor(event.currentTarget)}
							aria-label="Open demo routes"
							sx={{ ml: "auto" }}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							anchorEl={menuAnchor}
							open={Boolean(menuAnchor)}
							onClose={() => setMenuAnchor(null)}
						>
							{demoLinks.map((link) => (
								<MenuItem
									key={link.href}
									component="a"
									href={link.href}
									onClick={() => setMenuAnchor(null)}
								>
									<Typography variant="body2">{link.label}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
