import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    itemCount: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.itemCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
