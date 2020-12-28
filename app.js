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

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    App: ${req.app}
    Body: ${req.body}
    IP: ${req.ip}
    Params: ${req.params}
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}`;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  // console log the query property of the request object which contains the key/value pairs of the query string
  console.log("req.query");
  res.end();
});

app.listen(8000, () => {
  console.log("express server is listening on port 8000");
});
