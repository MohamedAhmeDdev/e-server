const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { PORT } = require('./constant/index');
const database = require("./config/database");
const Auth = require('./Routes/Auth');
const ClientRouter = require('./Routes/Client');
const programController = require('./Routes/Program');
const enrollmentController = require('./Routes/Enroll');

 


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
app.use('/auth', Auth);
app.use('/client', ClientRouter);
app.use('/program', programController)
app.use('/enroll', enrollmentController)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
