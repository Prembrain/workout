import NextAuth from "next-auth";
import prisma from '../../../libs/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from 'bcrypt';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                username: { label: "Username", type: "text"},
            },
            async authorize(credentials) { //check email and password match database
              
                // check to see if email and password is there. check user already input password and login
                if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                // check to see if user exists (check on database)
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                        id: credentials.id
                    }
                });

                // if no user was found. if user not have hashedPassword
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
            },
        }),  
    ],
    secret: process.env.SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            // console.log("JWT callback:", token);
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            // console.log("Session callback:", session);
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
