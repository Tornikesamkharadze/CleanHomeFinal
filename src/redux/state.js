import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    addOrder: (state, action) => {
      state.user.orders.push(action.payload.orderData);
    },
  },
});

export const { setLogin, setLogout, setListings, addOrder } = userSlice.actions;
export default userSlice.reducer;
