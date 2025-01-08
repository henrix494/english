import Level_List from "@/components/Level_List";
import { sql } from "@vercel/postgres";
import Login_sign_up from "@/components/Login_sign_up";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";

export default async function Home() {
  const { rows } = await sql`SELECT * FROM users`;
  console.log(rows);
  return (
    <SessionProvider>
      <main className="relative">
        <Login_sign_up session={session?.user as props} />
        <h2 className="text-center mt-20 text-4xl font-bold">Choose a level</h2>
        <Level_List />
        <div className="flex justify-center mt-10"></div>
      </main>
    </SessionProvider>
  );
}
