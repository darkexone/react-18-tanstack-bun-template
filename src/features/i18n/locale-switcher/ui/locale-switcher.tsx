// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale

import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { getLocale, locales, m, setLocale } from "~/shared/i18n";

export default function ParaglideLocaleSwitcher() {
	const currentLocale = getLocale();
	const navigate = useNavigate();
	const location = useLocation();

	const handleLocaleChange = (locale: string) => {
		// Update Paraglide locale with proper typing
		setLocale(locale as (typeof locales)[number]);
		// Navigate to current path - rewrite will handle locale prefix
		navigate({ to: location.pathname, replace: true });
	};

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			<Typography variant="body2" color="text.secondary">
				{m.current_locale({ locale: currentLocale })}
			</Typography>
			<ButtonGroup size="small" aria-label={m.language_label()}>
				{locales.map((locale) => (
					<Button
						key={locale}
						onClick={() => handleLocaleChange(locale)}
						variant={locale === currentLocale ? "contained" : "outlined"}
					>
						{locale.toUpperCase()}
					</Button>
				))}
			</ButtonGroup>
		</Stack>
	);
}
