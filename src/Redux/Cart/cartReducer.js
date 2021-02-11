import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartType";
import {toast} from 'react-toastify'

const intialState = {
  cartitem: []
}
 const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};

// const cartReducer = (state = intialState, action) => {
//   switch (action.type) {
//       case ADD_TO_CART: {
//           debugger
//           const newProduct = state.products.find((x) => x.id === action.payload.id);
//           const exist = state.cartitem.find((x) => action.payload.id === x.id);
//           if (newProduct && newProduct.quantity === 0) {
//               toast.warn('Product is out of stock!');
//               return;
//           }
//           if (exist) {
//               newProduct.quantity += 1
//               return {
//                   ...state
//               }
//           }
//           else {
//               newProduct.quantity = 1;
//               return {
//                   ...state,
//                   cartitem: [...state.cartitem, newProduct]
//               }
//           }
//           // if (newProduct) {
//           //     setProduct(
//           //         state.products.map((x) =>
//           //             x.id === newProduct.id ? { ...newProduct, quantity: newProduct.quantity - 1 } : x
//           //         )
//           //     );
//           // }
//       }
//   }
// }
export default cartReducer