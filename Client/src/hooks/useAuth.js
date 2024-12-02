import authService from "@/services/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export function useAuth() {
  const queryClient = useQueryClient();
  //get current user
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await authService.getCurrentUser();
      const userData = data?.data?.data;
      //   console.log(userData)
      return { data: userData, authStatus: true };
    },
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
    },
  });
  //signup mutation
  const signup = useMutation({
    mutationFn: authService.createUser,
    onSuccess: (response) => {
      const userData = response?.data?.loggedInUser;
      queryClient.setQueryData(["user"], { data:userData, authStatus: true });
    },
    onError: (error) => {
      console.error("Error signing up:", error
        );
    }
  });
  //logout mutation
  const logout = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], { data: null, authStatus: false });
    },
  });
  return {
    user,
    authStatus: user?.authStatus,
    login: login.mutate,
    signup: signup.mutate,
    logout: logout.mutate,
    isLoginLoading: login.isLoading,
    isSignupLoading: signup.isLoading,
  };
}
