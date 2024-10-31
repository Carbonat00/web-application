import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',          // Database username
  host: 'localhost',         // Hostname (your DB server)
  database: 'NameDB',        // Database name
  password: 'postgres',      // Database password
  port: 5432,                // Port number
});

module.exports.pool = pool