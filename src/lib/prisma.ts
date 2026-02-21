import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  // Avoid initializing Prisma during `next build` (Render build phase).
  // The API routes aren't executed during build, but module init can still run.
  if (process.env.npm_lifecycle_event === "build") {
    throw new Error("Prisma client initialization is disabled during build.");
  }

  const datasourceUrl = process.env.DATABASE_URL;
  if (!datasourceUrl) {
    throw new Error("DATABASE_URL is required at runtime.");
  }

  const p = global.__prisma || new PrismaClient({ datasourceUrl });
  if (process.env.NODE_ENV !== "production") global.__prisma = p;
  return p;
}
