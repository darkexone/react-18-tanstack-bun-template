import {
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import type { Person } from "~/entities/person";

export type DemoTableUserListProps = {
	users: Person[];
	loading: boolean;
	isFetchingNextPage: boolean;
};

export default function DemoTableUserList({
	users,
	loading,
	isFetchingNextPage,
}: DemoTableUserListProps) {
	return (
		<TableContainer component={Paper} variant="outlined">
			<Table size="small">
				<TableHead sx={{ backgroundColor: "grey.100" }}>
					<TableRow>
						<TableCell>ID</TableCell>
						<TableCell>First name</TableCell>
						<TableCell>Last name</TableCell>
						<TableCell>Age</TableCell>
						<TableCell>Status</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{loading && !users.length ? (
						<TableRow>
							<TableCell colSpan={5}>
								<Typography variant="body2" align="center">
									Loading users…
								</Typography>
							</TableCell>
						</TableRow>
					) : users.length ? (
						users.map((user) => (
							<TableRow key={user.id} hover>
								<TableCell>{user.id}</TableCell>
								<TableCell>{user.firstName}</TableCell>
								<TableCell>{user.lastName}</TableCell>
								<TableCell>{user.age}</TableCell>
								<TableCell>{user.status}</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5}>
								<Typography variant="body2" align="center">
									No users found.
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			{isFetchingNextPage && (
				<Stack sx={{ p: 1 }} alignItems="center">
					<Typography variant="caption">Loading more…</Typography>
				</Stack>
			)}
		</TableContainer>
	);
}
