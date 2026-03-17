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
import { LocaleSwitcher } from "~/features/i18n";
import { ThemeToggle } from "~/features/theme";

export default function Header() {
	const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

	const demoLinks = [
		{ label: "TanStack Table", href: "/demo/table" },
		{ label: "Address Form", href: "/demo/form/address" },
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
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						sx={{ width: "100%", justifyContent: "space-between" }}
					>
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
							<LocaleSwitcher />
							<ThemeToggle />
						</Stack>

						<Stack
							direction="row"
							spacing={1}
							sx={{ alignItems: "center", pb: 0.5 }}
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
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
