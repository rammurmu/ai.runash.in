declare module "@/lib/neon" {
  import { Pool } from "@neondatabase/serverless";
  const pool: Pool;
  export default pool;
}
