import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL,

    SEARCH_TIMELINE,

    CLEAR_ERRORS,

} from "../constants/SearchConstant";


export const SearchAction = () => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/search`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SEARCH_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SEARCH_FAIL,
            payload: error.response.data,
        })

    }
}


export const SearchTimelineAction = (posts) => async (dispatch) => {
    dispatch({
        type: SEARCH_TIMELINE,
        posts
    });
}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};