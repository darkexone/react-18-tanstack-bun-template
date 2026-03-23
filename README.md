React 18 TanStack Bun Template
===============================

## Overview

This starter stitches together TanStack Router, Query, React Form, React Table, Store, and MUI to showcase what a modern React 18 stack can look like when powered by Bun and Vitest. It also includes a small content-collection-powered resume showcase, Paraglide-based localization, a Theme+Provider shell, and a suite of demo pages that illustrate UI/UX patterns you can reuse immediately.

## Quick Start

1. Install dependencies with Bun:

```bash
bun install
```

2. Kick off the dev server (port 3000 by default):

```bash
bun run dev
```

3. Build for production

```bash
bun run build
```

4. Preview the production build

```bash
bun run preview
```

> Tip: All npm-style scripts in `package.json` work through any package manager that understands the `scripts` field (Bun, npm, pnpm, etc.).

## Available Scripts

- `bun run dev` – Runs `vite dev --port 3000`
- `bun run build` – Produces a production build via Vite
- `bun run preview` – Serves the production build locally
- `bun run test` – Executes the Vitest suite
- `bun run lint` / `bun run format` / `bun run check` – Biome linting/formatting/checking
- `bun run storybook` / `bun run build-storybook` – Storybook dev server and build

## Project Highlights

- **Routing & data** – TanStack Router lives alongside dedicated loaders, `shared` utilities, and the `router.tsx` bootstrapper. The root shell lives in `src/routes/__root.tsx` and wires up the providers in `src/app/providers`.
- **UI System** – MUI v7 provides theming, components, and layout scaffolding. The theme is configured in the shared providers and exposed through the `theme-toggle` UI.
- **State & data fetching** – TanStack Query, Store, and React Form are wired into the app so you can follow existing patterns for loaders, mutations, and form validation.
- **Content collections** – Markdown-based resumes and education entries live under `content/jobs` and `content/education`, consumed via the `content-collections` layer.
- **Localization** – ParaglideJS powers localized routing and messages, with editable sources under `project.inlang/messages` and generated output in `src/paraglide/messages`.
- **Widget library** – The `widgets` directory provides shareable header/footer components that can be reused by any route or page.

## Directory Focus

- `src/app` – Bootstraps the app shell, providers, and theme wiring.
- `src/routes` – File-based TanStack Router definitions and loaders, including the root shell, shared configs, and integration helpers.
- `src/pages` – Static page implementations like `home`, `about`, and the `demo` group. These routes marry content, forms, and widgets.
- `src/shared` – Shared utilities (`lib`, `types`, `config`, `integrations`) plus UI primitives (button, dialog, input, radio, slider) and widgets.

## Demo Pages

The `src/pages/demo` folder contains essential working examples that explain how the stack is meant to be used. Each demo focuses on a specific pattern:

- `demo-event-handling` contrasts browser events with stateful UI while respecting the router shell.
- `demo-form-address` pairs the address form context, validators, and the `address-form` feature to show composable forms built with React Form and Zod.
- `demo-table` demonstrates TanStack Table, sorting, filtering, and integration with the `content/jobs` dataset.

These demos are the living examples for the architecture, so keep them around unless you fully replace their intent with your own flows.

## Styling & Theme

MUI is configured in `src/routes/__root.tsx` and re-exported through the theme toggle feature. The `app/theme` folder contains helpers that switch between light and dark modes and expose the tokens used by the shared button, input, and dialog components.

## Tooling

- **Vitest** – Unit and component tests run through `bun run test`.
- **Biome** – Formatting, linting, and checking happen through Bun scripts and shareable configs in `biome.json`.
- **Storybook** – Run `bun run storybook` to explore isolated UI components, or `bun run build-storybook` to export the static Storybook.

## Localization & Paraglide

ParaglideJS generates the `src/paraglide` runtime based on the source files under `project.inlang/messages`. Run the dev server or build to regenerate localized routing metadata and translations inside the `paraglide` runtime + runtime messages.

## Learn More

- [TanStack](https://tanstack.com)
- [TanStack Router docs](https://tanstack.com/router/latest/docs)
- [TanStack Query docs](https://tanstack.com/query/latest)
- [MUI docs](https://mui.com)
- [Content Collections](https://www.content-collections.dev)