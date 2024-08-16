import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth/auth.config";
import { getUserById } from "@/data/user";
import { getAccountByUserIdDB } from "@/data/account";

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    events: {
        // async linkAccount({ user }) {
        //     await db.user.update({
        //         where: { id: user.id },
        //         data: { emailVerified: new Date() },
        //     });
        // },
    },
    callbacks: {
        // async signIn({ user, account }) {
        //     // Allow OAuth without email verification
        //     if (account?.provider !== "credentials") {
        //         return true;
        //     }

        //     // Prevent Sign in without email verification
        //     const existingUser = await getUserById(user.id!);
        //     if (!existingUser) {
        //         return false;
        //     }

        //     return true;
        // },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserIdDB(existingUser.id);

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.isOAuth = !!existingAccount;

            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
