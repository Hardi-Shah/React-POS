import { FETCH_PRODUCTS} from "./productType"

const intialState = {
    products: []
}

const productReducer = (state = intialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS: return {
            products: action.payload
        }
        default: return state
    }
}
export default productReducer