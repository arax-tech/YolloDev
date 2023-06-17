import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    VERIFY_FAIL,

    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAIL,

    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,

    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAIL,

    ACCOUNT_DISABLE_SUCCESS,
    ACCOUNT_DISABLE_FAIL,

    ACCOUNT_DELETE_SUCCESS,
    ACCOUNT_DELETE_FAIL,

    CREATE_TAG_REQUEST,
    CREATE_TAG_SUCCESS,
    CREATE_TAG_FAIL,
    CREATE_TAG_RESET,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,

    UPDATE_ACCOUNT_REQUEST,
    UPDATE_ACCOUNT_SUCCESS,
    UPDATE_ACCOUNT_FAIL,
    UPDATE_ACCOUNT_RESET,

    UPDATE_NOTIFICATION_SETTING_REQUEST,
    UPDATE_NOTIFICATION_SETTING_SUCCESS,
    UPDATE_NOTIFICATION_SETTING_FAIL,
    UPDATE_NOTIFICATION_SETTING_RESET,

    CLEAR_ERRORS,

} from "../constants/AuthConstant";
export const UserReducer = (state = {}, action) => {
    console.log(action.type)
    switch (action.type) {
        case AUTH_USER_REQUEST:
        case GET_USER_REQUEST:
            return {
                loading: true,
            };
        case AUTH_USER_SUCCESS:
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                tags: action.payload.tags,
                diamonds: action.payload.diamonds,
                notifications: action.payload.notifications,
                reactions: action.payload.reactions,
                activePosts: action.payload.activePosts,
                profilePostLikes: action.payload.profilePostLikes,
                profilePostYouLikes: action.payload.profilePostYouLikes,
                authToken: action.payload.authToken,
            };

        case AUTH_USER_FAIL:
        case GET_USER_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };

            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            }

        default:
            return state;
    }
}


export const AuthReducer = (state = {}, action) => {
    // console.log(action.type)
    switch (action.type) {
        case LOGIN_REQUEST:
        case VERIFY_REQUEST:
            return {
                loading: true,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                type: action.payload.type,
                phone: action.payload.phone,
                email: action.payload.email,
                code: action.payload.code,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload.message,
                user: action.payload.user,
            };

        case LOGIN_FAIL:
        case VERIFY_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
                type: action.payload.type,
                phone: action.payload.phone,
                email: action.payload.email,
            };


        case AUTH_LOGOUT_SUCCESS:
        case ACCOUNT_DISABLE_SUCCESS:
        case ACCOUNT_DELETE_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                message: action.payload.message,
                status: action.payload.status,
            };



        case AUTH_LOGOUT_FAIL:
        case ACCOUNT_DISABLE_FAIL:
        case ACCOUNT_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            }

        default:
            return state;
    }
}



export const updateProfileReducer = (state = {}, action) => {
    // console.log(action.type)
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_ACCOUNT_REQUEST:
        case UPDATE_NOTIFICATION_SETTING_REQUEST:
        case CREATE_TAG_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_ACCOUNT_SUCCESS:
        case UPDATE_NOTIFICATION_SETTING_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isUpdated: true,
            };

        case CREATE_TAG_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isCreated: true,
            };


        case UPDATE_PROFILE_FAIL:
        case UPDATE_PROFILE_FAIL:
        case UPDATE_ACCOUNT_FAIL:
        case UPDATE_NOTIFICATION_SETTING_FAIL:
        case CREATE_TAG_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case UPDATE_PROFILE_RESET:
        case UPDATE_ACCOUNT_RESET:
        case UPDATE_NOTIFICATION_SETTING_RESET:
        case CREATE_TAG_RESET:
            return {
                ...state,
                isUpdated: false,
                isCreated: false,
                errors: null,
                status: null,
                message: null
            };

        case CREATE_TAG_RESET:
            return {
                ...state,
                isCreated: false,
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