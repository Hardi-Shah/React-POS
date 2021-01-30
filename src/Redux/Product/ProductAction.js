import { FETCH_PRODUCTS} from "./productType"
import axios from 'axios'
import { apiurl } from "../../Services/ProductService"

export const fetchProductSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS,
        payload: products
    }
}

export const fetchProducts = () =>  {
     return function (dispatch) {
       axios.get(`${apiurl}`)
            .then(response => {
                const products=response.data
                dispatch(fetchProductSuccess(products))
            })
    }
}
