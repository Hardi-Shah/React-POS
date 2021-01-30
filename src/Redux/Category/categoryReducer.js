import { FETCH_CATEGORIES, ADD_CATEGORIES, EDIT_CATEGORIES, DELETE_CATEGORIES} from "./categoryType"

const intialState = {
    categories: []
}

const categoryReducer = (state = intialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES: return {
            categories: action.payload
        }
        case ADD_CATEGORIES: return {
            ...state,
            addcat:state.categories.push(action.payload)
        }
        case EDIT_CATEGORIES: return {
            ...state,
            editcat:state.categories.map((cat)=>cat.id === action.payload.id ?{...cat,name:action.payload.name}:cat)
        }
        case DELETE_CATEGORIES: return {
            ...state,
            deletecat:state.categories.filter(item=>item.id !== action.payload)
        }
        default: return state
    }
}
export default categoryReducer