import type { ReactNode } from "react";
import { Footer, Header } from "@/widgets";

export function AppShell({ children }: { children: ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
