"use client";
import { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth";
import { signInSchema } from "../../../schemas/signInSchema";
import * as z from "zod";
import { signupSchema } from "../../../schemas/signupSchema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  logout: () => Promise<void>;
  signIn: (data: z.infer<typeof signInSchema>) => void;
  signUp: (data: z.infer<typeof signupSchema>) => void;
  isSignInPending: boolean;
  isSignUpPending: boolean;
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  isPending: true,
  logout: async () => {},
  signIn: (data: z.infer<typeof signInSchema>) => {},
  signUp: (data: z.infer<typeof signupSchema>) => {},
  isSignInPending: false,
  isSignUpPending: false,
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

  const logout = async () => {
    try {
      await authService.logoutUser();
      // Clear the currentUser query cache
      queryClient.setQueryData(["currentUser"], null);
      // Optionally, you can also invalidate all queries
      queryClient.invalidateQueries();
      router.push("/signin")
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
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
    },
    onError: (error) => {
      console.error("Sign in error:", error);
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
      router.push("/");
    },
    onError: (error) => {
      console.error("Sign up error:", error);
      throw error;
    },
  })

  return (
    <UserContext.Provider value={{ currentUser, isPending, logout , signIn, signUp, isSignInPending, isSignUpPending }}>
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
