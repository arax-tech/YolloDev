import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    SEARCH_RESET,

    SEARCH_TIMELINE,

    CLEAR_ERRORS,

} from "../constants/SearchConstant";





export const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true,
            };



        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
                users: action.payload.users,
                badges: action.payload.badges,
            };

        case SEARCH_TIMELINE:
            return {
                ...state,
                loading: false,
                posts: action.posts,
            };


        case SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };



        case SEARCH_RESET:
            return {
                ...state,
                errors: null,
                status: null
            };


        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                status: null
            };

        default:
            return state;
    }
}




