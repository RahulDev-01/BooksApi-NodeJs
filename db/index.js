const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5433/mydb';

const pool = new Pool({ connectionString });
const db = drizzle(pool);

module.exports = db;