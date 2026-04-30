const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET TASKS
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC",
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD TASK
router.post("/", async (req, res) => {
  const { user_id, name, status, due } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tasks (user_id, name, status, due) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id, name, status, due]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const result = await pool.query(
      "UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;