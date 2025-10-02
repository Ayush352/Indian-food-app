const express = require("express");
const cors = require("cors");
const dishRoutes = require("./routes/dishRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/dishes", dishRoutes);

module.exports = app;
