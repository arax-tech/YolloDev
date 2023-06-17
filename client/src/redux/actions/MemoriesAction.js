import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    MEMORIES_REQUEST,
    MEMORIES_SUCCESS,
    MEMORIES_FAIL,

    MEMORY_REPOST_REQUEST,
    MEMORY_REPOST_SUCCESS,
    MEMORY_REPOST_FAIL,

    MEMORIES_TIMELINE,

    CLEAR_ERRORS,

} from "../constants/MemoriesConstant";


export const MemoriesAction = (month, year) => async (dispatch) => {
    try {
        dispatch({ type: MEMORIES_REQUEST });
        const { data } = await axios.get(`${APP_URL}/user/memories/${month}/${year}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: MEMORIES_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MEMORIES_FAIL,
            payload: error.response.data,
        })

    }
}

export const MemoriesTimelineAction = (posts) => async (dispatch) => {
    dispatch({
        type: MEMORIES_TIMELINE,
        posts
    });
}

export const MemoryRepostAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: MEMORY_REPOST_REQUEST });
        const { data } = await axios.get(`${APP_URL}/user/memories/repost/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: MEMORY_REPOST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: MEMORY_REPOST_FAIL,
            payload: error.response.data,
        })

    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};