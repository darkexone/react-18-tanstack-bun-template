import { Stack, TextField } from "@mui/material";
import type React from "react";

export interface InputProps {
	label: string;
	id: string;
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	required?: boolean;
	className?: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	id,
	value = "",
	onChange,
	placeholder,
	required = false,
	className = "",
}) => {
	return (
		<Stack className={className}>
			<TextField
				type="text"
				id={id}
				label={required ? `${label} *` : label}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
				placeholder={placeholder}
				required={required}
				size="small"
			/>
		</Stack>
	);
};
