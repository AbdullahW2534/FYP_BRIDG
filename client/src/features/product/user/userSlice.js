import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    role: "",
    image: "",
    email: ""

};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            // console.log("Payload",action.payload);
            state.user = action.payload.name;
            state.role = action.payload.role;
            state.image = action.payload.image;
            state.email = action.payload.email;
        },
        removeUser: (state) => {
            state.user = "";
            state.role = "";
            state.image = "";
            state.email = "";
        }
    }
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
