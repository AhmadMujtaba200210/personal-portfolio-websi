# Premium Portfolio & Command Center Monorepo

Welcome to your state-of-the-art portfolio ecosystem. This repository is built using a modern **Next.js 15**, **React 19**, and **Prisma 7** stack, organized as a high-performance monorepo.

## 🏗️ Architecture Overview

- **`apps/cms`**: The "Command Center" - A premium administrative dashboard for managing all content.
- **`apps/portfolio`**: The "Portal" - Your high-fidelity public-facing portfolio.
- **`packages/database`**: Shared database layer containing the Prisma schema and client.
- **`docker-compose.yml`**: Infrastructure definitions for local PostgreSQL and persistent storage.

---

## 🚀 Quick Start Guide

Follow these steps to spin up the entire ecosystem from scratch.

### 1. Prerequisite: Infrastructure
Ensure you have Docker installed and running. Start the database engine:
```bash
docker-compose up -d
```

### 2. Environment Configuration
Create a `.env` file in the root directory (if not already present):
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db?schema=public
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:4020
ADMIN_EMAIL=admin@example.com
```

### 3. Database Synchronization & Seeding
Push the schema to the database and seed the default administrator:
```bash
# Register the schema
npx prisma db push --schema packages/database/prisma/schema.prisma

# Seed the admin user
npx prisma db seed --config packages/database/prisma.config.ts --schema packages/database/prisma/schema.prisma
```

> [!IMPORTANT]
> **Default Credentials**:
> - **Email**: `admin@example.com`
> - **Password**: `admin123`
> *(Please change these in the dashboard immediately after first login)*

### 4. Launch the Ecosystem
Run all applications with a single command from the root:
```bash
npm run dev
```
- **Command Center (Admin)**: `http://localhost:4020`
- **Portfolio (Public)**: `http://localhost:3000`

---

## 🛠️ Operational Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launch both Portfolio and CMS concurrently. |
| `npm run dev:cms` | Launch ONLY the CMS Command Center. |
| `npm run dev:portfolio` | Launch ONLY the Public Portfolio Portal. |
| `npm install` | Install all dependencies for the entire monorepo. |
| `npx turbo build` | Build all applications for production. |
| `docker-compose down` | Stop the database and infrastructure. |
| `npx prisma studio --schema ...` | Visual database explorer. |

## 📁 Key Directories
- `/apps/cms/public/uploads`: Local vault for all media assets.
- `/packages/database/prisma/schema.prisma`: The "Source of Truth" for your data design.

---

## 🛡️ Security & Performance
- **NextAuth v5**: Secure, Edge-compatible authentication.
- **React 19 Server Components**: Maximum SEO and sub-second load times.
- **Industrial Design**: Custom-crafted dark mode aesthetics for an "Out of Class" user experience.
