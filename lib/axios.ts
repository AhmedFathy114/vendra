import axios from "axios";
import { getSession, signOut } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ECOMMERCE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ECOMMERCE,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAuth.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.error === "RefreshAccessTokenError") {
    await signOut({ callbackUrl: "/login" });
    throw new Error("Session expired");
  }

  const accessToken = session?.user?.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
