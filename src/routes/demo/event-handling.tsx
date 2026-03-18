import { createFileRoute } from "@tanstack/react-router";
import EventHandlingPage from "~/pages/demo-event-handling";

export const Route = createFileRoute("/demo/event-handling")({
	component: EventHandlingPage,
});
