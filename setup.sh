#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# Portfolio Ecosystem — Local Development Setup
#
# This script automates the full local setup:
#   1. Checks prerequisites (Node.js 18+, npm, Docker)
#   2. Installs dependencies
#   3. Creates a .env file with sensible defaults
#   4. Starts a PostgreSQL container
#   5. Generates the Prisma client, pushes the schema, and seeds the database
#   6. Launches both the Portfolio and CMS dev servers
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── Colours & helpers ─────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

info()    { echo -e "${BLUE}ℹ${NC}  $1"; }
success() { echo -e "${GREEN}✅${NC} $1"; }
warn()    { echo -e "${YELLOW}⚠️${NC}  $1"; }
fail()    { echo -e "${RED}❌${NC} $1"; exit 1; }

# ── Navigate to repo root ────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo -e "${BOLD}${BLUE}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${BLUE}║   Portfolio Ecosystem — Local Development Setup  ║${NC}"
echo -e "${BOLD}${BLUE}╚══════════════════════════════════════════════════╝${NC}"
echo ""

# ── Step 1: Check prerequisites ──────────────────────────────────────────────
info "Checking prerequisites..."

command -v node  &>/dev/null || fail "Node.js is not installed. Install Node.js 18+ and try again."
command -v npm   &>/dev/null || fail "npm is not installed. Install npm and try again."
command -v yarn  &>/dev/null || fail "yarn is not installed. Install yarn (npm install -g yarn) and try again."
command -v docker &>/dev/null || fail "Docker is not installed. Install Docker and try again."

NODE_MAJOR=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_MAJOR" -lt 18 ]; then
    fail "Node.js 18+ is required. Found: $(node -v)"
fi
success "Node.js $(node -v)"

docker info &>/dev/null || fail "Docker daemon is not running. Start Docker and try again."
success "Docker is running"

# ── Step 2: Create .env with local defaults ───────────────────────────────────
if [ -f .env ]; then
    success ".env already exists — skipping creation"
else
    info "Creating .env with local development defaults..."

    # Generate random secrets (fallback to /dev/urandom if openssl is absent)
    gen_secret() {
        openssl rand -base64 32 2>/dev/null || head -c 32 /dev/urandom | base64
    }

    cat > .env <<EOF
# ── Database credentials (used by docker-compose & Prisma) ──
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=portfolio_db
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/portfolio_db

# ── NextAuth v5 secret (auto-generated) ──
AUTH_SECRET=$(gen_secret)

# ── Revalidation (shared secret between CMS → Portfolio) ──
REVALIDATION_SECRET=$(gen_secret)

# ── CMS → Portfolio connection ──
PORTFOLIO_URL=http://localhost:3000
EOF
    success ".env created with local defaults"
fi

# Export env vars so all subsequent commands can see them
set -a
source .env
set +a

# Create .env.local files for each Next.js app so they can read env vars at runtime.
# Next.js loads .env.local from its own project directory, not the monorepo root.
if [ ! -f apps/cms/.env.local ]; then
    cat > apps/cms/.env.local <<EOF
DATABASE_URL=${DATABASE_URL}
AUTH_SECRET=${AUTH_SECRET}
REVALIDATION_SECRET=${REVALIDATION_SECRET}
PORTFOLIO_URL=${PORTFOLIO_URL}
EOF
    success "apps/cms/.env.local created"
fi

if [ ! -f apps/portfolio/.env.local ]; then
    cat > apps/portfolio/.env.local <<EOF
DATABASE_URL=${DATABASE_URL}
REVALIDATION_SECRET=${REVALIDATION_SECRET}
EOF
    success "apps/portfolio/.env.local created"
fi

# ── Step 3: Install dependencies ─────────────────────────────────────────────
info "Installing dependencies (this may take a minute)..."
yarn install
success "Dependencies installed"

# ── Step 4: Start PostgreSQL container ────────────────────────────────────────
info "Starting PostgreSQL container..."
docker compose up -d db
success "PostgreSQL container started"

# Wait until the database accepts connections
info "Waiting for database to be ready..."
RETRIES=30
until docker compose exec db pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" &>/dev/null; do
    RETRIES=$((RETRIES - 1))
    if [ "$RETRIES" -le 0 ]; then
        fail "Database did not become ready in time. Check 'docker compose logs db'."
    fi
    sleep 1
done
success "Database is accepting connections"

# ── Step 5: Generate Prisma client ────────────────────────────────────────────
info "Generating Prisma client..."
npx prisma generate --schema packages/database/prisma/schema.prisma
success "Prisma client generated"

# ── Step 6: Push schema to database ───────────────────────────────────────────
info "Pushing schema to database..."
npx prisma db push --config packages/database/prisma.config.ts
success "Database schema synced"

# ── Step 7: Seed the database ─────────────────────────────────────────────────
info "Seeding database with default admin user & hero section..."
cd packages/database
npx prisma db seed
cd "$SCRIPT_DIR"
success "Database seeded"

# ── Step 8: Create required directories ───────────────────────────────────────
mkdir -p apps/cms/public/uploads
success "Uploads directory ready"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${GREEN}║   🎉  Setup complete!                            ║${NC}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Start both apps with:  ${YELLOW}npm run dev${NC}"
echo ""
echo -e "  ${BOLD}Portfolio${NC}  → ${BLUE}http://localhost:3000${NC}"
echo -e "  ${BOLD}CMS${NC}       → ${BLUE}http://localhost:4020${NC}"
echo ""
echo -e "  ${BOLD}Default admin login:${NC}"
echo -e "    Email:    ${YELLOW}admin@example.com${NC}"
echo -e "    Password: ${YELLOW}admin123${NC}"
echo ""
echo -e "  To stop the database later: ${YELLOW}docker compose down${NC}"
echo ""
