const express = require("express");
const bookRouter = require("./routes/book.routes");

const app = express();
const PORT = 8000;

// Middlewares (Plugins) to handle JSON bodies
app.use(express.json());

// Custom MiddleWares
// app.use(function(req,res,next){
//     console.log("I am Middleware A");
//     next();

// })

app.use("/books", bookRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`HTTP Server is running on port ${PORT}`);
});
