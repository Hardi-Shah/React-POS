import { FETCH_CATEGORIES, ADD_CATEGORIES, EDIT_CATEGORIES, DELETE_CATEGORIES} from "./categoryType"
import axios from 'axios'
import { apiurl } from "../../Services/CategoryService";

export const fetchCategorySuccess = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        payload: categories
    }
}
export const addCategorySuccess = (data) => {
    return {
        type: ADD_CATEGORIES,
        payload: data
    }
}
export const editCategorySuccess = (data) => {
    return {
        type: EDIT_CATEGORIES,
        payload: data
    }
}
export const deleteCategorySuccess = (id) => {
    return  {
        type: DELETE_CATEGORIES,
        payload: id
    }
}

export const fetchCategories = () => {
    return function (dispatch) {
        axios.get(`${apiurl}`)
            .then(response => {
                const cats = response.data
                dispatch(fetchCategorySuccess(cats))
            })
    }
}
export const addCategories = (values) => {
    return function (dispatch) {
        axios.post(`${apiurl}`,values)
            .then(response => {
                const cats = response.data
                dispatch(addCategorySuccess(cats))
            })
    }
}
