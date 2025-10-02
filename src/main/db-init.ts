import { Database } from "../config/database.js";

export async function initDb() {
  const db = Database.getInstance();
  await db.connect();
  return db;
}
