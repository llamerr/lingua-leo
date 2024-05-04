import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as BooksSchemaRelations from '../models/BooksSchema.relations';
import * as BooksSchemaTables from '../models/BooksSchema.tables';
import * as GuestbookSchema from '../models/GuestbookSchema';
import { Env } from './Env.mjs';

const pool = new Pool({
  connectionString: Env.DATABASE_URL,
});
export const db = drizzle(pool, {
  schema: { ...BooksSchemaTables, ...BooksSchemaRelations, ...GuestbookSchema },
});
