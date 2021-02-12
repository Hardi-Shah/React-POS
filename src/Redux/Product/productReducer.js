import { FETCH_PRODUCTS, ADD_PRODUCTS, EDIT_PRODUCTS, DELETE_PRODUCTS, LOAD_PRODUCTS } from "./productType"
import { ADD_TO_CART } from "../Cart/cartType"
import { toast } from 'react-toastify'
import { addToCart } from "../Cart/cartAction"
const intialState = {
    products: [],
    cartitem: []
}
const productReducer = (state = intialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: return {
            products: action.payload
        }   
        // case ADD_TO_CART: return {
        //     ...state,
        //     //cartitem: state.cartitem.push(action.payload)
        //     cartitem: addToCart(state.cartitem, action.payload)
        // }
        case ADD_TO_CART: {
            debugger
            const exist = state.cartitem.find((x) => action.payload.id === x.id);
            const newProduct = state.products.find((x) => x.id === action.payload.id);
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
            }
            // if (newProduct) {
            //     setProduct(
            //         state.products.map((x) =>
            //             x.id === newProduct.id ? { ...newProduct, quantity: newProduct.quantity - 1 } : x
            //         )
            //     );
            // }
        }
        case ADD_PRODUCTS: return {
            ...state,
            addprdt: state.products.push(action.payload)
        }
        case EDIT_PRODUCTS: return {
            ...state,
            editprdt: state.products.map((prdt) => prdt.id === action.payload.id ? { ...prdt, name: action.payload.name } : prdt)
        }
        case DELETE_PRODUCTS: return {
            ...state,
            deleteprdt: state.products.filter(item => item.id !== action.payload)
        }
        case LOAD_PRODUCTS: return {
            ...state,
            products: action.payload
        }
        default: return state
    }
}
export default productReducer