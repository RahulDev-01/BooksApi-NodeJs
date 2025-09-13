// Import data types from drizzle-orm for PostgreSQL
// These are used to define the structure of our database columns
const { pgTable, varchar, uuid, text, integer } = require('drizzle-orm/pg-core');

// Define the authors table structure
// pgTable creates a table definition that drizzle can use to generate SQL
const authorTable = pgTable('authors', {
  // Define the id column as a UUID (Universally Unique Identifier)
  // primaryKey() makes this the primary key (unique identifier for each row)
  // defaultRandom() automatically generates a random UUID for new records
  id: uuid().primaryKey().defaultRandom(),
  
  // Define the first_name column as a variable character string
  // length: 55 limits the first name to 55 characters maximum
  // notNull() means this field is required and cannot be empty
  first_name: varchar({ length: 55 }).notNull(),
  
  // Define the last_name column as a variable character string
  // length: 55 limits the last name to 55 characters maximum
  // This field is optional (no notNull() constraint)
  last_name: varchar({ length: 55 }),
  
  // Define the email column as a variable character string
  // length: 255 limits the email to 255 characters maximum
  // notNull() means this field is required and cannot be empty
  // unique() ensures that no two authors can have the same email address
  email: varchar({ length: 255 }).notNull().unique(),
});

// Export the authorTable so other files can import and use it
// This allows our controllers to query the authors table
module.exports = authorTable;