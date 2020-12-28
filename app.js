// require the express module in order to access the dependency
const express = require("express");
/* The express module exports a top-level function. 
That function creates a new application object that encapsulates the functionality of your Express server. 
Invoke the function to create the application. */
const app = express();

// a simple GET request using Express
app.get("/", (req, res) => {
  res.send("hello express!");
});

app.listen(8000, () => {
  console.log("express server is listening on port 8000");
});
