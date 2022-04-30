import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "activity",
    initialState: {
        activity: null,
    },
    reducers: {
        setUserActivityInfo: (state, action) => {
            console.log("activiyPayl")
            console.log(action.payload)
            state.activity = action.payload;
        }
    },
});

export const {
    setUserActivityInfo,
} = slice.actions;
export default slice.reducer;
