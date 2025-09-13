// Import the books table definition from the book.model.js file
// This contains the schema for the books table in our database
const booksTable = require('./book.model');

// Import the authors table definition from the author.model.js file
// This contains the schema for the authors table in our database
const authorTable = require('./author.model');

// Export both tables as an object
// This allows other files to import both tables at once
// For example: const { booksTable, authorTable } = require('./models');
module.exports = { booksTable, authorTable };