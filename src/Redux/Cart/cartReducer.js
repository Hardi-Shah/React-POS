import { FETCH_PRODUCTS, ADD_PRODUCTS, EDIT_PRODUCTS, DELETE_PRODUCTS, LOAD_PRODUCTS } from "./productType"
const intialState = {
    cart: []
}
const cartReducer = (state = intialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            debugger
            const newProduct = state.products.find((x) => x.id === action.payload.id);
            const exist = state.cartitem.find((x) => action.payload.id === x.id);
            if (newProduct && newProduct.quantity === 0) {
                toast.warn('Product is out of stock!');
                return;
            }
            if (exist) {
                newProduct.quantity += 1
                return {
                    ...state
                }
            }
            else {
                newProduct.quantity = 1;
                return {
                    ...state,
                    cartitem: [...state.cartitem, newProduct]
                }
                //setCart([...cart, { ...state.addedItems, quantity: 1 }]);
            }
            // if (newProduct) {
            //     setProduct(
            //         state.products.map((x) =>
            //             x.id === newProduct.id ? { ...newProduct, quantity: newProduct.quantity - 1 } : x
            //         )
            //     );
            // }
        }
    }
}
export default cartReducer