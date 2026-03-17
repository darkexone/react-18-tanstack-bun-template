import { Button as MuiButton } from "@mui/material";
import type React from "react";

export interface ButtonProps {
	variant?: "primary" | "secondary" | "danger";
	size?: "small" | "medium" | "large";
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "medium",
	children,
	onClick,
	disabled = false,
	type = "button",
	className = "",
}) => {
	const muiVariant = variant === "secondary" ? "outlined" : "contained";
	const muiColor = variant === "danger" ? "error" : "primary";
	const muiSize = size === "medium" ? "medium" : "small";

	return (
		<MuiButton
			type={type}
			onClick={onClick}
			disabled={disabled}
			variant={muiVariant}
			color={muiColor}
			size={muiSize}
			sx={
				size === "large"
					? {
						px: 3,
						py: 1.2,
						fontSize: "1rem",
					}
					: undefined
			}
			className={className}
		>
			{children}
		</MuiButton>
	);
};
