# CLAUDE.md - AI Assistant Guide for Fullstack Next.js Wiki Repository

## Repository Overview

This is a **step-based tutorial repository** for Brian Holt's Frontend Masters course "Build a Fullstack Next.js App" (v4). It contains 10 progressive snapshots of a minimal, educational wiki application, each representing a complete checkpoint in the learning journey.

**Course Website**: https://fullstack-v4.holt.courses
**Repository**: https://github.com/btholt/build-a-fullstack-nextjs-app-v4

### Purpose & Philosophy

- **Educational first**: Code prioritizes readability and learning over production-ready patterns
- **Barebones MVP**: Minimal functionality, no bells and whistles
- **Progressive enhancement**: Each step adds one major feature to the previous step
- **Stub-based design**: Early steps use simple stubs that get upgraded to real implementations
- **Live coding ready**: Designed for instructor demonstrations and student follow-along

## Critical Understanding: Step-Based Architecture

### How Steps Work

This repository uses a **multi-step monorepo pattern** where each numbered folder is a complete, standalone project:

```
fullstack-next-wiki/
├── 00-start/          # Basic Next.js setup with Tailwind
├── 01-shadcn/         # Adds shadcn/ui components
├── 02-complete-ui/    # Complete UI with all pages
├── 03-auth/           # Adds Stack Auth integration
├── 04-database/       # Adds Neon PostgreSQL + Drizzle ORM
├── 05-object-storage/ # Adds Vercel Blob for file uploads
├── 06-caching/        # Adds Upstash Redis for caching
├── 07-email/          # Adds Resend for email
├── 08-ai/             # Adds Anthropic AI SDK
└── 09-with-tests/     # Adds Vitest + Playwright tests
```

### CRITICAL: Step Isolation Rules

**When modifying code:**

1. **Each step is independent** - Changes in one step do NOT automatically propagate to others
2. **Ask before cross-step changes** - If a bug/improvement affects multiple steps, ask the user which steps to modify
3. **Work in the correct step** - Verify which step folder you're in before making changes
4. **Most work happens in 09-with-tests** - This is the "final" version with all features
5. **Earlier steps are intentionally simplified** - Don't "improve" early steps with features from later steps

### Step Progression Overview

| Step | Features Added | Key Technologies |
|------|---------------|------------------|
| 00 | Basic Next.js + Tailwind | Next.js 15 App Router |
| 01 | shadcn/ui components | Radix UI primitives |
| 02 | Complete UI pages | Markdown editor |
| 03 | Authentication | Stack Auth |
| 04 | Database | Neon PostgreSQL + Drizzle ORM |
| 05 | File uploads | Vercel Blob |
| 06 | Caching | Upstash Redis |
| 07 | Email | Resend |
| 08 | AI features | Anthropic via Vercel AI SDK |
| 09 | Testing | Vitest + Playwright |

## Project Structure (09-with-tests as Reference)

```
09-with-tests/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── actions/        # Server Actions (articles, pageviews, upload)
│   │   ├── api/            # API routes (e.g., /api/summary)
│   │   ├── handler/        # Stack Auth handler
│   │   ├── wiki/           # Wiki pages ([id], edit/[id], edit/new)
│   │   ├── layout.tsx      # Root layout with nav
│   │   ├── page.tsx        # Home page (wiki list)
│   │   ├── not-found.tsx   # 404 page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── nav/            # Navigation components
│   │   └── ui/             # shadcn/ui components
│   ├── db/
│   │   ├── schema.ts       # Drizzle schema definitions
│   │   ├── index.ts        # Database client
│   │   ├── authz.ts        # Authorization helpers
│   │   └── seed.ts         # Database seeding script
│   ├── lib/
│   │   ├── data/           # Data access layer
│   │   └── utils.ts        # Utility functions (cn helper)
│   ├── email/
│   │   ├── templates/      # Email templates
│   │   └── index.ts        # Email sending logic
│   ├── cache/              # Redis caching helpers
│   ├── ai/                 # AI integration (Anthropic)
│   └── stack/              # Stack Auth configuration
├── test/
│   ├── e2e/                # Playwright E2E tests
│   └── unit/               # Vitest unit tests
├── drizzle/                # Database migrations
├── public/                 # Static assets
├── .llm-notes/             # LLM-specific documentation
├── .env.example            # Example environment variables
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── biome.json             # Biome linter/formatter config
├── vitest.config.ts       # Vitest configuration
├── playwright.config.ts   # Playwright configuration
└── drizzle.config.ts      # Drizzle ORM configuration
```

## Tech Stack

### Core Framework
- **Next.js 15** with App Router and Turbopack
- **React 19** (Server Components + Client Components)
- **TypeScript 5** for type safety

### Styling
- **Tailwind CSS 4** for utility-first styling
- **shadcn/ui** for pre-built accessible components
- **Radix UI** primitives under the hood
- **Lucide React** for icons

### Backend & Data
- **Neon PostgreSQL** (serverless Postgres)
- **Drizzle ORM** for type-safe database queries
- **Upstash Redis** for caching (step 06+)

### Authentication & Authorization
- **Stack Auth** for authentication flows
- Role-based authorization in `src/db/authz.ts`

### File Storage
- **Vercel Blob** for file uploads and storage

### Communication
- **Resend** for transactional emails
- **React Email** for email templates

### AI Integration
- **Anthropic Claude** via Vercel AI SDK
- Used for content summarization

### Testing
- **Vitest** for unit and integration tests
- **Playwright** for E2E tests
- **Testing Library** for React component testing

### Code Quality
- **Biome** for linting and formatting (replaces ESLint + Prettier)
- **TypeScript** strict mode enabled

### Deployment & Monitoring
- **Vercel** for hosting
- **Vercel Analytics** for usage tracking
- **Vercel Speed Insights** for performance monitoring

## Development Workflows

### Common Commands (per step)

```bash
# Install dependencies
npm install

# Development
npm run dev              # Start dev server with Turbopack

# Type checking & linting
npm run typecheck        # TypeScript type checking
npm run lint             # Run Biome linter
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Biome

# Database (04-database and later)
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database with test data

# Testing (09-with-tests only)
npm run test             # Run unit tests once
npm run test:watch       # Run unit tests in watch mode
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Open Playwright UI
npm run test:e2e:debug   # Debug E2E tests
npm run test:ci          # Run all tests (CI mode)

# Build & deploy
npm run build            # Production build
npm run start            # Serve production build
```

### Repository-Level Commands

```bash
# Run linting and typecheck on all steps
./lint-all-steps.sh
```

### Environment Setup

Each step may require different environment variables. Always check `.env.example` in the step folder.

**Common environment variables (09-with-tests):**

```bash
# Database
DATABASE_URL=                    # Neon PostgreSQL connection string

# Authentication (Stack Auth)
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=

# Caching (Upstash Redis)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# File Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=
BLOB_BASE_URL=

# Email (Resend)
RESEND_API_KEY=

# AI (Anthropic)
ANTHROPIC_API_KEY=

# Testing
TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

**IMPORTANT**: Never commit `.env` files. Use `.env.example` as a template.

## Key Architectural Patterns

### 1. Server Components by Default

This project leverages React Server Components heavily:

- **Server Components** (default): No `"use client"` directive
  - Used for data fetching, database queries, server-side logic
  - Files: `page.tsx`, `layout.tsx`, most components in `app/`

- **Client Components**: Have `"use client"` at the top
  - Used for interactivity, state, event handlers, browser APIs
  - Examples: Form components, interactive editors, modals

### 2. Server Actions Pattern

Server Actions are defined in `src/app/actions/`:

```typescript
// src/app/actions/articles.ts
"use server";

export async function createArticle(formData: FormData) {
  // Server-side logic, database calls
  const title = formData.get("title") as string;
  // ...
  return { success: true, id: newArticle.id };
}
```

**Called from Client Components:**

```typescript
"use client";
import { createArticle } from "@/app/actions/articles";

export function ArticleForm() {
  return (
    <form action={createArticle}>
      {/* form fields */}
    </form>
  );
}
```

### 3. Data Access Layer Pattern

Database queries are centralized in `src/lib/data/`:

```typescript
// src/lib/data/articles.ts
import { db } from "@/db";
import { articles } from "@/db/schema";

export async function getAllArticles() {
  return db.select().from(articles).orderBy(articles.updatedAt);
}
```

This separates data access from UI components and Server Actions.

### 4. Authorization Pattern

Authorization checks use `src/db/authz.ts`:

```typescript
import { canEditArticle } from "@/db/authz";

export async function updateArticle(id: string, data: ArticleData) {
  const user = await getUser();
  if (!canEditArticle(user)) {
    throw new Error("Unauthorized");
  }
  // ... update logic
}
```

### 5. Caching Strategy (Step 06+)

Uses Upstash Redis with Next.js cache integration:

```typescript
import { cache } from "@/cache";

export const getArticle = cache(async (id: string) => {
  // If cached, returns immediately
  // If not cached, fetches from DB and caches
  return db.query.articles.findFirst({ where: eq(articles.id, id) });
}, {
  keyPrefix: "article",
  ttl: 3600 // 1 hour
});
```

### 6. Testing Patterns

**Unit Tests (Vitest):**
```typescript
// test/unit/lib/data/articles.test.ts
import { describe, it, expect } from "vitest";
import { getAllArticles } from "@/lib/data/articles";

describe("getAllArticles", () => {
  it("should return all articles", async () => {
    const articles = await getAllArticles();
    expect(articles).toBeInstanceOf(Array);
  });
});
```

**E2E Tests (Playwright):**
```typescript
// test/e2e/wiki.spec.ts
import { test, expect } from "@playwright/test";

test("can create a new article", async ({ page }) => {
  await page.goto("/wiki/edit/new");
  await page.fill('[name="title"]', "Test Article");
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/wiki\/.+/);
});
```

## Code Style Conventions

### General Principles

1. **Readable over optimal** - Prioritize clarity over performance tricks
2. **Minimal abstractions** - Avoid complex patterns, keep it straightforward
3. **No premature optimization** - Don't add caching, lazy loading unless needed
4. **Explicit over magic** - Obvious code beats clever shortcuts
5. **TypeScript basics** - Use types, but keep them simple and obvious

### What NOT to Include

This is an educational project. Avoid adding:

- Complex state management (Redux, Zustand, etc.)
- Advanced React patterns (useMemo, useCallback unless necessary)
- Performance optimizations (code splitting beyond Next.js defaults)
- Comprehensive SEO features
- Advanced accessibility beyond basics
- Internationalization
- Complex animations or transitions

### Naming Conventions

- **Files**: kebab-case for files (`article-form.tsx`)
- **Components**: PascalCase (`ArticleForm`)
- **Functions**: camelCase (`getArticle`, `createArticle`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_TITLE_LENGTH`)
- **Types/Interfaces**: PascalCase (`Article`, `ArticleData`)

### Import Order

```typescript
// 1. External libraries
import { useState } from "react";
import { redirect } from "next/navigation";

// 2. Internal modules (use @ alias)
import { getArticle } from "@/lib/data/articles";
import { Button } from "@/components/ui/button";

// 3. Types
import type { Article } from "@/db/schema";
```

### TypeScript Usage

- Enable strict mode (already configured)
- Use type inference where obvious
- Explicit types for function parameters and return values
- Use `interface` for object shapes, `type` for unions/intersections
- Avoid `any` - use `unknown` if truly dynamic

## Working with Database (Step 04+)

### Schema Definition

Schemas are defined in `src/db/schema.ts` using Drizzle ORM:

```typescript
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  authorId: text("author_id").notNull(),
});
```

### Making Schema Changes

1. Edit `src/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Review the generated migration in `drizzle/`
4. Run migration: `npm run db:migrate`

### Database Queries

```typescript
import { db } from "@/db";
import { articles } from "@/db/schema";
import { eq } from "drizzle-orm";

// Select all
const allArticles = await db.select().from(articles);

// Select with condition
const article = await db.query.articles.findFirst({
  where: eq(articles.id, articleId)
});

// Insert
const [newArticle] = await db.insert(articles).values({
  title: "New Article",
  content: "Content here",
  authorId: userId,
}).returning();

// Update
await db.update(articles)
  .set({ title: "Updated Title", updatedAt: new Date() })
  .where(eq(articles.id, articleId));

// Delete
await db.delete(articles).where(eq(articles.id, articleId));
```

## Authentication & Authorization

### Getting Current User

```typescript
import { getUser } from "@/stack";

export async function myServerAction() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  // user.id, user.email, etc.
}
```

### Authorization Checks

```typescript
import { canEditArticle, canDeleteArticle } from "@/db/authz";

const user = await getUser();
const article = await getArticle(id);

if (!canEditArticle(user, article)) {
  throw new Error("Unauthorized");
}
```

### Protected Routes

Use middleware or check in Server Components:

```typescript
// In a page.tsx
import { getUser } from "@/stack";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  return <div>Protected content</div>;
}
```

## Testing Strategy

### Test Organization

```
test/
├── unit/              # Unit tests mirror src/ structure
│   ├── lib/
│   │   └── data/
│   │       └── articles.test.ts
│   └── app/
│       └── actions/
│           └── articles.test.ts
└── e2e/              # E2E tests by feature
    ├── auth.spec.ts
    ├── wiki.spec.ts
    └── upload.spec.ts
```

### When to Write Tests

- **Unit tests**: Data access functions, utility functions, complex logic
- **E2E tests**: Critical user flows (auth, CRUD operations, file uploads)
- **Not needed**: Simple UI components, basic Server Components

### Running Tests in CI

The CI workflow creates ephemeral Neon database branches for test isolation:

```yaml
# .github/workflows/ci.yml
- name: Create Neon Branch
  uses: neondatabase/create-branch-action@v6
  with:
    project_id: ${{ secrets.NEON_PROJECT_ID }}
    branch_name: test-${{ github.run_id }}

- name: Run tests
  run: npm run test:ci
  env:
    DATABASE_URL: ${{ steps.create-neon-branch.outputs.db_url }}
```

## CI/CD Pipeline

### GitHub Actions Workflows

The repository has CI workflows that:

1. **Lint & Typecheck** all 10 steps (matrix job)
2. **Unit tests** on step 09 with ephemeral database
3. **E2E tests** on step 09 with ephemeral database
4. **Cleanup** database branches after tests

### Secrets Required

For CI/CD to work, configure these GitHub secrets:

```
NEON_PROJECT_ID
NEON_API_KEY
NEXT_PUBLIC_STACK_PROJECT_ID
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY
STACK_SECRET_SERVER_KEY
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
BLOB_READ_WRITE_TOKEN
BLOB_BASE_URL
RESEND_API_KEY
TEST_USER_EMAIL
TEST_USER_PASSWORD
```

## Common Tasks for AI Assistants

### Task 1: Adding a New Feature to a Specific Step

1. **Confirm the step** - Ask user which step(s) to modify
2. **Read existing code** - Understand current patterns in that step
3. **Follow step conventions** - Don't add features from later steps
4. **Test locally** - Run `npm run typecheck` and `npm run lint`
5. **Ask about propagation** - Should this change go to later steps?

### Task 2: Fixing a Bug Across Multiple Steps

1. **Identify affected steps** - Check which steps have the buggy code
2. **Ask before modifying** - Confirm which steps to fix
3. **Fix consistently** - Apply same fix pattern to all affected steps
4. **Verify each step** - Run checks in each modified step folder

### Task 3: Adding Tests

1. **Determine test type** - Unit or E2E?
2. **Only add to 09-with-tests** - Earlier steps don't have test infrastructure
3. **Follow existing patterns** - Check `test/` directory for examples
4. **Run tests locally** - `npm run test` or `npm run test:e2e`

### Task 4: Updating Dependencies

1. **Update in all steps** - Dependencies should be consistent across steps
2. **Test each step** - Run `npm install && npm run typecheck && npm run lint`
3. **Check for breaking changes** - Read migration guides
4. **Update lock files** - Commit `package-lock.json` changes

### Task 5: Database Schema Changes

1. **Only modify step 04 and later** - Earlier steps don't have database
2. **Update schema.ts** - Make changes in `src/db/schema.ts`
3. **Generate migration** - `npm run db:generate`
4. **Review migration** - Check generated SQL in `drizzle/`
5. **Update seed data** - Modify `src/db/seed.ts` if needed
6. **Update data access** - Modify functions in `src/lib/data/`

### Task 6: Improving Documentation

1. **Check .llm-notes/** - Step 09 has extensive LLM documentation
2. **Update CLAUDE.md** - This file (repository-level guidance)
3. **Update README.md** - User-facing documentation in root and steps
4. **Update copilot-instructions.md** - GitHub Copilot specific guidance

## LLM-Specific Documentation

Step 09 has a `.llm-notes/` directory with detailed documentation:

- `API_ROUTES_README.md` - API route patterns
- `TEST_README.md` - Testing guidelines
- `STACK_AUTH_INTEGRATION.md` - Auth integration details
- `WIKI_EDITOR_README.md` - Editor component documentation
- `WIKI_VIEWER_README.md` - Viewer component documentation
- `FIXES_APPLIED.md` - Historical fixes and issues
- `TESTING_SUMMARY.md` - Test coverage summary

**When working on step 09, read these files for context.**

## Troubleshooting Common Issues

### Issue: Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Issue: Environment variables not loading
```bash
# Restart dev server after changing .env
# Or check you're in the correct step folder
```

### Issue: Database migrations not applying
```bash
# Check DATABASE_URL is set correctly
# Verify Neon database is accessible
# Run migration manually:
npm run db:migrate
```

### Issue: TypeScript errors after dependency update
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue: Tests failing in CI but passing locally
```bash
# Check environment variables in CI
# Verify secrets are configured in GitHub
# Check Neon branch creation logs
```

## Best Practices for AI Assistants

### DO ✅

- **Read before writing** - Always read existing files before modifying
- **Ask about scope** - Clarify which step(s) to modify
- **Follow existing patterns** - Match the style and structure you see
- **Run checks** - Execute `typecheck` and `lint` after changes
- **Respect step boundaries** - Don't add future features to early steps
- **Use path aliases** - Import from `@/` not relative paths
- **Be explicit** - Clear, simple code over clever abstractions
- **Check .llm-notes** - Read relevant docs in step 09's `.llm-notes/`

### DON'T ❌

- **Don't assume step propagation** - Changes don't auto-apply to other steps
- **Don't over-engineer** - Keep it simple and educational
- **Don't add production features** - This is a learning project
- **Don't skip type checking** - Always run `npm run typecheck`
- **Don't ignore Biome** - Follow the linter/formatter rules
- **Don't commit secrets** - Check for `.env` in changes
- **Don't add unnecessary dependencies** - Keep it minimal
- **Don't break existing tests** - Run tests before committing

## Quick Reference

### File Locations by Feature

| Feature | File Path |
|---------|-----------|
| Database schema | `src/db/schema.ts` |
| Database client | `src/db/index.ts` |
| Data access layer | `src/lib/data/` |
| Server Actions | `src/app/actions/` |
| API routes | `src/app/api/` |
| Auth config | `src/stack/` |
| Email templates | `src/email/templates/` |
| Caching | `src/cache/` |
| AI integration | `src/ai/` |
| UI components | `src/components/ui/` |
| Navigation | `src/components/nav/` |
| Global styles | `src/app/globals.css` |
| Utils | `src/lib/utils.ts` |

### Import Aliases

```typescript
import { ... } from "@/db"              // src/db
import { ... } from "@/lib/data/..."    // src/lib/data
import { ... } from "@/app/actions/..." // src/app/actions
import { ... } from "@/components/..."  // src/components
import { ... } from "@/cache"           // src/cache
import { ... } from "@/ai"              // src/ai
import { ... } from "@/stack"           // src/stack
```

## Additional Resources

- **Course Website**: https://fullstack-v4.holt.courses
- **Course Text**: https://fullstack-v4.holt.courses/llms.txt
- **Repository**: https://github.com/btholt/build-a-fullstack-nextjs-app-v4
- **Next.js Docs**: https://nextjs.org/docs
- **Drizzle ORM Docs**: https://orm.drizzle.team
- **Stack Auth Docs**: https://docs.stack-auth.com
- **Vercel Docs**: https://vercel.com/docs

---

**Last Updated**: 2025-12-10
**For Questions**: Check `.github/copilot-instructions.md` and step 09's `.llm-notes/` directory
