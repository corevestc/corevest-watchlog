# WatchLog

Trading-discipline application for **CoreVest Capital**.

WatchLog helps a trader follow a rules-based watchlist, execute planned trades, keep a journal, and review performance and discipline over time.

This repository is in the **architecture / foundation** phase. Domain features, schema, and authentication are not implemented yet.

## Layout

```
tailgrids/     original TailGrids UI kit (source template only)
client/        WatchLog React frontend (Clean Architecture layers)
service/       WatchLog Node.js API (Clean Architecture layers)
database/      PostgreSQL migrations and seeds
docs/          architecture, dependency rules, API, business rules
docker/        Dockerfiles
```

## Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS v4, TailGrids design system
- Backend: Node.js, NestJS, TypeScript
- Database: PostgreSQL
- External: independent Python DSE data + ML signal application (integration boundary only)

## Local setup

1. Copy `.env.example` to `.env`.
2. Start PostgreSQL:

   ```bash
   docker compose up -d postgres
   ```

3. Install once, then start API + client together (requires `DATABASE_URL`):

   ```bash
   npm --prefix service install
   npm --prefix client install
   npm run dev
   ```

   Or start them separately: `npm run service:dev` and `npm run client:dev`.

Client: `http://localhost:5173`  
API health: `http://localhost:3001/health`

## Documents

- [Architecture](docs/architecture.md)
- [Dependency rules](docs/dependency-rules.md)
- [API](docs/api.md)
- [Business rules](docs/business-rules.md)
