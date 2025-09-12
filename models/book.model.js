const { pgTable, varchar, uuid, text, integer } = require('drizzle-orm/pg-core');
const authorTable = require('./author.model');

const booksTable = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 100 }).notNull(),
  description: text(),
  authorId: uuid().references(() => authorTable.id).notNull(),
});

module.exports = booksTable;


// npx drizzle-kit studio --port 4984