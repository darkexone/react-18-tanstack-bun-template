export function validateRequired(message: string) {
	return (value: string) => {
		if (!value || value.trim().length === 0) {
			return message;
		}
		return undefined;
	};
}

export function validateEmail(value: string) {
	if (!value || value.trim().length === 0) {
		return "Email is required";
	}

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
		return "Invalid email address";
	}

	return undefined;
}

export function validateZipCode(value: string) {
	if (!value || value.trim().length === 0) {
		return "Zip code is required";
	}

	if (!/^\d{5}(-\d{4})?$/.test(value)) {
		return "Invalid zip code format";
	}

	return undefined;
}

export function validatePhone(value: string) {
	if (!value || value.trim().length === 0) {
		return "Phone number is required";
	}

	if (!/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value)) {
		return "Invalid phone number format";
	}

	return undefined;
}