import { Box, Paper, Typography } from "@mui/material";
import type React from "react";

export interface DialogProps {
	title: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
	title,
	children,
	footer,
	className = "",
}) => {
	return (
		<Paper
			className={className}
			elevation={4}
			sx={{ borderRadius: 2, overflow: "hidden" }}
		>
			<Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider" }}>
				<Typography variant="h6" fontWeight={600}>
					{title}
				</Typography>
			</Box>
			<Box sx={{ px: 3, py: 3 }}>{children}</Box>
			{footer && (
				<Box
					sx={{
						px: 3,
						py: 2,
						bgcolor: "action.hover",
						borderTop: 1,
						borderColor: "divider",
					}}
				>
					{footer}
				</Box>
			)}
		</Paper>
	);
};
