import { Pool } from '@neondatabase/serverless';

// Use environment variables for security
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;