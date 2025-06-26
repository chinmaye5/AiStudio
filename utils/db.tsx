import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'; // This will now resolve to schema.ts
const sql = neon(process.env.NEXT_PUBLIC_DB_DRIZZLE_URL!);

export const db = drizzle(sql, { schema });
