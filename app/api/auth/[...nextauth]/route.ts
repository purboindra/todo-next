import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: { label: "email", type: "text" },
    //     password: { label: "password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials?.email) {
    //       throw new Error("Invalid Credentials");
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {

    //       },
    //     });
    //   },
    // }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
