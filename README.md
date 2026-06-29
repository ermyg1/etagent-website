# E.T Agent Website

E.T Agent Website is the official public website repository for the E.T Agent
platform.

## Development Status

Phase W1 Foundation. The application currently renders a minimal placeholder
while the approved website implementation remains under development.

## Technology Stack

- React
- Vite
- TypeScript
- ESLint
- npm

## Local Development

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Run a production build:

```sh
npm run build
```

Run lint checks:

```sh
npm run lint
```

Preview the production build locally:

```sh
npm run preview
```

## Repository Structure

```text
.
├── docs/              Project documentation
├── public/            Static public assets
├── src/               Application source code
│   ├── assets/        Source-managed assets
│   ├── components/    Reusable UI components
│   ├── hooks/         React hooks
│   ├── layouts/       Page and route layouts
│   ├── lib/           Shared library code
│   ├── pages/         Page-level modules
│   ├── types/         Shared TypeScript types
│   └── utils/         Utility functions
├── index.html         Vite HTML entry point
├── package.json       Project scripts and dependencies
└── vite.config.ts     Vite configuration
```

## License

See [LICENSE](./LICENSE) for license details.
