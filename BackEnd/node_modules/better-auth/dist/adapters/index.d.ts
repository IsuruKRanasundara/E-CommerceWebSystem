import { b as AdapterConfig, C as CreateCustomAdapter, B as BetterAuthOptions, a as Adapter } from '../shared/better-auth.nHRig-F9.js';
export { A as AdapterDebugLogs, e as AdapterTestDebugLogs, d as CleanedWhere, c as CustomAdapter } from '../shared/better-auth.nHRig-F9.js';
import 'kysely';
import 'better-call';
import 'zod/v4';
import '../shared/better-auth.BDR52Rf2.js';
import '../shared/better-auth.B-pjewPT.js';
import 'jose';
import 'zod/v4/core';
import 'zod';
import 'better-sqlite3';
import 'bun:sqlite';

declare const createAdapter: ({ adapter, config: cfg, }: {
    config: AdapterConfig;
    adapter: CreateCustomAdapter;
}) => (options: BetterAuthOptions) => Adapter;

export { AdapterConfig, CreateCustomAdapter, createAdapter };
