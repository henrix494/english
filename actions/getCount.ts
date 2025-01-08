"use server";
import { sql } from "@vercel/postgres";

export default async function getCount({ userId }: { userId: string }) {
  console.log(userId);
  const { rows } =
    await sql`SELECT * FROM english_users_grades WHERE user_id = ${userId} `;
  return rows;
}
