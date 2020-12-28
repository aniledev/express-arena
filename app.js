// require the express module in order to access the dependency
const express = require("express");

// app.get(PATH, HANDLER);
// the HANDLER is the function to be executed
/* To create a GET route we use the .get() method of the Express application object. */

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});
