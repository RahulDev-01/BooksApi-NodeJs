const { bookDb } = require("../models/book.js");

exports.getAllBooks = function (req, res) {
  // Return all books in JSON format
  res.json(bookDb);
};

exports.getBooksById = function (req, res) {
  // Convert the ID parameter to an integer
  const id = parseInt(req.params.id);

  // If the ID is not a valid number, return an error
  if (isNaN(id))
    return res.status(400).json({ error: `Id must be of type Number` });

  // Find the book by matching the ID
  const book = bookDb.find((e) => e.id === id);

  // If the book is not found, return a 404 error
  if (!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exist!` });

  // If found, return the book as JSON
  return res.json(book);
};

exports.addNewBook = function (req, res) {
  // Destructure the title and author from the request body
  const { title, author } = req.body;

  // If title is not provided or is empty, return an error
  if (!title || title === "") {
    return res.status(400).json({ error: `title is required` });
  }

  // If author is not provided or is empty, return an error
  if (!author || author === "") {
    return res.status(400).json({ error: `author is required` });
  }

  // Generate a unique ID for the new book (based on the length of current books array)
  const id = bookDb.length + 1;

  // Create a new book object and add it to the books array
  const book = { id, title, author };
  bookDb.push(book);

  // Respond with a success message and the ID of the new book
  return res.status(201).json({ message: `Book is created successfully`, id });
};

exports.deleteABook = function (req, res) {
  // Convert the ID parameter to an integer
  const id = parseInt(req.params.id);

  // If the ID is not a valid number, return an error
  if (isNaN(id))
    return res.status(400).json({ error: `Id must be of type number` });

  // Find the index of the book that matches the ID
  const indexToDelete = bookDb.findIndex((e) => e.id === id);

  // If no book is found, return a 404 error
  if (indexToDelete === -1)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exist!` });

  // Remove the book from the books array
  bookDb.splice(indexToDelete, 1);

  // Return a success message
  return res.status(200).json({ message: "Book Deleted" });
};
