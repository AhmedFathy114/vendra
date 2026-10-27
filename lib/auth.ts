import { login } from "@/services/auth";
import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {
          type: "text",
          label: "Username",
          placeholder: "emilys",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize({ username, password }) {
        if (typeof username !== "string" || typeof password !== "string") {
          return null;
        }
        try {
          const user = await login(username, password);
          if (!user.id) {
            return null;
          }
          return {
            id: String(user.id),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.image,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      if (auth?.user && auth.error !== "RefreshAccessTokenError") {
        return true;
      }

      const loginUrl = new URL("/login", request.nextUrl.origin);
      loginUrl.searchParams.set(
        "callbackUrl",
        `${request.nextUrl.pathname}${request.nextUrl.search}`,
      );

      return NextResponse.redirect(loginUrl);
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 60_000 - 10_000;
      }

      if (Date.now() < ((token.accessTokenExpires as number) ?? 0)) {
        return token;
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ECOMMERCE}/auth/refresh`,
          {
            refreshToken: token.refreshToken,
            expiresInMins: 1,
          },
        );

        token.accessToken = data.accessToken;
        token.refreshToken = data.refreshToken ?? token.refreshToken;
        token.accessTokenExpires = Date.now() + 60_000 - 10_000;
        token.error = undefined;
      } catch {
        token.error = "RefreshAccessTokenError";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.accessToken = token.accessToken as string;
        session.error = token.error as "RefreshAccessTokenError" | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
