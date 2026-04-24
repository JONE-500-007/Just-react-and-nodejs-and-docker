const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'justthisuser',
  host: 'postgres-db',
  database: 'my_database',
  password: 'mysqlpass1122',
  port: 5432,
});

// REGISTER
app.post('/api/register', async (req, res) => {
  console.log('HIT REGISTER API');
  const { user_name, email, password } = req.body;
  

  if (!user_name || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    const exist = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (exist.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    await pool.query(
      'INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3)',
      [user_name, email, password]
    );

    res.json({ message: 'Register success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login success', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on 3000'));