const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

const { Pool } = require("pg");
require("dotenv").config();

const cors = require("cors");
app.use(cors());

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

app.get("/API/recipes", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM recipes");
    res.send(data.rows);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
