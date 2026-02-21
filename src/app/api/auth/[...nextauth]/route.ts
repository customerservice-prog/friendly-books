/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getPrisma } from "@/lib/prisma";
import { z } from "zod";
import { verifyPassword } from "@/lib/password";

const credsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function makeHandler() {
  const prisma = getPrisma();

  return NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "database" },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      Credentials({
        name: "Email",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const parsed = credsSchema.safeParse(credentials);
          if (!parsed.success) return null;
          if (process.env.ENABLE_PASSWORD_LOGIN !== "1") return null;

          const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
          if (!user || !user.passwordHash) return null;
          const ok = await verifyPassword(parsed.data.password, user.passwordHash);
          if (!ok) return null;
          return { id: user.id, email: user.email, name: user.name };
        },
      }),
    ],
  });
}

export async function GET(req: Request, ctx: any) {
  return makeHandler()(req as any, ctx);
}

export async function POST(req: Request, ctx: any) {
  return makeHandler()(req as any, ctx);
}
