import { createFileRoute } from "@tanstack/react-router";
import DemoTablePage from "~/pages/demo-table";

export const Route = createFileRoute("/demo/table")({
	component: DemoTablePage,
});
