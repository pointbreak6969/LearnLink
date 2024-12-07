import authService from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import profileService from "@/services/profile";
import { toast } from "sonner";

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
    mutationFn: async (data)=>{
      const response = await authService.createUser(data)
      return response
    },
    onSuccess: (response) => {
      const userData = response?.data?.loggedInUser;
      queryClient.setQueryData(["user"], { data: userData, authStatus: true });
      navigate("/classroom");
    },
    onError: (error) => {
      console.error("Error signing up:", error);
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
  const { data: profile} = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await profileService.getProfileDetails();
      return data;
    },
    enabled: !!user?.authStatus,
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
      toast.success("Profile updated successfully");
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
      toast.success("Profile completed successfully");
    },
    onError: (error) => {
      toast.error("Failed to complete profile");
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
