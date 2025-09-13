// Import data types from drizzle-orm for PostgreSQL
// These are used to define the structure of our database columns
const { pgTable, varchar, uuid, text, integer } = require('drizzle-orm/pg-core');

// Import the author table to create a foreign key relationship
// This allows us to link books to their authors
const authorTable = require('./author.model');

// Define the books table structure
// pgTable creates a table definition that drizzle can use to generate SQL
const booksTable = pgTable('books', {
  // Define the id column as a UUID (Universally Unique Identifier)
  // primaryKey() makes this the primary key (unique identifier for each row)
  // defaultRandom() automatically generates a random UUID for new records
  id: uuid().primaryKey().defaultRandom(),
  
  // Define the title column as a variable character string
  // length: 100 limits the title to 100 characters maximum
  // notNull() means this field is required and cannot be empty
  title: varchar({ length: 100 }).notNull(),
  
  // Define the description column as text
  // text() allows for longer text content (no length limit)
  // This field is optional (no notNull() constraint)
  description: text(),
  
  // Define the authorId column as a UUID
  // references() creates a foreign key relationship to the author table
  // This means every book must be associated with an existing author
  // notNull() means this field is required
  authorId: uuid().references(() => authorTable.id).notNull(),
});

// Export the booksTable so other files can import and use it
// This allows our controllers to query the books table
module.exports = booksTable;

// This is a comment showing how to run the Drizzle Studio
// Drizzle Studio is a web interface to view and manage your database
// npx drizzle-kit studio --port 4984