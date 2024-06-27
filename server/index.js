const express = require("express");
require("dotenv").config();
const mySqlPool = require("./config/db");
const userRoutes = require("./routes/user.routes.js");
const path = require("path");
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
