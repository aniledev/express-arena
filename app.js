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
  console.log(req.query);
  // quickly end the response without any data; don't send any data back to the client
  res.end();
});

app.get("/greetings", (req, res) => {
  // 1. use object destructuring to access the keys of the req.query object
  const { name, race } = req.query;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send("Please provide a name");
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send("Please provide a race");
  }
  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response
  res.send(greeting);
});

// create a route handler function on the path /sum
app.get("/sum", (req, res) => {
  // 1. use object destructuring to access the keys of the req.query object
  const { a, b } = req.query;

  //2. validate the values
  if (!a) {
    // is a was not provided
    return res.status(400).send("A is required");
  }
  if (!b) {
    // if b was not provided
    return res.status(400).send("B is required");
  }

  // a and b must be converted to numbers because they are currently strings
  const numberA = parseInt(a);
  const numberB = parseInt(b);

  //validate numberA and numberB in case a number is not the result

  if (Number.isNaN(numberA)) {
    return res.status(400).send("A must be a number");
  }

  if (Number.isNaN(numberB)) {
    return res.status(400).send("B must be a number");
  }

  console.log(req.query);

  // create a variable for the sum
  const c = numberA + numberB;
  // both a and b are valid so do processing
  const sum = `The sum of ${numberA} and ${numberB} is ${c}`;

  //send the response
  res.send(sum);
});

app.listen(8080, () => {
  console.log("express server is listening on port 8000");
});
