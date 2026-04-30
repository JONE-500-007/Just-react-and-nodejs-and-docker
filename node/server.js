const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// TEST
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});