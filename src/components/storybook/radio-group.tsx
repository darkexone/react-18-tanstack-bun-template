import {
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup as MuiRadioGroup,
	Radio,
} from "@mui/material";
import type React from "react";

export interface RadioOption {
	value: string;
	label: string;
}

export interface RadioGroupProps {
	label: string;
	name: string;
	options: RadioOption[];
	value?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
	label,
	name,
	options,
	value,
	onChange,
	className = "",
}) => {
	return (
		<FormControl className={className}>
			<FormLabel>{label}</FormLabel>
			<MuiRadioGroup
				row
				name={name}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
			>
				{options.map((option) => (
					<FormControlLabel
						key={option.value}
						value={option.value}
						control={<Radio size="small" />}
						label={option.label}
					/>
				))}
			</MuiRadioGroup>
		</FormControl>
	);
};
