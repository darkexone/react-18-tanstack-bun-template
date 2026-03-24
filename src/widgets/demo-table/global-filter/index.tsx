import { Stack, Typography } from "@mui/material";
import DebouncedInput from "~/shared/ui/debounced-input";

export type DemoTableGlobalFilterProps = {
	value: string;
	onSearchChange: (value: string) => void;
	disabled?: boolean;
};

export default function DemoTableGlobalFilter({
	value,
	onSearchChange,
	disabled,
}: DemoTableGlobalFilterProps) {
	return (
		<Stack spacing={0.5}>
			<Typography variant="subtitle2">Search users</Typography>
			<DebouncedInput
				value={value}
				onChange={onSearchChange}
				placeholder="Search by name"
				fullWidth
				size="small"
				disabled={disabled}
			/>
		</Stack>
	);
}
