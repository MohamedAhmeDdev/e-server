const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PORT } = require('./constant/index');
const database = require("./config/database");


 


dotenv.config();

const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 


// Database connection
try {
  database.authenticate();
  console.log("you are connected to the database...");
} catch (error) {
  console.error("Connection error:", error);
}

// Routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
