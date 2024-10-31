import { drizzle } from 'drizzle-orm-pg/postgres.js';
import { sql } from '@vercel/postgres';

const dbDrizzle = drizzle(sql);

export default dbDrizzle;
