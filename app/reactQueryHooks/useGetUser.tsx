"use client";
import { findUser } from "@/lib/actions";
import { useQuery } from "@tanstack/react-query";

function useGetUser(username: string) {
  return useQuery({ queryFn: () => findUser(username), queryKey: ["user"] });
}

export default useGetUser;
