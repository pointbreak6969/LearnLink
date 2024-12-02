import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import profileService from "@/services/profile";

export function useProfile() {
  const queryClient = useQueryClient();
  //get current user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await profileService.getProfileDetails();
      return data;
    },
    onError: (error) => {
      console.error("Error fetching profile:", error);
      throw error
    },
  });
  const updateProfile = useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: (response) => {

      queryClient.setQueryData(["profile"], response);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });
  return {
    profile, 
    updateProfile: updateProfile.mutate,
    isUpdatingProfile: updateProfile.isLoading,
    isProfileLoading: isLoading,
  }
}
