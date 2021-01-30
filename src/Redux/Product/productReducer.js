import { FETCH_PRODUCTS, ADD_PRODUCTS, EDIT_PRODUCTS, DELETE_PRODUCTS, LOAD_PRODUCTS} from "./productType"

const intialState = {
    products: []
}

const productReducer = (state = intialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: return {
            products: action.payload
        }
        case ADD_PRODUCTS: return {
            ...state,
            addprdt:state.products.push(action.payload)
        }
        case EDIT_PRODUCTS: return {
            ...state,
            editprdt:state.products.map((prdt)=>prdt.id === action.payload.id ? {...prdt,name:action.payload.name}:prdt)
        }
        case DELETE_PRODUCTS: return {
            ...state,
            deleteprdt:state.products.filter(item=>item.id !== action.payload)
        }
        case LOAD_PRODUCTS: return {
            ...state,
            products:action.payload
        }
        default: return state
    }
}
export default productReducer