// require the express module in order to access the dependency
const express = require("express");
// requre the morgan middleware in order to access and use it
const morgan = require("morgan");

/* The express module exports a top-level function. 
That function creates a new application object that encapsulates the functionality of your Express server. 
Invoke the function to create the application. */
const app = express();

// middleware has to be mounted or add before it can be used by epxress. Express comes with the build in .use() method to do this
app.use(morgan("dev"));

// a simple GET request using Express
app.get("/", (req, res) => {
  res.send("hello express!");
});

// adding another route to Express app
app.get("/burgers", (req, res) => {
  res.send("we have juice cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("your pizza is on the way");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("we dont serve that here. never call again!");
});

app.listen(8000, () => {
  console.log("express server is listening on port 8000");
});
