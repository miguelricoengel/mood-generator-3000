
const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://mikey6:gogAQ366m0bxCYs8@mikey6.l8g62xy.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
