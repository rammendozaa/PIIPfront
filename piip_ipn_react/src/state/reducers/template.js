import { createSlice } from "@reduxjs/toolkit"
const baseURL = "http://127.0.0.1:5000"


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
