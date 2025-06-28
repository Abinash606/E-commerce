import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    selectedAddress: null,
    selectedShippingMethod: null,
  },
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setSelectedShippingMethod: (state, action) => {
      state.selectedShippingMethod = action.payload;
    },
  },
});

export const { setSelectedAddress, setSelectedShippingMethod } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
