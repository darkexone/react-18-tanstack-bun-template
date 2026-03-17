import {
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Chip,
	Container,
	Divider,
	FormControlLabel,
	Paper,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { allEducations, allJobs } from "content-collections";
import { useMemo, useState } from "react";

export default function HomePage() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	// Get unique tags from all jobs
	const allTags = useMemo(() => {
		const tags = new Set<string>();
		allJobs.forEach((job) => {
			job.tags.forEach((tag) => {
				tags.add(tag);
			});
		});
		return Array.from(tags).sort();
	}, []);

	// Filter jobs based on selected tags
	const filteredJobs = useMemo(() => {
		if (selectedTags.length === 0) return allJobs;
		return allJobs.filter((job) =>
			selectedTags.some((tag) => job.tags.includes(tag)),
		);
	}, [selectedTags]);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "background.default",
			}}
		>
			<Box sx={{ display: "flex" }}>
				<Paper
					elevation={0}
					square
					sx={{
						width: 288,
						minHeight: "100vh",
						position: "sticky",
						top: 0,
						p: 4,
						borderRight: "1px solid",
						borderColor: "divider",
						backgroundColor: "background.paper",
					}}
				>
					<Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
						Skills and Technologies
					</Typography>
					<Stack spacing={1}>
						{allTags.map((tag) => (
							<FormControlLabel
								key={tag}
								control={
									<Checkbox
										checked={selectedTags.includes(tag)}
										onChange={(_, checked) => {
											if (checked) {
												setSelectedTags([...selectedTags, tag]);
											} else {
												setSelectedTags(selectedTags.filter((t) => t !== tag));
											}
										}}
									/>
								}
								label={tag}
							/>
						))}
					</Stack>
				</Paper>

				<Container maxWidth="lg" sx={{ py: 5 }}>
					<Stack spacing={6}>
						<Box sx={{ textAlign: "center" }}>
							<Typography variant="h2" sx={{ fontWeight: 800, mb: 1 }}>
								My Resume
							</Typography>
							<Typography color="text.secondary" sx={{ mb: 3 }}>
								Professional Experience and Education
							</Typography>
							<Divider />
						</Box>

						<Card elevation={2}>
							<CardHeader
								title="Career Summary"
								titleTypographyProps={{ variant: "h5" }}
							/>
							<CardContent>
								<Stack
									direction={{ xs: "column", md: "row" }}
									spacing={4}
									alignItems="center"
								>
									<Typography sx={{ flex: 1 }} color="text.secondary">
										I am a passionate and driven professional seeking
										opportunities that will leverage my extensive experience in
										frontend development while providing continuous growth and
										learning opportunities. My goal is to contribute to
										innovative projects that challenge me to expand my skill set
										and make meaningful impacts through technology.
									</Typography>
									<Avatar
										src="/headshot-on-white.jpg"
										alt="Professional headshot"
										variant="rounded"
										sx={{ width: 176, height: 208, borderRadius: 3 }}
									/>
								</Stack>
							</CardContent>
						</Card>

						<Box>
							<Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
								Work Experience
							</Typography>
							<Stack spacing={3}>
								{filteredJobs.map((job) => (
									<Card key={job.jobTitle} elevation={2}>
										<CardHeader
											title={job.jobTitle}
											subheader={`${job.company} - ${job.location}`}
											action={
												<Chip
													label={`${job.startDate} - ${job.endDate || "Present"}`}
												/>
											}
										/>
										<CardContent>
											<Typography color="text.secondary" sx={{ mb: 3 }}>
												{job.summary}
											</Typography>
											<Stack
												direction="row"
												spacing={1}
												flexWrap="wrap"
												useFlexGap
											>
												{job.tags.map((tag) => (
													<Tooltip
														key={tag}
														title={`Experience with ${tag} in professional development`}
													>
														<Chip variant="outlined" label={tag} />
													</Tooltip>
												))}
											</Stack>
											{job.content && (
												<Typography
													sx={{ mt: 3, whiteSpace: "pre-wrap" }}
													color="text.secondary"
												>
													{job.content}
												</Typography>
											)}
										</CardContent>
									</Card>
								))}
							</Stack>
						</Box>

						<Box>
							<Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
								Education
							</Typography>
							<Stack spacing={3}>
								{allEducations.map((education) => (
									<Card key={education.school} elevation={2}>
										<CardHeader title={education.school} />
										<CardContent>
											<Typography color="text.secondary">
												{education.summary}
											</Typography>
											{education.content && (
												<Typography
													sx={{ mt: 3, whiteSpace: "pre-wrap" }}
													color="text.secondary"
												>
													{education.content}
												</Typography>
											)}
										</CardContent>
									</Card>
								))}
							</Stack>
						</Box>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}
