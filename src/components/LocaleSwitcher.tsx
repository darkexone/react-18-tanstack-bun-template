// Locale switcher refs:
// - Paraglide docs: https://inlang.com/m/gerre34r/library-inlang-paraglideJs
// - Router example: https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#switching-locale
import { m } from "#/paraglide/messages";
import { getLocale, locales, setLocale } from "#/paraglide/runtime";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";

export default function ParaglideLocaleSwitcher() {
	const currentLocale = getLocale();

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			<Typography variant="body2" color="text.secondary">
				{m.current_locale({ locale: currentLocale })}
			</Typography>
			<ButtonGroup size="small" aria-label={m.language_label()}>
				{locales.map((locale) => (
					<Button
						key={locale}
						onClick={() => setLocale(locale)}
						variant={locale === currentLocale ? "contained" : "outlined"}
					>
						{locale.toUpperCase()}
					</Button>
				))}
			</ButtonGroup>
		</Stack>
	);
}
