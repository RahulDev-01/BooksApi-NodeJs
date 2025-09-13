// Import the Express framework
// We need Express to create our router
const express = require("express");

// Import our book controller functions
// Controllers contain the business logic for handling requests
const controller = require("../controllers/book.controller");

// Create a new Express router instance
// A router helps us organize our routes (endpoints) in a modular way
const router = express.Router();

// Define a GET route for the root path "/"
// When someone makes a GET request to /books, this route will handle it
// The controller.getAllBooks function will be called to process the request
router.get("/", controller.getAllBooks);

// Define a GET route with a parameter ":id"
// When someone makes a GET request to /books/123, this route will handle it
// The :id is a route parameter that captures the ID from the URL
// The controller.getBooksById function will be called to process the request
router.get("/:id", controller.getBooksById);

// Define a POST route for the root path "/"
// When someone makes a POST request to /books, this route will handle it
// POST requests are typically used to create new resources
// The controller.addNewBook function will be called to process the request
router.post("/", controller.addNewBook);

// Define a DELETE route with a parameter ":id"
// When someone makes a DELETE request to /books/123, this route will handle it
// DELETE requests are typically used to remove resources
// The controller.deleteABook function will be called to process the request
router.delete("/:id", controller.deleteABook);

// Export the router so it can be imported and used in other files
// This allows the main server file to use these routes
module.exports = router;
