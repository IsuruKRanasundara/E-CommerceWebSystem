import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.nHRig-F9.js';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.BDR52Rf2.js';
import '../../shared/better-auth.B-pjewPT.js';
import 'jose';
import 'zod/v4/core';
import 'zod';
import 'better-sqlite3';
import 'bun:sqlite';

interface PrismaConfig {
    /**
     * Database provider.
     */
    provider: "sqlite" | "cockroachdb" | "mysql" | "postgresql" | "sqlserver" | "mongodb";
    /**
     * Enable debug logs for the adapter
     *
     * @default false
     */
    debugLogs?: AdapterDebugLogs;
    /**
     * Use plural table names
     *
     * @default false
     */
    usePlural?: boolean;
}
interface PrismaClient {
}
declare const prismaAdapter: (prisma: PrismaClient, config: PrismaConfig) => (options: BetterAuthOptions) => Adapter;

export { prismaAdapter };
export type { PrismaConfig };
