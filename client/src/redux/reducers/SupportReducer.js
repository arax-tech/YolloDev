import {
    HELP_AND_SUPPORT_FAIL,
    HELP_AND_SUPPORT_REQUEST,
    HELP_AND_SUPPORT_RESET,
    HELP_AND_SUPPORT_SUCCESS,

    CLEAR_ERRORS,

} from "../constants/SupportConstant";





export const supportReducer = (state = {}, action) => {
    switch (action.type) {
        case HELP_AND_SUPPORT_REQUEST:

            return {
                ...state,
                loading: true,
            };

        case HELP_AND_SUPPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                isCreated: true,
            };
        case HELP_AND_SUPPORT_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };
        case HELP_AND_SUPPORT_RESET:
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
