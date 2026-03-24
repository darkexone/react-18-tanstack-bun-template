import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { getMockUsersPage } from "~/features/demo-table";
import { DemoTableUserList } from "~/widgets/demo-table";

export default function DemoTablePage() {
	const constPageSize = 10;
	const { users, total } = React.useMemo(
		() => getMockUsersPage({ pageSize: constPageSize }),
		[],
	);

	return (
		<Box sx={{ minHeight: "100vh", p: 3 }}>
			<Stack spacing={3}>
				<Typography variant="h4">User directory</Typography>
				<DemoTableUserList
					users={users}
					loading={false}
					isFetchingNextPage={false}
				/>
				<Typography variant="body2">
					Showing all {users.length} users from our mock dataset ({total}{" "}
					total).
				</Typography>
				{/* <DemoTablePaginationControls /> */}
			</Stack>
		</Box>
	);
}
