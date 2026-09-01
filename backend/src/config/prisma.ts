/**
 * Prisma Client Singleton
 *
 * Re-exports the shared Prisma client instance from lib/prisma.ts.
 * This file exists at src/config/prisma so that modules can import
 * from a conventional path:  import { prisma } from "../config/prisma"
 */

export { prisma } from "../../lib/prisma";
