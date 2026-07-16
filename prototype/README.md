# UnitFlow frontend application

React + TypeScript frontend for the proposed Condominium Management System. The application is frontend-first and uses typed mock data plus browser storage until the Python API is introduced.

## Run locally

Install dependencies and start the development server from the `prototype` directory:

```powershell
pnpm install
pnpm dev
```

Then open `http://127.0.0.1:5173/`. Run `pnpm test` for domain tests and `pnpm build` for a production build.

The application uses sample data only. It supports combined filters and configurable room layouts within each condominium unit. Room changes are saved in browser storage. There is no Python backend, database, authentication, or payment processing in this phase.
