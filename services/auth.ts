import { api, apiAuth } from "@/lib/axios";
import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  UserProfile,
} from "@/types/auth";

export async function login(username: string, password: string) {
  const response = await api.post<LoginResponse>("/auth/login", {
    username: username.trim(),
    password,
    expiresInMins: 1,
  });

  return response.data;
}

export async function userProfile() {
  const response = await apiAuth.get<UserProfile>("/auth/me");
  return response.data;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await api.post<RegisterResponse>("/users/add", {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    username: payload.username.trim(),
    email: payload.email.trim().toLowerCase(),
    password: payload.password,
  });

  return response.data;
}
