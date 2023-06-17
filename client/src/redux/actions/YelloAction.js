import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    SUGGESSION_REQUEST,
    SUGGESSION_SUCCESS,
    SUGGESSION_FAIL,

    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,

    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,

    HIDE_NOTIFICATION_REQUEST,
    HIDE_NOTIFICATION_SUCCESS,
    HIDE_NOTIFICATION_FAIL,

    UPDATE_FCM_REQUEST,
    UPDATE_FCM_SUCCESS,
    UPDATE_FCM_FAIL,

    PROMPT_OPEN,
    PROMPT_CLOSE,

    CLEAR_ERRORS,
} from "../constants/YelloConstant";


export const UpdateFCMAction = (fcm_token) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FCM_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/update/fcm/token`, {
            fcm_token,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_FCM_SUCCESS,
            payload: data
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_FCM_FAIL,
            payload: error.response.data,
        })

    }
}

export const AllSuggessionAction = () => async (dispatch) => {
    try {
        dispatch({ type: SUGGESSION_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/suggession`);
        dispatch({
            type: SUGGESSION_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SUGGESSION_FAIL,
            payload: error.response.data,
        })

    }
}
export const HideNotificationAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: HIDE_NOTIFICATION_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/notification/hide/${id}`);
        dispatch({
            type: HIDE_NOTIFICATION_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: HIDE_NOTIFICATION_FAIL,
            payload: error.response.data,
        })

    }
}

export const FollowAction = (follow_user_id) => async (dispatch) => {
    try {
        dispatch({ type: FOLLOW_REQUEST });
        const { data } = await axios.put(`${APP_URL}/user/follow`, {
            follow_user_id,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: FOLLOW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FOLLOW_FAIL,
            payload: error.response.data
        })
    }
}


export const UnFollowAction = (unfollow_user_id) => async (dispatch) => {
    try {
        dispatch({ type: UNFOLLOW_REQUEST });
        const { data } = await axios.put(`${APP_URL}/user/unfollow`, {
            unfollow_user_id,
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: UNFOLLOW_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UNFOLLOW_FAIL,
            payload: error.response.data
        })
    }
}


export const OpenPromptAction = (open, heading, message) => (dispatch) => {
    dispatch({
        open,
        heading,
        message,
        type: PROMPT_OPEN,
    });
}


export const ClosePromptAction = () => (dispatch) => {
    dispatch({
        type: PROMPT_CLOSE,
    });
}



export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};