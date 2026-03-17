import { createFormHook } from "@tanstack/react-form";

import {
	Select,
	SubscribeButton,
	TextArea,
	TextField,
} from "../ui/form-fields";
import { fieldContext, formContext } from "./form-context";

export const { useAppForm: useAddressForm } = createFormHook({
	fieldComponents: {
		TextField,
		Select,
		TextArea,
	},
	formComponents: {
		SubscribeButton,
	},
	fieldContext,
	formContext,
});
