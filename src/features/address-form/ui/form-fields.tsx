import {
	Alert,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
	TextField as MuiTextField,
	Stack,
	Typography,
} from "@mui/material";
import { useStore } from "@tanstack/react-form";

import { useFieldContext, useFormContext } from "../model/form-context";

export function SubscribeButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting} variant="contained">
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}

function ErrorMessages({
	errors,
}: {
	errors: Array<string | { message: string }>;
}) {
	return (
		<Stack spacing={1} sx={{ mt: 1 }}>
			{errors.map((error) => (
				<Alert
					key={typeof error === "string" ? error : error.message}
					severity="error"
					variant="outlined"
				>
					{typeof error === "string" ? error : error.message}
				</Alert>
			))}
		</Stack>
	);
}

export function TextField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Box>
			<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
				{label}
			</Typography>
			<MuiTextField
				fullWidth
				value={field.state.value}
				placeholder={placeholder}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				size="small"
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</Box>
	);
}

export function TextArea({
	label,
	rows = 3,
}: {
	label: string;
	rows?: number;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Box>
			<Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
				{label}
			</Typography>
			<MuiTextField
				fullWidth
				multiline
				rows={rows}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
			/>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</Box>
	);
}

export function Select({
	label,
	values,
}: {
	label: string;
	values: Array<{ label: string; value: string }>;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();
	const errors = useStore(field.store, (state) => state.meta.errors);

	return (
		<Box>
			<FormControl fullWidth size="small">
				<InputLabel>{label}</InputLabel>
				<MuiSelect
					name={field.name}
					value={field.state.value}
					label={label}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
				>
					{values.map((value) => (
						<MenuItem key={value.value} value={value.value}>
							{value.label}
						</MenuItem>
					))}
				</MuiSelect>
			</FormControl>
			{field.state.meta.isTouched && <ErrorMessages errors={errors} />}
		</Box>
	);
}
