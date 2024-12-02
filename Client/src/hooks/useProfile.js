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
    }

  })
  return {
    profile, 
    updateProfile: updateProfile.mutate,
    isUpdatingProfile: updateProfile.isLoading,
    isProfileLoading: isLoading,
    completeProfile: completeProfile.mutate,
    isCompletingProfile: completeProfile.isLoading,
  }
}
