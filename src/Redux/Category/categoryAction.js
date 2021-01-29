import {FETCH_CATEGORIES} from "./categoryType"
import axios from 'axios'

export const fetchCategorySuccess = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        payload: categories
    }
}

export const fetchCategories = () =>  {
     return function (dispatch) {
       axios.get('http://localhost:3002/categories')
            .then(response => {
                const cats=response.data
                dispatch(fetchCategorySuccess(cats))
            })
    }
}
