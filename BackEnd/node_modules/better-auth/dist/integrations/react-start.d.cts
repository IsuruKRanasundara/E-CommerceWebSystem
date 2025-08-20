import * as better_call from 'better-call';
import { H as HookEndpointContext } from '../shared/better-auth.BA5VIuwi.cjs';
import 'kysely';
import 'zod/v4';
import '../shared/better-auth.BDR52Rf2.cjs';
import '../shared/better-auth.DSvLrleU.cjs';
import 'jose';
import 'zod/v4/core';
import 'zod';
import 'better-sqlite3';
import 'bun:sqlite';

declare const reactStartCookies: () => {
    id: "react-start-cookies";
    hooks: {
        after: {
            matcher(ctx: HookEndpointContext): true;
            handler: (inputContext: better_call.MiddlewareInputContext<better_call.MiddlewareOptions>) => Promise<void>;
        }[];
    };
};

export { reactStartCookies };
