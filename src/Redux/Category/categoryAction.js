import { FETCH_CATEGORIES} from "./categoryType"
import axios from 'axios'
import { apiurl } from "../../Services/CategoryService";

export const fetchCategorySuccess = (categories) => {
    return {
        type: FETCH_CATEGORIES,
        payload: categories
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
