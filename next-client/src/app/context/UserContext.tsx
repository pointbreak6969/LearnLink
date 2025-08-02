"use client";
import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth";
import { signInSchema } from "../../../schemas/signInSchema";
import * as z from "zod";
import { signupSchema } from "../../../schemas/signupSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface currentUserType {
  fullName?: string;
  email?: string;
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
}

interface UserContextType {
  currentUser: currentUserType | null | undefined;
  isPending: boolean;
  logout: () => void;
  signIn: (data: z.infer<typeof signInSchema>) => void;
  signUp: (data: z.infer<typeof signupSchema>) => void;
  isSignInPending: boolean;
  isSignUpPending: boolean;
  isLogoutPending: boolean;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  isPending: true,
  logout: () => {},
  signIn: (data: z.infer<typeof signInSchema>) => {},
  signUp: (data: z.infer<typeof signupSchema>) => {},
  isSignInPending: false,
  isSignUpPending: false,
  isLogoutPending: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: currentUser, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authService.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  const {mutate: logout, isPending: isLogoutPending} = useMutation({
    mutationFn: () => authService.logoutUser(),
    onSuccess: () => {
      // Clear the currentUser query cache
      queryClient.setQueryData(["currentUser"], null);
      // Optionally, you can also invalidate all queries
      queryClient.invalidateQueries();
      router.push("/signin");
      toast.success("Logout successful");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    },
  });
  // const signIn = async (data: z.infer<typeof signInSchema>) => {
  //   try {
  //     await authService.loginUser(data);
  //     // Refetch current user after login
  //     queryClient.invalidateQueries({queryKey: ["currentUser"]});
  //   } catch (error) {
  //     console.error("Sign in error:", error);
  //     throw error;
  //   }
  // };
  const {mutate: signIn, isPending: isSignInPending} = useMutation({
    mutationFn: (data: z.infer<typeof signInSchema>) => authService.loginUser(data),
    onSuccess: () => {
      // Refetch current user after login
      queryClient.invalidateQueries({queryKey: ["currentUser"]});
      router.push("/");
      toast.success("Login successful");
    },
    onError: (error) => {
      console.error("Sign in error:", error);
      toast.error("Invalid credentials");
      throw error;
    },
  })
  // const signUp = async (data: z.infer<typeof signupSchema>) => {
  //   try {
  //     await authService.signup(data);
  //     // Refetch current user after signup
  //     queryClient.invalidateQueries({queryKey: ["currentUser"]});
  //   } catch (error) {
  //     console.error("Sign up error:", error);
  //     throw error;
  //   }
  // };
  const {mutate: signUp, isPending: isSignUpPending} = useMutation({
    mutationFn: (data: z.infer<typeof signupSchema>) => authService.signup(data),
    onSuccess: () => {
      // Refetch current user after signup
      queryClient.invalidateQueries({queryKey: ["currentUser"]});
      toast.success("Sign up successful");
      router.push("/");
    },
    onError: (error) => {
      console.error("Sign up error:", error);
      toast.error("Sign up failed");
      throw error;
    },
  })

  return (
    <UserContext.Provider value={{ currentUser, isPending, logout, signIn, signUp, isSignInPending, isSignUpPending, isLogoutPending }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
