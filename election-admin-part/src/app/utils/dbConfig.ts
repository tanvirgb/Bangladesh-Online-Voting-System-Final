import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

export default pool;
