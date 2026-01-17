// import { PrismaClient } from "@/generated/prisma";

// export const prisma = new PrismaClient();

import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!, // precisa existir em runtime
});

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
