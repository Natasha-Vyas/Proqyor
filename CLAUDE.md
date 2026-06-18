# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Proqyur is a B2B manufacturing and procurement services website built with Angular 22. It showcases manufacturing capabilities (injection molding, CNC machining, 3D printing, sheet metal, compression molding, urethane casting, die casting) and provides quote request and contact functionality.

## Commands

- `npm start` — dev server at localhost:4200
- `npm run build` — production build
- `npm test` — run tests (Vitest via Angular CLI)
- `npm run watch` — dev build with file watching

## Architecture

**Angular 22 standalone components** — no NgModules. All page components are lazy-loaded via the router.

**Routing** (`src/app/app.routes.ts`):
- `/` redirects to `/home`
- `/home` — HomeComponent
- `/contact` — ContactComponent
- `/service/:id` — ServiceDetailComponent (7 services keyed by slug)

**Layout**: Root `app.ts` renders a fixed navbar and footer wrapping a `<router-outlet>`.

**Key patterns**:
- Service data is defined inline in `service-detail.ts` (no backend/API)
- Contact form uses FormsModule two-way binding with local validation and a simulated submit
- Home page has advanced video autoplay management: IntersectionObserver, visibility change listeners, retry logic
- ServiceModalComponent is a reusable overlay triggered from the home page capabilities grid

## Styling

SCSS throughout. Global styles in `src/styles.scss`. Prettier enforces 100-char width and single quotes. Editor uses 2-space indentation.

## Testing

Vitest 4.x with jsdom environment. Test files use `*.spec.ts` convention alongside their components.
