import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Paper,
	Radio,
	RadioGroup,
	Slider,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/demo/storybook")({
	component: StorybookDemo,
});

function StorybookDemo() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [employmentType, setEmploymentType] = useState("full-time");
	const [coffeeCups, setCoffeeCups] = useState(3);

	const handleSubmit = () => {};

	const handleReset = () => {
		setFirstName("");
		setLastName("");
		setEmploymentType("full-time");
		setCoffeeCups(3);
	};

	return (
		<Box
			sx={{ minHeight: "100vh", py: 8, px: 2, bgcolor: "background.default" }}
		>
			<Box sx={{ maxWidth: 800, mx: "auto" }}>
				<Paper sx={{ p: 3 }}>
					<Typography variant="h5" sx={{ mb: 3 }}>
						Employee Information Form
					</Typography>
					<Stack component="form" onSubmit={handleSubmit} spacing={3}>
						<TextField
							label="First Name"
							value={firstName}
							onChange={(event) => setFirstName(event.target.value)}
							required
						/>
						<TextField
							label="Last Name"
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
							required
						/>
						<FormControl>
							<FormLabel>Employment Type</FormLabel>
							<RadioGroup
								row
								name="employmentType"
								value={employmentType}
								onChange={(event) => setEmploymentType(event.target.value)}
							>
								<FormControlLabel
									value="full-time"
									control={<Radio />}
									label="Full Time"
								/>
								<FormControlLabel
									value="part-time"
									control={<Radio />}
									label="Part Time"
								/>
							</RadioGroup>
						</FormControl>
						<Box>
							<Typography gutterBottom>
								Coffee Cups Per Day: {coffeeCups}
							</Typography>
							<Slider
								value={coffeeCups}
								onChange={(_, value) => setCoffeeCups(Number(value))}
								min={0}
								max={10}
								step={1}
								valueLabelDisplay="auto"
							/>
						</Box>
						<Stack direction="row" spacing={1.5} justifyContent="flex-end">
							<Button variant="outlined" onClick={handleReset}>
								Reset
							</Button>
							<Button variant="contained" type="submit" onClick={handleSubmit}>
								Submit
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Box>
		</Box>
	);
}
