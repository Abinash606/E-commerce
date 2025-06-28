export const addItemToCart = (item) => (dispatch, getState) => {
  const { cart } = getState();
  const existingItemIndex = cart.items.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    dispatch({
      type: "UPDATE_CART_ITEM",
      payload: {
        index: existingItemIndex,
        item: {
          ...cart.items[existingItemIndex],
          quantity: (cart.items[existingItemIndex].quantity || 0) + 1,
        },
      },
    });
  } else {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  }
};
