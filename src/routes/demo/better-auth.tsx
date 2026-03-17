import {
	Alert,
	Avatar,
	Box,
	Button,
	CircularProgress,
	Link as MuiLink,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "#/lib/auth-client";

export const Route = createFileRoute("/demo/better-auth")({
	component: BetterAuthDemo,
});

function BetterAuthDemo() {
	const { data: session, isPending } = authClient.useSession();
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (isPending) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
				<CircularProgress size={22} />
			</Box>
		);
	}

	if (session?.user) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", py: 8, px: 2 }}>
				<Paper sx={{ width: "100%", maxWidth: 520, p: 3.5 }}>
					<Stack spacing={3}>
						<Box>
							<Typography variant="h6" fontWeight={700}>
							Welcome back
							</Typography>
							<Typography variant="body2" color="text.secondary">
							You're signed in as {session.user.email}
							</Typography>
						</Box>

						<Stack direction="row" spacing={1.5} alignItems="center">
						{session.user.image ? (
							<Avatar src={session.user.image} alt="" />
						) : (
							<Avatar variant="rounded">
									{session.user.name?.charAt(0).toUpperCase() || "U"}
							</Avatar>
						)}
							<Box sx={{ minWidth: 0, flex: 1 }}>
								<Typography variant="body2" fontWeight={600} noWrap>
								{session.user.name}
								</Typography>
								<Typography variant="caption" color="text.secondary" noWrap>
								{session.user.email}
								</Typography>
							</Box>
						</Stack>

						<Button
						type="button"
						onClick={() => {
							void authClient.signOut();
						}}
						variant="outlined"
						fullWidth
					>
						Sign out
						</Button>

						<Typography variant="caption" color="text.secondary" textAlign="center">
						Built with{" "}
						<MuiLink
							href="https://better-auth.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							BETTER-AUTH
						</MuiLink>
						.
						</Typography>
					</Stack>
				</Paper>
			</Box>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (isSignUp) {
				const result = await authClient.signUp.email({
					email,
					password,
					name,
				});
				if (result.error) {
					setError(result.error.message || "Sign up failed");
				}
			} else {
				const result = await authClient.signIn.email({
					email,
					password,
				});
				if (result.error) {
					setError(result.error.message || "Sign in failed");
				}
			}
		} catch {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "center", py: 8, px: 2 }}>
			<Paper sx={{ width: "100%", maxWidth: 520, p: 3.5 }}>
				<Typography variant="h6" fontWeight={700}>
					{isSignUp ? "Create an account" : "Sign in"}
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
					{isSignUp
						? "Enter your information to create an account"
						: "Enter your email below to login to your account"}
				</Typography>

				<Stack component="form" onSubmit={handleSubmit} spacing={2}>
					{isSignUp && (
						<TextField
								id="name"
								type="text"
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
					)}

					<TextField
							id="email"
							type="email"
							label="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

					<TextField
							id="password"
							type="password"
							label="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={8}
						/>

					{error && (
						<Alert severity="error" variant="outlined">
							{error}
						</Alert>
					)}

					<Button
						type="submit"
						disabled={loading}
						variant="contained"
						fullWidth
					>
						{loading ? (
							"Please wait"
						) : isSignUp ? (
							"Create account"
						) : (
							"Sign in"
						)}
					</Button>
				</Stack>

				<Box sx={{ mt: 2, textAlign: "center" }}>
					<Button
						type="button"
						onClick={() => {
							setIsSignUp(!isSignUp);
							setError("");
						}}
						variant="text"
						size="small"
					>
						{isSignUp
							? "Already have an account? Sign in"
							: "Don't have an account? Sign up"}
					</Button>
				</Box>

				<Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: "block", textAlign: "center" }}>
					Built with{" "}
					<MuiLink
						href="https://better-auth.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						BETTER-AUTH
					</MuiLink>
					.
				</Typography>
			</Paper>
		</Box>
	);
}
