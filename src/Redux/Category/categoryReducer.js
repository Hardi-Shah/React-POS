import { FETCH_CATEGORIES} from "./categoryType"

const intialState = {
    categories: []
}

const categoryReducer = (state = intialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES: return {
            categories: action.payload
        }
        default: return state
    }
}
export default categoryReducer