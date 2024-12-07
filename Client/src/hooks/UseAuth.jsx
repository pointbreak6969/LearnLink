import authService from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import profileService from "@/services/profile";

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //get current user
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await authService.getCurrentUser();
      const userData = data?.data?.data;
      return { data: userData, authStatus: !!userData };
    },
    refetchOnWindowFocus: false,
    retry: 1,
    onError: (error) => {
      console.error("Error fetching user:", error);
    },
    initialData: { data: null, authStatus: false },
  });

  //login mutation
  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const userData = data?.data?.loggedInUser;
      // console.log(userData)
      queryClient.setQueryData(["user"], {
        data: userData,
        authStatus: true,
      });
      queryClient.invalidateQueries(["user"]);
      navigate("/classroom");
    },
  });
  //signup mutation
  const signup = useMutation({
    mutationFn: authService.createUser,
    onSuccess: (response) => {
      const userData = response?.data?.loggedInUser;
      queryClient.setQueryData(["user"], { data: userData, authStatus: true });
      navigate("/classroom");
    },
  });
  //logout mutation
  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], { data: null, authStatus: false });
      queryClient.invalidateQueries(["profile"]);
    },
  });
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await profileService.getProfileDetails();
      return data;
    },
    initialData: null,
    onError: (error) => {
      console.error("Error fetching profile:", error);
      throw error;
    },
  });
  const updateProfile = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(["profile"], response);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
  const completeProfile = useMutation({
    mutationFn: profileService.completeProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(["profile"], response);
      queryClient.invalidateQueries(["profile"]);
    },
    onError: (error) => {
      console.error("Error completing profile:", error);
    },
  });
  const values = {
    user,
    authStatus: user?.authStatus,
    login: login.mutate,
    signup: signup.mutate,
    logout: logout.mutate,
    profile, 
    updateProfile: updateProfile.mutate,
    completeProfile: completeProfile.mutate,    
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
