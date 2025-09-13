// Import the drizzle function from drizzle-orm for PostgreSQL
// Drizzle is an ORM (Object-Relational Mapping) tool that helps us interact with databases
const { drizzle } = require('drizzle-orm/node-postgres');

// Import the Pool class from the 'pg' library
// Pool manages multiple database connections efficiently
const { Pool } = require('pg');

// Define the database connection string
// This tells our app how to connect to the PostgreSQL database
// process.env.DATABASE_URL checks for an environment variable first
// If not found, it uses the default connection string
// Format: postgres://username:password@host:port/database_name
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:admin@localhost:5433/book-store';

// Create a new connection pool with our connection string
// A pool manages multiple database connections to improve performance
const pool = new Pool({ connectionString });

// Create a drizzle database instance using our connection pool
// This gives us methods to query the database (select, insert, update, delete)
const db = drizzle(pool);

// Export the database instance so other files can import and use it
// This allows our controllers to access the database
module.exports = db;