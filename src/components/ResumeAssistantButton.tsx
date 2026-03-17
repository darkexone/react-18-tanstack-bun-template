import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Stack, Typography } from "@mui/material";
import { showResumeAssistant } from "./ResumeAssistant";

export default function RemyButton() {
	return (
		<Box sx={{ px: 1, mb: 1.5, width: "100%" }}>
			<Button
				type="button"
				onClick={() => showResumeAssistant.setState(true)}
				fullWidth
				variant="contained"
				color="primary"
				sx={{ justifyContent: "space-between", py: 1.1 }}
				aria-label="Open Resume Assistant"
			>
				<Stack direction="row" spacing={1} alignItems="center">
					<BusinessCenterIcon fontSize="small" />
					<Typography variant="body2">Resume Assistant</Typography>
				</Stack>
				<ChevronRightIcon fontSize="small" />
			</Button>
		</Box>
	);
}
