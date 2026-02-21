import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  // Avoid initializing Prisma during `next build` (Render build phase).
  // The API routes aren't executed during build, but module init can still run.
  if (process.env.npm_lifecycle_event === "build") {
    throw new Error("Prisma client initialization is disabled during build.");
  }

  const p = global.__prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") global.__prisma = p;
  return p;
}
