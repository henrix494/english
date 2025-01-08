"use server"
import {sql} from "@vercel/postgres"
interface requestProps{
    user_id:number
    level:string
    grade:number
}
export const addAnswer = async(req:requestProps) => {
   const {grade,level,user_id} = await req;
   console.log(grade)
   console.log(level)
   console.log(user_id)

   const insert  =await sql`INSERT INTO english_users_grades(user_id,level,grade) VALUES(${user_id},${level},${grade})`
   return 1
}