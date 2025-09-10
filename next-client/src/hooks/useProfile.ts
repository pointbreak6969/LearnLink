import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/store/profileReducer";
import { RootState, AppDispatch } from "@/store/store";
import { UserProfile } from "@/types";

interface UseProfileReturn {
  profileDetails: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  refreshProfile: () => void;
}

export const useProfile = (): UseProfileReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const profileDetails = useSelector((state: RootState) => state.profile.profileDetails);
  const status = useSelector((state: RootState) => state.profile.status);
  const error = useSelector((state: RootState) => state.profile.error);
  
  const refreshProfile = useCallback(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);
  
  useEffect(() => {
    if (status === "idle" || status === "failed") {
      dispatch(fetchProfileDetails());
    }
  }, [dispatch, status]);
  
  return { profileDetails, status, error, refreshProfile };
};