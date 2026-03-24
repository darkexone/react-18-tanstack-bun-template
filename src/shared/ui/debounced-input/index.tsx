import { TextField } from "@mui/material";
import React from "react";

export type DebouncedInputProps<TValue = string | number> = {
	value: TValue;
	onChange: (value: TValue) => void;
	debounce?: number;
} & Omit<React.ComponentProps<typeof TextField>, "onChange" | "value">;

export default function DebouncedInput<TValue>({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: DebouncedInputProps<TValue>) {
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
			onChange={(event) => setValue(event.target.value as unknown as TValue)}
		/>
	);
}
