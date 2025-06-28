const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "UPDATE_CART_ITEM":
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.payload.index ? action.payload.item : item
        ),
      };
    // Other cases...
    default:
      return state;
  }
};
