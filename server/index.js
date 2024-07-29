const express = require("express");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

async function main() {
  try {
    // Connect to the PostgreSQL database
    await prisma.$connect();
    console.log("Connected to the database");

    // Middleware to parse JSON bodies
    app.use(express.json());

    //  API endpoint

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with a failure code
  }
}

main();
