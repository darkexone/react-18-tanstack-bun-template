import { Box, Typography } from "@mui/material";
import { EventClient } from "@tanstack/devtools-event-client";
import { useEffect, useState } from "react";

import { fullName, store } from "./demo-store";

type EventMap = {
	"store-devtools:state": {
		firstName: string;
		lastName: string;
		fullName: string;
	};
};

class StoreDevtoolsEventClient extends EventClient<EventMap> {
	constructor() {
		super({
			pluginId: "store-devtools",
		});
	}
}

const sdec = new StoreDevtoolsEventClient();

store.subscribe(() => {
	sdec.emit("state", {
		firstName: store.state.firstName,
		lastName: store.state.lastName,
		fullName: fullName.state,
	});
});

function DevtoolPanel() {
	const [state, setState] = useState<EventMap["store-devtools:state"]>(() => ({
		firstName: store.state.firstName,
		lastName: store.state.lastName,
		fullName: fullName.state,
	}));

	useEffect(() => {
		return sdec.on("state", (e) => setState(e.payload));
	}, []);

	return (
		<Box
			sx={{
				p: 2,
				display: "grid",
				gap: 1,
				gridTemplateColumns: "1fr 10fr",
			}}
		>
			<Typography variant="body2" fontWeight={700} color="text.secondary">
				First Name
			</Typography>
			<Typography variant="body2">{state?.firstName}</Typography>
			<Typography variant="body2" fontWeight={700} color="text.secondary">
				Last Name
			</Typography>
			<Typography variant="body2">{state?.lastName}</Typography>
			<Typography variant="body2" fontWeight={700} color="text.secondary">
				Full Name
			</Typography>
			<Typography variant="body2">{state?.fullName}</Typography>
		</Box>
	);
}

export default {
	name: "TanStack Store",
	render: <DevtoolPanel />,
};
