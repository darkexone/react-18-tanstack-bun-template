import { Box, Slider as MuiSlider, Stack, Typography } from "@mui/material";
import type React from "react";

export interface SliderProps {
	label: string;
	id: string;
	value?: number;
	onChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	showValue?: boolean;
	className?: string;
}

export const Slider: React.FC<SliderProps> = ({
	label,
	id,
	value = 0,
	onChange,
	min = 0,
	max = 100,
	step = 1,
	showValue = true,
	className = "",
}) => {
	return (
		<Stack spacing={1} className={className}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="body2" id={id}>
					{label}
				</Typography>
				{showValue && (
					<Typography variant="body2" fontWeight={600} color="primary">
						{value}
					</Typography>
				)}
			</Stack>
			<MuiSlider
				id={id}
				value={value}
				onChange={(_event, nextValue) => onChange?.(Number(nextValue))}
				min={min}
				max={max}
				step={step}
				valueLabelDisplay={showValue ? "auto" : "off"}
			/>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant="caption" color="text.secondary">
					{min}
				</Typography>
				<Typography variant="caption" color="text.secondary">
					{max}
				</Typography>
			</Box>
		</Stack>
	);
};
