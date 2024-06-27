const express = require("express");
require("dotenv").config();
const mySqlPool = require("./config/db");
const userRoutes = require("./routes/user.routes.js");
const app = express();
const port = process.env.PORT;
app.use(express.json());
// routes
app.use("/user", userRoutes);
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
