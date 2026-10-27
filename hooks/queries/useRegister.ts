"use client";

import { registerUser as registerUserRequest } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  const {
    data: registeredUser,
    mutateAsync: registerUser,
    isPending: isRegistering,
    isError,
    error,
  } = useMutation({
    mutationFn: registerUserRequest,
  });

  return { registeredUser, registerUser, isRegistering, isError, error };
}
