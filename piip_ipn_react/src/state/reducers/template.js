import { createSlice } from "@reduxjs/toolkit"


const slice = createSlice({
    name: "template",
    initialState: {
        template: null,
    },
    reducers: {
        setUserTemplate: (state, action) => {
            console.log("payload")
            console.log(action.payload)
            state.template = action.payload;
        }
    },
});

export const {
    setUserTemplate,
} = slice.actions;
export default slice.reducer;
