const express = require("express");
const router = express.Router();
const pool = require("../db");

// REGISTER
router.post("/register", async (req, res) => {
  const { user_name, email, password } = req.body;

  if (!user_name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const exist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (exist.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await pool.query(
      "INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)",
      [user_name, email, password]
    );

    res.json({ message: "Register success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;