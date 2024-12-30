"use server"
import { sql } from "@vercel/postgres"
export const getCount = async (id:number) =>{
    const {rows} = await sql`SELECT * FROM english_users_grades where user_id =${id}`;
   return rows;
}