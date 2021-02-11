import { combineReducers } from 'redux'
import productReducer from './Product/productReducer'
import categoryReducer from './Category/categoryReducer'
import cartReducer from './Cart/cartReducer'

const rootReducer = combineReducers({
    product:productReducer,
    category:categoryReducer,
    cart:cartReducer
})
export default rootReducer