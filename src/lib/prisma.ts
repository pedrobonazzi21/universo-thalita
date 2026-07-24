import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL ?? "";
  const authToken = process.env.TURSO_AUTH_TOKEN ?? "";
  const client = createClient({ url, authToken });
  const adapter = new PrismaLibSql(client as any);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
