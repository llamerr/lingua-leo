import type { Config } from 'drizzle-kit';

/** @type {import('drizzle-kit').Config} */
export default {
  out: './migrations',
  schema: [
    './src/models/BooksSchema.tables.ts',
    './src/models/BooksSchema.relations.ts',
    './src/models/GuestbookSchema.ts',
  ],
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? '',
  },
} satisfies Config;
