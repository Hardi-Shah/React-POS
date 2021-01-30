import { FETCH_PRODUCTS, ADD_PRODUCTS, EDIT_PRODUCTS, DELETE_PRODUCTS} from "./productType"
import axios from 'axios'
import { apiurl } from "../../Services/ProductService"

export const fetchProductSuccess = (products) => {
    return {
        type: FETCH_PRODUCTS,
        payload: products
    }
}
export const addProductSuccess = (data) => {
    return {
        type: ADD_PRODUCTS,
        payload: data
    }
}
export const editProductSuccess = (data) => {
    return {
        type: EDIT_PRODUCTS,
        payload: data
    }
}
export const deleteProductSuccess = (id) => {
    return  {
        type: DELETE_PRODUCTS,
        payload: id
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
export const addProducts = (values) => {
    return function (dispatch) {
        axios.post(`${apiurl}`,values)
            .then(response => {
                const prdts = response.data
                dispatch(addProductSuccess(prdts))
            })
    }
}
export const editProducts = (id,values) => {
    return function (dispatch) {
        axios.put(`${apiurl}/${id}`,values)
            .then(response => {
                const prdts = response.data
                dispatch(editProductSuccess(prdts))
            })
    }
}
export const deleteProducts = (id) => {
    return function (dispatch) {
        axios.delete(`${apiurl}/${id}`)
            .then(response => {
                const prdts = response.data
                dispatch(deleteProductSuccess(prdts))
            })
    }
}
