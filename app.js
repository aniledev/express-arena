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

app.get("/cipher", (req, res) => {
  // use object desctructuing to access the query parameters
  const { text, shift } = req.query;

  // validate the parameters: both are required
  if (!text) {
    return res.status(400).send("text is required");
  }
  if (!shift) {
    return res.status(400).send("shift is required");
  }

  // shift must be a number, use parse to convert
  const numberShift = parseInt(shift);

  // validate that numberShift is in fact a number after the parse
  if (Number.isNaN(numberShift)) {
    return res.status(404).send("shift must be a number");
  }

  // assigns the UTF code of A to the variable base
  const base = "A".charCodeAt(0);

  // map over each character in the string

  const cipher = text
    .toUpperCase()
    .split("") // create an array of characters
    .map((char) => {
      // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code, this returns the UTF code of that character

      // if it is not one of the 26 letters ignore it
      // UTF code of A === 65, UTF code of z === 65+26
      if (code < base || code > base + 26) {
        return char;
      }

      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numberShift;

      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(""); // construct a String from the array

  // Return the response
  res.status(200).send(cipher);
});

app.get("/lotto", (req, res) => {
  // accss the req.query object
  const { numbers } = req.query;

  // the numbers array is required
  if (!numbers) {
    return res
      .status(400)
      .send(
        "numbers array is required, a parameter has to be passed in at a minimum"
      );
  }

  // numbers must be an array and not another data type
  if (!Array.isArray(numbers)) {
    return res.status(400).send("numbers must be an array");
  }

  //map over the array and parse each element into a number
  // create a new array where NaN are filtered out and numbers not between 1 and 20 are filtered out
  // if an element meets these conditions they would be taken out of the array, reducing the arrays length
  const guesses = numbers
    .map((n) => parseInt(n))
    .filter((n) => !Number.isNaN(n) && n >= 1 && n <= 20);

  // guesses array must still be 6 values in length
  if (guesses.length != 6) {
    return res
      .status(400)
      .res.send("numbers must contain integers between 1 and 20,");
  }

  // create an array with a length of 20, fill all element indexes with a value of 1
  //map over each element and add 1 to the index, this will create an array of values 1 to 20
  const stockNumbers = Array(20)
    .fill(1)
    .map((_, i) => i + 2);

  // randomly choose 6 numbers
  const winningNumbers = [];
  for (let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1); // what exactly does this line do?
  }

  // create a filtered array that only includes elments that are not in the guesses array
  let diff = winningNumbers.filter((n) => !guesses.includes(n));

  //construct responses for each of the possible diff values
  let responseText;

  switch (diff.length) {
    case 0:
      responseText = "Wow! You could have won the mega millions";
      break;
    case 1:
      responseText = "Congrats! You win $100";
      break;
    case 2:
      responseText = "You win a free ticket!";
      break;
    default:
      responseText = "Sorry, you didn't win this time.";
  }

  res.json({
    guesses,
    winningNumbers,
    diff,
    responseText,
  });

  res.send(responseText);
});

app.listen(8080, () => {
  console.log("express server is listening on port 8080");
});
