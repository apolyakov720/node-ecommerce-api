import express from "express";
import { pool } from "./configs/db.js";
import { errorLogger } from "./middlewares/error-logger.js";

const app = express();
const appPort = process.env.API_PORT || 3000;

app.use(express.json());
app.use(errorLogger);

pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Error connecting to the database", error.stack);
  } else {
    console.log("Connected to the database:", result.rows);
  }
});

app.listen(appPort, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Server is running on port :${appPort}`);
  }
});
