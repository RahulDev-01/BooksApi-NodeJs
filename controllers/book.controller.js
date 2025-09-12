const { booksTable } = require("../models/book.model");
const db = require("../db");
const { eq } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  // Return all books in JSON format
  const books = await db.select().from(booksTable);
  res.json(books);
};

exports.getBooksById = async function (req, res) {
  // Convert the ID parameter to an integer
  const id = req.params.id;

  // Find the book by matching the ID
  const book = await db.select().from(booksTable).where(eq(booksTable.id, id));

  // If the book is not found, return a 404 error
  if (!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exist!` });

  // If found, return the book as JSON
  return res.json(book);
};

exports.addNewBook = async function (req, res) {
  // Destructure the title and author from the request body
  const { title, authorId ,description} = req.body;

  // If title is not provided or is empty, return an error
  if (!title || title === "") {
    return res.status(400).json({ error: `title is required` });
  }
 const result= await db.insert(booksTable).values({ title, authorId ,description}).returning({id:booksTable.id,});

  // Create a new book object and add it to the books array
  const book = { id, title, authorId ,description };
  bookDb.push(book);

  // Respond with a success message and the ID of the new book
  return res.status(201).json({ message: `Book is created successfully`, id :result.id});
};

exports.deleteABook = async function (req, res) {
  // Convert the ID parameter to an integer
  const id = req.params.id;

  const result = await db.delete(booksTable).where(eq(booksTable.id, id));


  // Return a success message
  return res.status(200).json({ message: "Book Deleted" });
};
