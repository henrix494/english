import Login_sign_up from "@/components/Login_sign_up";
import Level_List from "@/components/Level_List";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <main className="relative">
        <Login_sign_up />
        <h2 className="text-center mt-20 text-4xl font-bold">Choose a level</h2>
        <Level_List />
        <div className="flex justify-center mt-10"></div>
      </main>
    </SessionProvider>
  );
}
