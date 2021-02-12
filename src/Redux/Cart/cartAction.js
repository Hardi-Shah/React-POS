import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartType";

// export const addToCart = (product) => (dispatch, getState) => {
//   const cartItems = getState().cart.cartItems.slice();
//   let alreadyExists = false;
//   cartItems.forEach((x) => {
//     if (x._id === product._id) {
//       alreadyExists = true;
//       x.count++;
//     }
//   });
//   if (!alreadyExists) {
//     cartItems.push({ ...product, count: 1 });
//   }
//   dispatch({
//     type: ADD_TO_CART,
//     payload: { cartItems },
//   });
//   localStorage.setItem("cartItems", JSON.stringify(cartItems));
// };
// export const addToCart = (cartitem, cartItemToAdd,products) => {
//   const newProduct = products.find((x) => x.id === cartItemToAdd.id);
//   const existingCartItem = cartitem.find(item => item.id === cartItemToAdd.id);
//   if (existingCartItem) {
//     return cartitem.map(item =>
//       item.id === cartItemToAdd.id
//         ? { ...cartItemToAdd, quantity: item.quantity + 1 }
//         : item
//     );
//   }
//   return [...cartitem, { ...cartItemToAdd, quantity: 1 }];
// };
export const addToCart = (product) => {
    return  {
        type: ADD_TO_CART,
        payload: product
    }
}

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== product._id);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};