"use client";
import { useQuery } from "@tanstack/react-query";
import authService from "@/services/auth";

export default function Home() {
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  console.log(currentUser);
  return (
    <div>
      <h1>Welcome to Our Platform</h1>
      <p>Your journey to learning starts here.</p>
      {currentUser ? (
        <p>Welcome back,</p>
      ) : (
        <p>Please sign up or log in to continue.</p>
      )}

    </div>
  );
}
