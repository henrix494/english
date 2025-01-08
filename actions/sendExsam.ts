"use server";
import { sql } from "@vercel/postgres";

export default async function sendExsam({
  userId,
  level,
  grade,
}: {
  userId: string | undefined;
  level: string;
  grade: number;
}) {
  const { rows } = await sql`INSERT INTO english_users_grades (user_id, 	
level, grade) VALUES (${userId}, ${level}, ${grade}) RETURNING *`;
  console.log(rows);
  return rows;
}
