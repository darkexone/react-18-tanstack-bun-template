import {
	Box,
	Button,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";
import type {
	Column,
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	SortingFn,
} from "@tanstack/react-table";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	sortingFns,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { makeData } from "@/entities/person";
import type { Person } from "@/entities/person";

declare module "@tanstack/react-table" {
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<Person> = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

// Define a custom fuzzy sort function that will sort by rank if the row has ranking information
const fuzzySort: SortingFn<Person> = (rowA, rowB, columnId) => {
	let dir = 0;
	const leftRank = rowA.columnFiltersMeta[columnId]?.itemRank;
	const rightRank = rowB.columnFiltersMeta[columnId]?.itemRank;

	// Only sort by rank if the column has ranking information
	if (leftRank && rightRank) {
		dir = compareItems(leftRank, rightRank);
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export default function DemoTablePage() {
	const rerender = React.useReducer(() => ({}), {})[1];

	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [globalFilter, setGlobalFilter] = React.useState("");

	const columns = React.useMemo<ColumnDef<Person>[]>(
		() => [
			{
				accessorKey: "id",
				filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
			},
			{
				accessorKey: "firstName",
				cell: (info) => info.getValue(),
				filterFn: "includesStringSensitive", //note: normal non-fuzzy filter column - case sensitive
			},
			{
				accessorFn: (row) => row.lastName,
				id: "lastName",
				cell: (info) => info.getValue(),
				header: () => <span>Last Name</span>,
				filterFn: "includesString", //note: normal non-fuzzy filter column - case insensitive
			},
			{
				accessorFn: (row) => `${row.firstName} ${row.lastName}`,
				id: "fullName",
				header: "Full Name",
				cell: (info) => info.getValue(),
				filterFn: "fuzzy", //using our custom fuzzy filter function
				// filterFn: fuzzyFilter, //or just define with the function
				sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
			},
		],
		[],
	);

	const [data, setData] = React.useState<Person[]>(() => makeData(5_000));
	const refreshData = () => setData((_old) => makeData(50_000)); //stress test

	const table = useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
		},
		state: {
			columnFilters,
			globalFilter,
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: "fuzzy", //apply fuzzy filter to the global filter (most common use case for fuzzy filter)
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(), //client side filtering
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});

	//apply the fuzzy sort if the fullName column is being filtered
	React.useEffect(() => {
		if (table.getState().columnFilters[0]?.id === "fullName") {
			if (table.getState().sorting[0]?.id !== "fullName") {
				table.setSorting([{ id: "fullName", desc: false }]);
			}
		}
	}, [table]);

	return (
		<Box sx={{ minHeight: "100vh", p: 3 }}>
			<Box>
				<DebouncedInput
					value={globalFilter ?? ""}
					onChange={(value) => setGlobalFilter(String(value))}
					fullWidth
					size="small"
					placeholder="Search all columns..."
				/>
			</Box>
			<Box sx={{ height: 16 }} />
			<TableContainer component={Paper} variant="outlined">
				<Table size="small">
					<TableHead sx={{ bgcolor: "grey.100" }}>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableCell
											key={header.id}
											colSpan={header.colSpan}
											sx={{ verticalAlign: "top" }}
										>
											{header.isPlaceholder ? null : (
												<>
													<Box
														onClick={header.column.getToggleSortingHandler()}
														sx={{
															cursor: header.column.getCanSort()
																? "pointer"
																: "default",
															userSelect: "none",
														}}
													>
														{flexRender(
															header.column.columnDef.header,
															header.getContext(),
														)}
														{{
															asc: " 🔼",
															desc: " 🔽",
														}[header.column.getIsSorted() as string] ?? null}
													</Box>
													{header.column.getCanFilter() ? (
														<Box sx={{ mt: 1 }}>
															<Filter column={header.column} />
														</Box>
													) : null}
												</>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{table.getRowModel().rows.map((row) => {
							return (
								<TableRow key={row.id} hover>
									{row.getVisibleCells().map((cell) => {
										return (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ height: 16 }} />
			<Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
				<Button
					type="button"
					variant="outlined"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{"<<"}
				</Button>
				<Button
					type="button"
					variant="outlined"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{"<"}
				</Button>
				<Button
					type="button"
					variant="outlined"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{">"}
				</Button>
				<Button
					type="button"
					variant="outlined"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{">>"}
				</Button>
				<Typography>
					Page{" "}
					<strong>
						{table.getState().pagination.pageIndex + 1} of{" "}
						{table.getPageCount()}
					</strong>
				</Typography>
				<TextField
					type="number"
					defaultValue={table.getState().pagination.pageIndex + 1}
					onChange={(e) => {
						const page = e.target.value ? Number(e.target.value) - 1 : 0;
						table.setPageIndex(page);
					}}
					size="small"
					sx={{ width: 96 }}
				/>
				<Select
					value={table.getState().pagination.pageSize}
					onChange={(e) => {
						table.setPageSize(Number(e.target.value));
					}}
					size="small"
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<MenuItem key={pageSize} value={pageSize}>
							Show {pageSize}
						</MenuItem>
					))}
				</Select>
			</Stack>
			<Typography sx={{ mt: 2 }}>
				{table.getPrePaginationRowModel().rows.length} Rows
			</Typography>
			<Stack direction="row" spacing={1} sx={{ mt: 2 }}>
				<Button type="button" onClick={() => rerender()} variant="contained">
					Force Rerender
				</Button>
				<Button type="button" onClick={() => refreshData()} variant="contained">
					Refresh Data
				</Button>
			</Stack>
			<Paper
				sx={{
					mt: 2,
					p: 2,
					overflow: "auto",
				}}
			>
				<pre>
					{JSON.stringify(
						{
							columnFilters: table.getState().columnFilters,
							globalFilter: table.getState().globalFilter,
						},
						null,
						2,
					)}
				</pre>
			</Paper>
		</Box>
	);
}

function Filter({ column }: { column: Column<Person, unknown> }) {
	const columnFilterValue = column.getFilterValue();

	return (
		<DebouncedInput
			type="text"
			value={(columnFilterValue ?? "") as string}
			onChange={(value) => column.setFilterValue(value)}
			placeholder={`Search...`}
			size="small"
			fullWidth
		/>
	);
}

// A typical debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<React.ComponentProps<typeof TextField>, "onChange" | "value">) {
	const [value, setValue] = React.useState(initialValue);

	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [debounce, onChange, value]);

	return (
		<TextField
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}
