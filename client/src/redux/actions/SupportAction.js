import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    HELP_AND_SUPPORT_REQUEST,
    HELP_AND_SUPPORT_SUCCESS,
    HELP_AND_SUPPORT_FAIL,

    CLEAR_ERRORS,
} from "../constants/SupportConstant";


export const SupportAction = (name, email, subject, message) => async (dispatch) => {
    try {
        dispatch({ type: HELP_AND_SUPPORT_REQUEST });

        const { data } = await axios.post(`${APP_URL}/user/help/support`, {
            name, email, subject, message,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: HELP_AND_SUPPORT_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: HELP_AND_SUPPORT_FAIL,
            payload: error.response.data,
        })

    }
}





export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};