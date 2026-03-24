import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";

export type DemoTablePaginationControlsProps = {
	pageSize: number;
	onChangePageSize: (value: number) => void;
	fetchedCount: number;
	totalCount: number;
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	onRefresh: () => void;
};

const PAGE_SIZE_OPTIONS = [10, 20, 30];

export default function DemoTablePaginationControls({
	pageSize,
	onChangePageSize,
	fetchedCount,
	totalCount,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
	onRefresh,
}: DemoTablePaginationControlsProps) {
	return (
		<Stack
			direction="row"
			spacing={2}
			alignItems="center"
			justifyContent="space-between"
			flexWrap="wrap"
		>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography variant="body2">
					Showing {fetchedCount} of {totalCount}
				</Typography>
				<Typography variant="body2">Page size</Typography>
				<Select
					value={pageSize}
					onChange={(event) => onChangePageSize(Number(event.target.value))}
					size="small"
				>
					{PAGE_SIZE_OPTIONS.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</Select>
			</Stack>
			<Stack direction="row" spacing={1} alignItems="center">
				<Button
					variant="outlined"
					onClick={fetchNextPage}
					disabled={!hasNextPage || isFetchingNextPage}
				>
					{isFetchingNextPage
						? "Loading more"
						: hasNextPage
							? "Load more"
							: "All loaded"}
				</Button>
				<Button
					variant="contained"
					onClick={onRefresh}
					disabled={isFetchingNextPage}
				>
					Refresh
				</Button>
			</Stack>
		</Stack>
	);
}
