// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    // No Prisma 7, você pode passar a URL diretamente no constador se necessário:
    // datasource: { url: process.env.DATABASE_URL }
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db