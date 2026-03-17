import { Box, Grid, Paper, Stack } from "@mui/material";

import {
	addressFormDefaultValues,
	useAddressForm,
	validateEmail,
	validatePhone,
	validateRequired,
	validateZipCode,
} from "@/features/address-form";

export default function DemoFormAddressPage() {
	const form = useAddressForm({
		defaultValues: addressFormDefaultValues,
		validators: {
			onBlur: ({ value }) => {
				const errors = {
					fields: {},
				} as {
					fields: Record<string, string>;
				};
				if (value.fullName.trim().length === 0) {
					errors.fields.fullName = "Full name is required";
				}
				return errors;
			},
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
						<form.AppField name="fullName">
							{(field) => <field.TextField label="Full Name" />}
						</form.AppField>

						<form.AppField
							name="email"
							validators={{
								onBlur: ({ value }) => validateEmail(value),
							}}
						>
							{(field) => <field.TextField label="Email" />}
						</form.AppField>

						<form.AppField
							name="address.street"
							validators={{
								onBlur: ({ value }) =>
									validateRequired("Street address is required")(value),
							}}
						>
							{(field) => <field.TextField label="Street Address" />}
						</form.AppField>

						<Grid container spacing={2}>
							<Grid size={{ xs: 12, md: 4 }}>
								<form.AppField
									name="address.city"
									validators={{
										onBlur: ({ value }) =>
											validateRequired("City is required")(value),
									}}
								>
									{(field) => <field.TextField label="City" />}
								</form.AppField>
							</Grid>
							<Grid size={{ xs: 12, md: 4 }}>
								<form.AppField
									name="address.state"
									validators={{
										onBlur: ({ value }) =>
											validateRequired("State is required")(value),
									}}
								>
									{(field) => <field.TextField label="State" />}
								</form.AppField>
							</Grid>
							<Grid size={{ xs: 12, md: 4 }}>
								<form.AppField
									name="address.zipCode"
									validators={{
										onBlur: ({ value }) => validateZipCode(value),
									}}
								>
									{(field) => <field.TextField label="Zip Code" />}
								</form.AppField>
							</Grid>
						</Grid>

						<form.AppField
							name="address.country"
							validators={{
								onBlur: ({ value }) =>
									validateRequired("Country is required")(value),
							}}
						>
							{(field) => (
								<field.Select
									label="Country"
									values={[
										{ label: "United States", value: "US" },
										{ label: "Canada", value: "CA" },
										{ label: "United Kingdom", value: "UK" },
										{ label: "Australia", value: "AU" },
										{ label: "Germany", value: "DE" },
										{ label: "France", value: "FR" },
										{ label: "Japan", value: "JP" },
									]}
									placeholder="Select a country"
								/>
							)}
						</form.AppField>

						<form.AppField
							name="phone"
							validators={{
								onBlur: ({ value }) => validatePhone(value),
							}}
						>
							{(field) => (
								<field.TextField label="Phone" placeholder="123-456-7890" />
							)}
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
