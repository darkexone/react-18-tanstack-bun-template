import { Box, Paper, Stack } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { useAppForm } from "#/hooks/demo.form";

export const Route = createFileRoute("/demo/form/simple")({
	component: SimpleForm,
});

const schema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
});

function SimpleForm() {
	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
		},
		validators: {
			onBlur: schema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			// Show success message
			alert("Form submitted successfully!");
		},
	});

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 2,
			}}
		>
			<Paper
				elevation={8}
				sx={{
					width: "100%",
					maxWidth: 900,
					p: 4,
					backdropFilter: "blur(10px)",
					border: "8px solid",
					borderColor: "divider",
					borderRadius: 3,
				}}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<Stack spacing={3}>
						<form.AppField name="title">
							{(field) => <field.TextField label="Title" />}
						</form.AppField>

						<form.AppField name="description">
							{(field) => <field.TextArea label="Description" />}
						</form.AppField>

						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<form.AppForm>
								<form.SubscribeButton label="Submit" />
							</form.AppForm>
						</Box>
					</Stack>
				</form>
			</Paper>
		</Box>
	);
}
