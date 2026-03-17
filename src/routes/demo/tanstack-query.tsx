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
			}}
		>
			<Paper
				elevation={8}
				sx={{
					width: "100%",
					maxWidth: 900,
					p: 4,
					backdropFilter: "blur(10px)",
					border: "8px solid rgba(0,0,0,0.1)",
					borderRadius: 3,
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
