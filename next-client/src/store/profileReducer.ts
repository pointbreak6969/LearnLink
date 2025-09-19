import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import profileService from "@/services/profile";
import { UserProfile } from "@/types";

interface ProfileState {
  profileDetails: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchProfileDetails = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("profile/fetchProfileDetails", async (_, { rejectWithValue }) => {
  try {
    const profile = await profileService.getProfile();
    return profile;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to fetch profile");
  }
});

const initialState: ProfileState = {
  profileDetails: null,
  status: "idle",
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfile: (state) => {
      state.profileDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchProfileDetails.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.status = "succeeded";
          state.profileDetails = action.payload;
        }
      )
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch profile";
      });
  },
});

export const { clearProfileError, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
