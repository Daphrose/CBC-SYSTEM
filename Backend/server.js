
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("CBC Report Portal API running...");
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/teacher", require("./routes/teacherRoutes"));
app.use("/api/parent", require("./routes/parentRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
