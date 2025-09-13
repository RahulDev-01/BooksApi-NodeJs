// Load environment variables from a .env file
// This allows us to store sensitive information like database passwords securely
require('dotenv/config')

// Import the Express framework
// Express is a web framework for Node.js that makes it easy to create web servers
const express = require("express");

// Import our custom book router
// This router contains all the routes (endpoints) related to books
const bookRouter = require("./routes/book.routes");

// Create an Express application instance
// This is our main web server application
const app = express();

// Define the port number where our server will listen
// Port 8000 is where clients will connect to access our API
const PORT = 8000;

// Middleware to parse JSON data from incoming requests
// When clients send JSON data in the request body, this middleware converts it to JavaScript objects
// This allows us to access request data using req.body
app.use(express.json());

// Example of a custom middleware (currently commented out)
// Middleware functions run between receiving a request and sending a response
// They can modify the request, response, or pass control to the next middleware
// app.use(function(req,res,next){
//     console.log("I am Middleware A");
//     next();
// })

// Mount the book router at the "/books" path
// This means all routes defined in bookRouter will be prefixed with "/books"
// For example: GET /books, POST /books, GET /books/:id, etc.
app.use("/books", bookRouter);

// Start the server and make it listen for incoming connections
// The server will run on the specified PORT and execute the callback function when ready
app.listen(PORT, () => {
  // Log a message to the console when the server starts successfully
  console.log(`HTTP Server is running on port ${PORT}`);
});
