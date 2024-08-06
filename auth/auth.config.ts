import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);
                    if (!user) {
                        throw new CredentialsSignin("User with provided email does not exists!");
                    }

                    if (!user.password) {
                        throw new CredentialsSignin(
                            "User with provided email uses different way to login instead of password!"
                        );
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) {
                        return user;
                    } else {
                        throw new CredentialsSignin("Wrong password!");
                    }
                }
                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
