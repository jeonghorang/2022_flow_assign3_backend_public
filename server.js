const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://192.249.18.179/"
};

app.use(cors(corsOptions));
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to horang application." });
});

// simple route
app.post("/", (req, res) => {
  res.json({ message: "post ...." });
});

require("./routes/userRoutes")(app);
require("./routes/bagRoutes")(app);
require("./routes/bagLetterRoutes")(app);
require("./routes/msgRoutes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});