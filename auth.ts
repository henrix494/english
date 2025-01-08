import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
async function getUserFromDb(credentials: {
  username: string;
  password: string;
}) {
  try {
    const user =
      await sql`SELECT * FROM english_users WHERE user_name=${credentials.username} `;
    const passwordCorrect = await compare(
      credentials.password,
      user.rows[0].password
    );

    if (!user) {
      throw new Error("No user found");
    }
    if (passwordCorrect) {
      return { ok: true, json: async () => user.rows[0] };
    } else {
      return { ok: false };
    }
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        const response = await getUserFromDb(
          credentials as { username: string; password: string }
        );
        if (!response.ok) return null;
        if (response.ok) {
          return response.json ? (await response.json()) ?? null : null;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    session: async (session, token, user) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
