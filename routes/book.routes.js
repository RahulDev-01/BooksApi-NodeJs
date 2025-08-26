const express = require("express");
const controller = require("../controllers/book.controller");
const router = express.Router();

// Route to get the list of all books
router.get("/", controller.getAllBooks);
// Route to get a single book by its ID
router.get("/:id", controller.getBooksById);

// Route to add a new book
router.post("/", controller.addNewBook);

// Route to delete a book by its ID
router.delete("/:id", controller.deleteABook);

module.exports = router;
