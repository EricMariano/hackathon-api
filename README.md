# Hackathon API

REST API for managing hackathons: events, organizations, users, and squads. Built with **NestJS**, **Prisma**, and **PostgreSQL**.

## Stack

- **Runtime:** Node.js
- **Framework:** NestJS 11
- **ORM:** Prisma 7
- **Database:** PostgreSQL
- **Auth:** JWT (Passport)
- **Documentation:** Swagger (OpenAPI)
- **Validation:** class-validator / class-transformer

## Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

## Installation

```bash
# Clone and enter the project
cd hackathon-api

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

## Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hackathon_db"
JWT_SECRET="your-jwt-secret-key"
PORT=8080
```

- **DATABASE_URL** — PostgreSQL connection URL  
- **JWT_SECRET** — Secret key used to sign JWT tokens  
- **PORT** — Server port (default: 8080)

## Database

```bash
# Run migrations
npx prisma migrate deploy

# (Optional) Open Prisma Studio
npx prisma studio
```

## Running the application

```bash
# Development (watch mode)
npm run start:dev

# Production
npm run build
npm run start:prod
```

The API runs at `http://localhost:8080` (or the port set in `PORT`).

## API documentation (Swagger)

With the app running, visit:

- **Swagger UI:** [http://localhost:8080/api](http://localhost:8080/api)

Request examples and test flows are in [`docs/swagger-exemplos-testes.md`](docs/swagger-exemplos-testes.md).

## Project structure

```
src/
├── common/           # Prisma, decorators, etc.
├── modules/
│   ├── auth/         # Login (user and superadmin), JWT, guards
│   ├── users/        # User CRUD
│   ├── superadmin/   # Superadmin CRUD
│   ├── organizations/ # Organization CRUD
│   ├── events/       # Event CRUD (incl. shareable link)
│   └── squads/       # Squad CRUD, join/leave, join with passkey
├── app.module.ts
└── main.ts
prisma/
├── schema.prisma     # Models: Event, Superadmin, Organization, User, Squad
└── migrations/
docs/
├── swagger-exemplos-testes.md
└── fluxo-evento-squads.md
```

## Main flow

1. **Superadmin** — Sign up and login; can create organizations and events.
2. **Organization** — (Optional) linked to a superadmin; events can be associated with it.
3. **Event** — Created by superadmin; has a shareable link for promotion.
4. **User** — Visits the event link, creates an account, and logs in.
5. **Squads** — User can create a squad (public or with passkey) or join an existing one (by passkey when required).

Details and diagram: [`docs/fluxo-evento-squads.md`](docs/fluxo-evento-squads.md).

## Scripts

| Command            | Description           |
|--------------------|-----------------------|
| `npm run start`    | Start the application |
| `npm run start:dev`| Start in watch mode   |
| `npm run build`   | Production build      |
| `npm run start:prod` | Run production build |
| `npm run lint`     | Run ESLint            |
| `npm run format`   | Format with Prettier  |
| `npm run test`     | Unit tests            |
| `npm run test:e2e` | E2E tests             |
| `npm run test:cov` | Test coverage         |

## Documentation

- **[NestJS](https://docs.nestjs.com)** — Node.js framework (modules, controllers, guards, etc.)
- **[Prisma](https://www.prisma.io/docs)** — ORM, schema, migrations, and Prisma Client

## License

UNLICENSED (private project).
