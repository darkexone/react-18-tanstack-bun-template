import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";

import { fullName, store } from "#/lib/demo-store";

export const Route = createFileRoute("/demo/store")({
	component: DemoStore,
});

function FirstName() {
	const firstName = useStore(store, (state) => state.firstName);
	return (
		<TextField
			type="text"
			value={firstName}
			onChange={(e) =>
				store.setState((state) => ({ ...state, firstName: e.target.value }))
			}
			size="small"
			fullWidth
			label="First name"
		/>
	);
}

function LastName() {
	const lastName = useStore(store, (state) => state.lastName);
	return (
		<TextField
			type="text"
			value={lastName}
			onChange={(e) =>
				store.setState((state) => ({ ...state, lastName: e.target.value }))
			}
			size="small"
			fullWidth
			label="Last name"
		/>
	);
}

function FullName() {
	const fName = useStore(fullName, (state) => state);
	return (
		<Paper variant="outlined" sx={{ px: 2, py: 1.25 }}>
			<Typography>{fName}</Typography>
		</Paper>
	);
}

function DemoStore() {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 4,
			}}
		>
			<Paper
				elevation={8}
				sx={{
					width: "100%",
					maxWidth: 760,
					p: 4,
					backdropFilter: "blur(10px)",
					borderRadius: 3,
				}}
			>
				<Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
					Store Example
				</Typography>
				<Stack spacing={2}>
					<FirstName />
					<LastName />
					<FullName />
				</Stack>
			</Paper>
		</Box>
	);
}
