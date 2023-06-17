import {
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAIL,
    VIEW_POST_RESET,

    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
    LIKE_POST_RESET,

    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAIL,
    UNLIKE_POST_RESET,


    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,
    CREATE_COMMENT_RESET,

    LIKE_COMMENT_REQUEST,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAIL,
    LIKE_COMMENT_RESET,

    UNLIKE_COMMENT_REQUEST,
    UNLIKE_COMMENT_SUCCESS,
    UNLIKE_COMMENT_FAIL,
    UNLIKE_COMMENT_RESET,

    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_RESET,

    ONE_MINUT_REWARD_REQUEST,
    ONE_MINUT_REWARD_SUCCESS,
    ONE_MINUT_REWARD_FAIL,
    ONE_MINUT_REWARD_RESET,

    REPORT_POST_REQUEST,
    REPORT_POST_SUCCESS,
    REPORT_POST_FAIL,
    REPORT_POST_RESET,

    ADD_DIAMOND_IN_POST_REQUEST,
    ADD_DIAMOND_IN_POST_SUCCESS,
    ADD_DIAMOND_IN_POST_FAIL,
    ADD_DIAMOND_IN_POST_RESET,

    SHARE_POST_REQUEST,
    SHARE_POST_SUCCESS,
    SHARE_POST_FAIL,
    SHARE_POST_RESET,

    SHEET_OPEN,
    SHEET_CLOSE,

    CLEAR_ERRORS,

} from "../constants/ReactionConstant";





export const reactionReducer = (state = {}, action) => {
    switch (action.type) {
        case VIEW_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case UNLIKE_POST_REQUEST:
        case CREATE_COMMENT_REQUEST:
        case LIKE_COMMENT_REQUEST:
        case UNLIKE_COMMENT_REQUEST:
        case DELETE_COMMENT_REQUEST:
        case REPORT_POST_REQUEST:
        case ADD_DIAMOND_IN_POST_REQUEST:
        case SHARE_POST_REQUEST:
        case ONE_MINUT_REWARD_REQUEST:
            return {
                ...state,
            };


        case VIEW_POST_SUCCESS:
        case LIKE_POST_SUCCESS:
        case UNLIKE_POST_SUCCESS:
        case ONE_MINUT_REWARD_SUCCESS:
        case REPORT_POST_SUCCESS:
        case SHARE_POST_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
            };

        case ADD_DIAMOND_IN_POST_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                updatedDaimonds: action.payload.updatedDaimonds,
            };

        case CREATE_COMMENT_SUCCESS:
        case UNLIKE_COMMENT_SUCCESS:
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                updatedComments: action.payload.updatedComments,
            };
        case LIKE_COMMENT_SUCCESS:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
                updatedComments: action.payload.updatedComments,
                IsLiked:true,
            };

        case VIEW_POST_FAIL:
        case LIKE_POST_FAIL:
        case UNLIKE_POST_FAIL:
        case CREATE_COMMENT_FAIL:
        case LIKE_COMMENT_FAIL:
        case UNLIKE_COMMENT_FAIL:
        case DELETE_COMMENT_FAIL:
        case ONE_MINUT_REWARD_FAIL:
        case REPORT_POST_FAIL:
        case SHARE_POST_FAIL:
            return {
                ...state,
                loading: false,
                IsLiked: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };



        case ADD_DIAMOND_IN_POST_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };




        case VIEW_POST_RESET:
        case LIKE_POST_RESET:
        case UNLIKE_POST_RESET:
        case CREATE_COMMENT_RESET:
        case LIKE_COMMENT_RESET:
        case UNLIKE_COMMENT_RESET:
        case DELETE_COMMENT_RESET:
        case ONE_MINUT_REWARD_RESET:
        case REPORT_POST_RESET:
        case ADD_DIAMOND_IN_POST_RESET:
        case SHARE_POST_RESET:
            return {
                status: null,
                message: null,
            };





        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
                status: null,
                message: null
            };

        default:
            return state;
    }
}



const initialState = {
    open: false,
    isReact: true,
    post: null,
    modelType: -1
}
export const commentModeReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SHEET_OPEN:
            return {
                ...state,
                open: action.open,
                post: action.post,
                modelType: action.modelType,
                isReact: action.isReact,
            };

        case SHEET_CLOSE:
            return {
                ...state,
                open: false,
                isReact: true,
                post: null,
                modelType: -1
            };

        default:
            return state;
    }
}