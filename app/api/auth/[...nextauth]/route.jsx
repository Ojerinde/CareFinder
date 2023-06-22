import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDatabase } from "../../../../library/db";
import { verifyPassword } from "../../../../library/auth";

const options = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db(`auth`).collection("users");

        // Checking if the email exists
        const user = await usersCollection.findOne({
          email: credentials.email.toLowerCase(),
        });

        if (!user) {
          client.close();
          throw new Error("User not found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect password");
        }

        client.close();
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
