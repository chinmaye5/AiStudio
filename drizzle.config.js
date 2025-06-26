import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
    schema: './utils/schema.ts',
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_JLzhdri2NMv1@ep-round-forest-a85se7d1-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
    }
});
