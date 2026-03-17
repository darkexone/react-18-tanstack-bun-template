import { createFileRoute } from "@tanstack/react-router";
import DemoFormAddressPage from "~/pages/demo-form-address";

export const Route = createFileRoute("/demo/form/address")({
	component: DemoFormAddressPage,
});
