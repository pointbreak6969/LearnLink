import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import profileService from "@/services/profile"
export const fetchProfileDetails = createAsyncThunk('profile/fetchProfileDetails', 
    async(_, {rejectWithValue}) =>{
        try {
            const profile = await profileService.getProfileDetails()
            return profile;
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileDetails: {},
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchProfileDetails.pending, (state)=>{
            state.status = "loading";
        }).addCase(fetchProfileDetails.fulfilled, (state,action)=>{
            state.status ="succeeded";
            state.profileDetails = action.payload;
        }).addCase(fetchProfileDetails.rejected, (state,action)=>{
            state.status = "failed",
            state.error = action.payload
        })
    }
})
export default profileSlice.reducer;
