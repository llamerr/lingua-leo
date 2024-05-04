/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

import { Env } from '../src/libs/Env.mjs';

async function main() {
  console.log('Migration started');

  const pool = new Pool({
    connectionString: Env.DATABASE_URL,
  });

  const db = drizzle(pool);

  await migrate(db, { migrationsFolder: './migrations' });

  console.log('Migration completed');

  process.exit(0);
}

main().catch((error) => {
  console.error('Migration failed');
  console.log(error);
  process.exit(1);
});
