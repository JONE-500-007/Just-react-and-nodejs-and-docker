const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = new Pool({
  user: "justthisuser",
  host: "db",
  database: "my_database",
  password: "mysqlpass1122",
  port: 5432,
});

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});