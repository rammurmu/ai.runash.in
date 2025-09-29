import { db } from "./db";
import type { User } from "./user";

export async function setUserPlan(email: string, plan: string) {
  const user = await db.users.findByEmail(email);
  if (user) await db.users.update(user.id, { plan });
}

export async function getUserPlan(email: string): Promise<string | undefined> {
  const user = await db.users.findByEmail(email);
  return user?.plan;
}
