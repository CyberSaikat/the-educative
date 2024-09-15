import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import conn from "@/database/config";
import { CustomUser, CustomSession } from "@/abstract/type";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "User Management",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials, req) {
        conn();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          return null;
        } else {
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(params) {
      try {
        const { user, account, profile, email, credentials } = params;
        const incomingUser = user;

        if (account?.provider != "credentials") {
          await User.findOne({ email: email }).then(
            async (user: typeof User | null) => {
              if (user) {
                return true;
              } else {
                const randomPassword = Math.random().toString(36).slice(-8);
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(randomPassword, salt);
                await User.create({
                  email: incomingUser?.email,
                  password: hash,
                  name: incomingUser?.name,
                  avatar: incomingUser?.image,
                })
                  .then(() => {
                    return true;
                  })
                  .catch((err: any) => {
                    return false;
                  });
              }
            }
          );
        }
        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        user.role = user.role ?? "user";
        token.user = user;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
