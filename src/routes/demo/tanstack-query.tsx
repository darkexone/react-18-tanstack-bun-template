import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo/tanstack-query")({
	component: TanStackQueryDemo,
});

function TanStackQueryDemo() {
	const { data } = useQuery({
		queryKey: ["todos"],
		queryFn: () =>
			Promise.resolve([
				{ id: 1, name: "Alice" },
				{ id: 2, name: "Bob" },
				{ id: 3, name: "Charlie" },
			]),
		initialData: [],
	});

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 2,
				backgroundImage:
					"radial-gradient(50% 50% at 95% 5%, #f4a460 0%, #8b4513 70%, #1a0f0a 100%)",
			}}
		>
			<Paper
				elevation={8}
				sx={{
					width: "100%",
					maxWidth: 900,
					p: 4,
					backdropFilter: "blur(10px)",
					backgroundColor: "rgba(0,0,0,0.55)",
					border: "8px solid rgba(0,0,0,0.1)",
					borderRadius: 3,
					color: "common.white",
				}}
			>
				<Typography variant="h5" sx={{ mb: 2 }}>
					TanStack Query Simple Promise Handling
				</Typography>
				<List sx={{ p: 0 }}>
					{data.map((todo) => (
						<ListItem
							key={todo.id}
							sx={{
								mb: 1,
								borderRadius: 2,
								border: "1px solid rgba(255,255,255,0.2)",
								backgroundColor: "rgba(255,255,255,0.08)",
							}}
						>
							<Typography variant="h6">{todo.name}</Typography>
						</ListItem>
					))}
				</List>
			</Paper>
		</Box>
	);
}
