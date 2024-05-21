import type { Config } from 'drizzle-kit';
export default {
	dialect: 'sqlite',
	schema: './src/lib/server/db.ts',
	out: './drizzle',
	dbCredentials: {
		url: './db.sqlite'
	}
} satisfies Config;
