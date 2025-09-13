// Import the booksTable schema from the models directory
// This table defines the structure of our books in the database
const { booksTable } = require("../models");

// Import the database connection instance
// This allows us to execute SQL queries on our PostgreSQL database
const db = require("../db");

// Import the 'eq' function from drizzle-orm
// This function helps us create 'WHERE' conditions in our SQL queries
const { eq ,ilike} = require("drizzle-orm");

// Export a function called getAllBooks that handles GET requests to fetch all books
// 'async' means this function can handle asynchronous operations (like database queries)
// 'req' is the request object (contains data sent by the client)
// 'res' is the response object (used to send data back to the client)
exports.getAllBooks = async function (req, res) {
  try {
    // Use try-catch to handle any errors that might occur during database operations
    const search = req.query.search;
    if(search){
      // Execute a SELECT query to get all books from the booksTable
      // 'await' waits for the database query to complete before continuing
      const books = await db.select().from(booksTable).where(ilike(booksTable.title,`%${search}%`));

     return res.json(books);
    }
    
    
    // Send the books data back to the client as JSON
    // This will be the response body that the client receives
    res.json(books);
  } catch (error) {
    // If an error occurs during the database operation, this block will execute
    
    // Log the error to the console for debugging purposes
    console.error('Error fetching books:', error);
    
    // Send an error response back to the client
    // Status 500 means "Internal Server Error"
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Export a function called getBooksById that handles GET requests to fetch a specific book by ID
// This function will be called when someone makes a GET request to /books/:id
exports.getBooksById = async function (req, res) {
  // Extract the 'id' parameter from the URL
  // For example, if the URL is /books/123, then id will be "123"
  const id = req.params.id;

  try {
    // Use try-catch to handle any errors that might occur during database operations
    
    // Execute a SELECT query to find a book with the specific ID
    // 'where(eq(booksTable.id, id))' means "WHERE id = id"
    // This will return an array of books (should be 0 or 1 book)
    const books = await db.select().from(booksTable).where(eq(booksTable.id, id));

    // Check if no books were found (array is empty)
    if (books.length === 0) {
      // If no book found, send a 404 error response
      // 404 means "Not Found"
      return res
        .status(404)
        .json({ error: `Book with id ${id} does not exist!` });
    }

    // If a book was found, send it back as JSON
    // books[0] gets the first (and only) book from the array
    return res.json(books[0]);
  } catch (error) {
    // If an error occurs during the database operation, this block will execute
    
    // Log the error to the console for debugging purposes
    console.error('Error fetching book:', error);
    
    // Send an error response back to the client
    // Status 500 means "Internal Server Error"
    return res.status(500).json({ error: 'Failed to fetch book' });
  }
};

// Export a function called addNewBook that handles POST requests to create a new book
// This function will be called when someone makes a POST request to /books
exports.addNewBook = async function (req, res) {
  // Extract data from the request body using destructuring
  // The client sends JSON data in the request body, and we extract these fields
  const { title, authorId, description } = req.body;

  // Validate that the title field is provided and not empty
  // This is input validation to ensure we have required data
  if (!title || title === "") {
    // If title is missing or empty, send a 400 error response
    // 400 means "Bad Request" - the client sent invalid data
    return res.status(400).json({ error: `title is required` });
  }

  // Validate that the authorId field is provided
  // Every book must be associated with an author
  if (!authorId) {
    // If authorId is missing, send a 400 error response
    return res.status(400).json({ error: `authorId is required` });
  }

  try {
    // Use try-catch to handle any errors that might occur during database operations
    
    // Execute an INSERT query to add a new book to the database
    // 'values()' specifies the data to insert
    // 'returning()' tells the database to return the ID of the newly created book
    const result = await db.insert(booksTable).values({ title, authorId, description }).returning({ id: booksTable.id });
    
    // Send a success response back to the client
    // Status 201 means "Created" - a new resource was successfully created
    // Include the ID of the newly created book in the response
    return res.status(201).json({ message: `Book is created successfully`, id: result[0].id });
  } catch (error) {
    // If an error occurs during the database operation, this block will execute
    
    // Log the error to the console for debugging purposes
    console.error('Error creating book:', error);
    
    // Send an error response back to the client
    // Status 500 means "Internal Server Error"
    return res.status(500).json({ error: 'Failed to create book' });
  }
};

// Export a function called deleteABook that handles DELETE requests to remove a book
// This function will be called when someone makes a DELETE request to /books/:id
exports.deleteABook = async function (req, res) {
  // Extract the 'id' parameter from the URL
  // For example, if the URL is /books/123, then id will be "123"
  const id = req.params.id;

  try {
    // Use try-catch to handle any errors that might occur during database operations
    
    // Execute a DELETE query to remove the book with the specific ID
    // 'where(eq(booksTable.id, id))' means "WHERE id = id"
    // This will delete the book if it exists
    const result = await db.delete(booksTable).where(eq(booksTable.id, id));

    // Check if any rows were affected by the delete operation
    // rowCount tells us how many rows were deleted (0 means no book was found)
    if (result.rowCount === 0) {
      // If no book was deleted (book doesn't exist), send a 404 error response
      // 404 means "Not Found"
      return res.status(404).json({ error: `Book with id ${id} does not exist!` });
    }

    // If a book was successfully deleted, send a success response
    // Status 200 means "OK" - the operation was successful
    return res.status(200).json({ message: "Book Deleted" });
  } catch (error) {
    // If an error occurs during the database operation, this block will execute
    
    // Log the error to the console for debugging purposes
    console.error('Error deleting book:', error);
    
    // Send an error response back to the client
    // Status 500 means "Internal Server Error"
    return res.status(500).json({ error: 'Failed to delete book' });
  }
};
