import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import { Dialog } from "./dialog";

const meta = {
	title: "Form/Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "User Profile",
		children: (
			<Stack spacing={2}>
				<Typography color="text.secondary">
					This is a simple dialog component with a title and content area.
				</Typography>
			</Stack>
		),
	},
};

export const WithFooter: Story = {
	args: {
		title: "Confirm Action",
		children: (
			<Stack spacing={2}>
				<Typography color="text.secondary">
					Are you sure you want to proceed with this action?
				</Typography>
			</Stack>
		),
		footer: (
			<Stack direction="row" spacing={1.5} justifyContent="flex-end">
				<Button variant="secondary" size="medium">
					Cancel
				</Button>
				<Button variant="primary" size="medium">
					Confirm
				</Button>
			</Stack>
		),
	},
};

export const Form: Story = {
	args: {
		title: "Create Account",
		children: (
			<Box sx={{ minWidth: 320 }}>
				<Stack spacing={2}>
					<TextField
						id="storybook-email"
						type="email"
						label="Email"
						placeholder="you@example.com"
						size="small"
					/>
					<TextField
						id="storybook-password"
						type="password"
						label="Password"
						placeholder="••••••••"
						size="small"
					/>
				</Stack>
			</Box>
		),
		footer: (
			<Stack direction="row" spacing={1.5} justifyContent="flex-end">
				<Button variant="secondary" size="medium">
					Cancel
				</Button>
				<Button variant="primary" size="medium">
					Create Account
				</Button>
			</Stack>
		),
	},
};
