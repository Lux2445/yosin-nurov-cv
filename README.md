# Yosin Nurov - Portfolio Resume Site

React + TypeScript + Vite single-page portfolio built from the provided resume.

## Features

- Dark/Light mode with `localStorage` persistence
- RU/EN language switch with `localStorage` persistence
- Structured, typed data layer for resume content
- Interactive 3D hero scene using `three.js` via `@react-three/fiber`
- Responsive layout for desktop and mobile

## Tech Stack

- React 19
- TypeScript
- Vite
- three.js
- @react-three/fiber

## Architecture

```text
src/
  app/
    resume-presentation-app.tsx
    data/resume-data.ts
    hooks/
    providers/
  components/
    layout/
    sections/
    three/
    ui/
  types/
    resume.ts

public/
  app/                  # legacy local assets for original upstream bundles
  presentation-runtime/ # published 2d/3d runtime bundles used on GitHub Pages

archive/
  reference/            # reference snapshots
  upstream-src/         # original upstream source tree
```

## Run
```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
