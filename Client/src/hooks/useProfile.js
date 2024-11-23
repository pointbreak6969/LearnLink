import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "@/store/profileReducer";
export const useProfile = () => {
    const dispatch = useDispatch();
    const profileDetails = useSelector((state) => state.profile.profileDetails);
    const status = useSelector((state) => state.profile.status);
    const error = useSelector((state) => state.profile.error);
    const isAuthenticated = useSelector((state) => state.auth.status);
    const refreshProfile = useCallback(() => {
        dispatch(fetchProfileDetails());
    }, [dispatch]);
    useEffect(() => {
        if (isAuthenticated && (status === "idle" || status === "failed")) {
            dispatch(fetchProfileDetails());
        }
    }, [dispatch, isAuthenticated, status]);
    return { profileDetails, status, error, refreshProfile };
    }