import { A as AdapterDebugLogs, B as BetterAuthOptions, a as Adapter } from '../../shared/better-auth.QwiX43wb.mjs';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../../shared/better-auth.BDR52Rf2.mjs';
import '../../shared/better-auth.BFod4hxi.mjs';
import 'jose';
import 'zod/v4/core';
import 'zod';
import 'better-sqlite3';
import 'bun:sqlite';

interface MemoryDB {
    [key: string]: any[];
}
interface MemoryAdapterConfig {
    debugLogs?: AdapterDebugLogs;
}
declare const memoryAdapter: (db: MemoryDB, config?: MemoryAdapterConfig) => (options: BetterAuthOptions) => Adapter;

export { memoryAdapter };
export type { MemoryAdapterConfig, MemoryDB };
