const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Stepan:T0rZLxP4baHKt9x9@contacts.fwq3a3c.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error));
