import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password, username, repeat_password } = await request.json();
    console.log(repeat_password);
    if (
      !password ||
      !username ||
      password !== repeat_password ||
      username.length < 8
    ) {
      return NextResponse.json({
        message: "missing fields",
        status: 401,
      });
    }

    const hashedPassword = await hash(password, 10);
    const searchUser =
      await sql`SELECT * FROM english_users WHERE user_name=${username}`;
    if (searchUser.rows.length > 0) {
      console.log(searchUser)
      return NextResponse.json({
        message: "user already exists",
        status: 400,
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response =
        await sql`INSERT INTO english_users (email, password,user_name) VALUES (${
          email ? email : "email not entered"
        }, ${hashedPassword},${username})`;
    }
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success", status: 201 });
}
