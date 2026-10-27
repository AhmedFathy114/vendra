"use client";

import { userProfile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export function useUserProfile() {
  const {
    data: profile,
    isPending: isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfile,
  });

  return { profile, isLoading, isError, error, isFetching, refetch };
}
