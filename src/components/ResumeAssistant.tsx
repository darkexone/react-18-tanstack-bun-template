import { Store } from "@tanstack/store";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
	Avatar,
	Box,
	IconButton,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import type { ResumeChatMessages } from "#/lib/resume-ai-hook";
import { useResumeChat } from "#/lib/resume-ai-hook";

function Messages({ messages }: { messages: ResumeChatMessages }) {
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messages.length === 0) {
			return;
		}

		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	}, [messages]);

	if (!messages.length) {
		return (
			<Stack
				sx={{
					flex: 1,
					px: 3,
					py: 4,
					alignItems: "center",
					justifyContent: "center",
				}}
				spacing={1}
			>
				<Box sx={{ position: "relative", mb: 1 }}>
					<BusinessCenterIcon color="primary" sx={{ fontSize: 48, opacity: 0.45 }} />
					<VerifiedUserIcon color="secondary" sx={{ position: "absolute", bottom: -2, right: -4, fontSize: 24 }} />
				</Box>
				<Typography textAlign="center" fontWeight={600}>
					Welcome, Recruiter!
				</Typography>
				<Typography variant="caption" textAlign="center" color="text.secondary" sx={{ maxWidth: 220 }}>
					Ask about skills, experience, or qualifications...
				</Typography>
			</Stack>
		);
	}

	return (
		<Box ref={messagesContainerRef} sx={{ flex: 1, overflowY: "auto" }}>
			{messages.map(({ id, role, parts }) => (
				<Box
					key={id}
					sx={{
						py: 1.5,
						bgcolor:
							role === "assistant" ? "rgba(30,136,229,0.08)" : "transparent",
					}}
				>
					{parts.map((part) => {
						if (part.type === "text" && part.content) {
							return (
								<Stack
									key={`${id}-${part.type}-${part.content}`}
									direction="row"
									spacing={1.5}
									sx={{ px: 2, alignItems: "flex-start" }}
								>
									{role === "assistant" ? (
										<Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main" }}>
											<BusinessCenterIcon sx={{ fontSize: 16 }} />
										</Avatar>
									) : (
										<Avatar sx={{ width: 28, height: 28, bgcolor: "grey.600", fontSize: 12 }}>
											You
										</Avatar>
									)}
									<Box sx={{ flex: 1, minWidth: 0 }}>
										<Streamdown>{part.content}</Streamdown>
									</Box>
								</Stack>
							);
						}
						return null;
					})}
				</Box>
			))}
		</Box>
	);
}

// Export store for header control
export const showResumeAssistant = new Store(false);

export default function ResumeAssistant() {
	const [isOpen, setIsOpen] = useState(false);
	const { messages, sendMessage, isLoading } = useResumeChat();
	const [input, setInput] = useState("");

	// Sync with store for header control
	useEffect(() => {
		const subscription = showResumeAssistant.subscribe(() => {
			setIsOpen(showResumeAssistant.state);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const handleToggle = () => {
		const newState = !isOpen;
		setIsOpen(newState);
		showResumeAssistant.setState(() => newState);
	};

	const handleSend = () => {
		if (input.trim()) {
			sendMessage(input);
			setInput("");
		}
	};

	if (!isOpen) {
		return null;
	}

	return (
		<Paper
			elevation={12}
			sx={{
				position: "fixed",
				top: 96,
				right: 16,
				zIndex: 100,
				width: 400,
				height: 520,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
				borderRadius: 3,
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}
			>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Avatar sx={{ bgcolor: "primary.main" }}>
						<BusinessCenterIcon sx={{ fontSize: 18 }} />
					</Avatar>
					<Box>
						<Typography variant="subtitle1" fontWeight={700}>
							Resume Assistant
						</Typography>
						<Typography variant="caption" color="text.secondary">
							Candidate Evaluation AI
						</Typography>
					</Box>
				</Stack>
				<IconButton onClick={handleToggle} aria-label="Close assistant">
					<CloseIcon fontSize="small" />
				</IconButton>
			</Stack>

			<Messages messages={messages} />

			{isLoading && (
				<Typography variant="caption" sx={{ px: 2, py: 1 }} color="text.secondary">
					Analyzing experience...
				</Typography>
			)}

			<Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSend();
					}}
				>
					<Stack direction="row" spacing={1} alignItems="flex-end">
						<TextField
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Ask about skills, experience, or qualifications..."
							disabled={isLoading}
							fullWidth
							multiline
							minRows={1}
							maxRows={4}
							size="small"
							onKeyDown={(e) => {
								if (
									e.key === "Enter" &&
									!e.shiftKey &&
									input.trim() &&
									!isLoading
								) {
									e.preventDefault();
									handleSend();
								}
							}}
						/>
						<IconButton
							type="submit"
							disabled={!input.trim() || isLoading}
							color="primary"
						>
							<SendIcon fontSize="small" />
						</IconButton>
					</Stack>
				</form>
			</Box>
		</Paper>
	);
}
