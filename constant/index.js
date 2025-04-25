const dotenv = require("dotenv");
dotenv.config();

//  server port
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// database connection
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_DIALECT = process.env.DATABASE_DIALECT;





module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DIALECT,
};
