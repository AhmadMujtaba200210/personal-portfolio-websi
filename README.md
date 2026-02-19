# Premium Portfolio & Command Center Monorepo

A full-stack portfolio ecosystem built with **Next.js 15**, **React 19**, and **Prisma 7**, organized as a Turborepo monorepo.

## 🏗️ Architecture Overview

| Component | Path | Description |
| :--- | :--- | :--- |
| **Portfolio** | `apps/portfolio` | Public-facing portfolio site (port 3000) |
| **CMS** | `apps/cms` | Admin dashboard for managing all content (port 4020) |
| **Database** | `packages/database` | Shared Prisma schema, client, and seed data |
| **Types** | `packages/types` | Shared TypeScript type definitions |
| **Infrastructure** | `docker-compose.yml` | PostgreSQL, Nginx gateway, and containerized apps |

---

## 🚀 Quick Start (One Command)

### Prerequisites

- **Node.js 18+** — [install](https://nodejs.org/)
- **Yarn** — `npm install -g yarn`
- **Docker** — [install](https://docs.docker.com/get-docker/) (must be running)

### Automated Setup

Clone the repo and run the setup script — it handles everything:

```bash
git clone https://github.com/AhmadMujtaba200210/personal-portfolio-websi.git
cd personal-portfolio-websi
chmod +x setup.sh
./setup.sh
```

The script will:
1. Verify that Node.js 18+ and Docker are installed and running
2. Create a `.env` file with sensible local defaults (random secrets auto-generated)
3. Install all npm dependencies
4. Start a PostgreSQL container via Docker Compose
5. Generate the Prisma client and push the database schema
6. Seed the database with a default admin user and hero section
7. Print the URLs and credentials to get started

Once complete, start both apps:

```bash
npm run dev
```

- **Portfolio**: [http://localhost:3000](http://localhost:3000)
- **CMS (Admin)**: [http://localhost:4020](http://localhost:4020)

> [!IMPORTANT]
> **Default Admin Credentials**:
> - **Email**: `admin@example.com`
> - **Password**: `admin123`
>
> *Change these in the CMS dashboard immediately after first login.*

---

## ⚙️ Manual Setup (Step-by-Step)

If you prefer to set things up manually instead of using the script:

### 1. Install Dependencies
```bash
yarn install
```

### 2. Environment Configuration
Copy the example and edit as needed:
```bash
cp .env.example .env
```

Your `.env` must include at minimum:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db
AUTH_SECRET=<generate with: openssl rand -base64 32>
REVALIDATION_SECRET=<generate with: openssl rand -base64 32>
PORTFOLIO_URL=http://localhost:3000
```

Next.js loads environment variables from its own project directory, so you also need to
create `.env.local` in each app:

**`apps/cms/.env.local`**:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db
AUTH_SECRET=<same as root .env>
REVALIDATION_SECRET=<same as root .env>
PORTFOLIO_URL=http://localhost:3000
```

**`apps/portfolio/.env.local`**:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db
REVALIDATION_SECRET=<same as root .env>
```

### 3. Start the Database
```bash
docker compose up -d db
```

### 4. Database Schema & Seeding
```bash
# Generate the Prisma client
npx prisma generate --schema packages/database/prisma/schema.prisma

# Push the schema to the database
npx prisma db push --config packages/database/prisma.config.ts

# Seed the default admin user
cd packages/database && npx prisma db seed && cd ../..
```

### 5. Launch
```bash
npm run dev
```

---

## 🛠️ Useful Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start both Portfolio and CMS concurrently |
| `npm run dev:cms` | Start only the CMS |
| `npm run dev:portfolio` | Start only the Portfolio |
| `yarn install` | Install all monorepo dependencies |
| `npx turbo build` | Build all apps for production |
| `docker compose up -d db` | Start the PostgreSQL database |
| `docker compose down` | Stop the database container |
| `npx prisma studio --schema packages/database/prisma/schema.prisma` | Open the visual database explorer |

## 📁 Key Directories

| Path | Description |
| :--- | :--- |
| `apps/cms/public/uploads` | Media asset storage |
| `packages/database/prisma/schema.prisma` | Single source of truth for the data model |
| `packages/database/prisma/seed.ts` | Database seed script (admin user & hero data) |
| `.env.example` | Template for required environment variables |

---

## 🐳 Production Deployment (Docker)

The full `docker-compose.yml` includes services for Nginx, Portfolio, CMS, and PostgreSQL. To deploy:

```bash
cp .env.example .env   # fill in production values
docker compose up -d
```

This starts the entire stack behind an Nginx reverse proxy on ports 80/443.

---

## 🛡️ Security & Performance
- **NextAuth v5**: Secure, Edge-compatible authentication.
- **React 19 Server Components**: Maximum SEO and sub-second load times.
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, Referrer-Policy.
