import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    CREATE_POST_RESET,

    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,
    POSTS_RESET,

    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_RESET,

    SINGLE_POST_REQUEST,
    SINGLE_POST_SUCCESS,
    SINGLE_POST_FAIL,
    SINGLE_POST_RESET,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
    DELETE_POST_RESET,

    FOLLOWING_POSTS_REQUEST,
    FOLLOWING_POSTS_SUCCESS,
    FOLLOWING_POSTS_FAIL,
    FOLLOWING_POSTS_RESET,


    CLEAR_ERRORS,

} from "../constants/PostConstant";





export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case POSTS_REQUEST:
        case FOLLOWING_POSTS_REQUEST:
        case CREATE_POST_REQUEST:
        case UPDATE_POST_REQUEST:
        case SINGLE_POST_REQUEST:
        case DELETE_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };





        case CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isCreated: true,
            };
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                IsUpdated: true,
            };
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                IsDeleted: true,
            };
        case POSTS_SUCCESS:
        case FOLLOWING_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };

        case SINGLE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.payload.post,
            };




        case CREATE_POST_FAIL:
        case UPDATE_POST_FAIL:
        case POSTS_FAIL:
        case FOLLOWING_POSTS_FAIL:
        case SINGLE_POST_FAIL:
        case DELETE_POST_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case CREATE_POST_RESET:
            return {
                ...state,
                isCreated: false,
            };
        case DELETE_POST_RESET:
            return {
                ...state,
                IsDeleted: false,
            };

        case POSTS_RESET:
        case FOLLOWING_POSTS_RESET:
        case SINGLE_POST_RESET:
        case UPDATE_POST_RESET:
            return {
                ...state,
                errors: null,
                IsUpdated: null,
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




