const express = require("express");
require("dotenv").config();
const mySqlPool = require("./config/db");
const app = express();
const port = process.env.PORT;
app.use(express.json());

// db connection
mySqlPool
  .query("select 1")
  .then(() => {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
