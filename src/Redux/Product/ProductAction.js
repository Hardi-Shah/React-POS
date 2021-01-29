import { FETCH_PRODUCTS} from "./productType"
import axios from 'axios'

export const fetchProductSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS,
        payload: products
    }
}

export const fetchProducts = () =>  {
     return function (dispatch) {
       axios.get('http://localhost:3002/products')
            .then(response => {
                const products=response.data
                dispatch(fetchProductSuccess(products))
            })
    }
}
