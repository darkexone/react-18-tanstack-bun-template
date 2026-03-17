import { Avatar, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { authClient } from "#/lib/auth-client";

export default function BetterAuthHeader() {
	const { data: session, isPending } = authClient.useSession();

	if (isPending) {
		return <CircularProgress size={18} />;
	}

	if (session?.user) {
		return (
			<Stack direction="row" spacing={1} alignItems="center">
				{session.user.image ? (
					<Avatar src={session.user.image} sx={{ width: 32, height: 32 }} />
				) : (
					<Avatar variant="rounded" sx={{ width: 32, height: 32 }}>
						<Typography variant="caption" fontWeight={600}>
							{session.user.name?.charAt(0).toUpperCase() || "U"}
						</Typography>
					</Avatar>
				)}
				<Button
					type="button"
					onClick={() => {
						void authClient.signOut();
					}}
					size="small"
					variant="outlined"
				>
					Sign out
				</Button>
			</Stack>
		);
	}

	return (
		<Button component={Link} to="/demo/better-auth" size="small" variant="outlined">
			<Box component="span">Sign in</Box>
		</Button>
	);
}
