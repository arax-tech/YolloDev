import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    POSTS_REQUEST,
    POSTS_SUCCESS,
    POSTS_FAIL,

    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,

    FOLLOWING_POSTS_REQUEST,
    FOLLOWING_POSTS_SUCCESS,
    FOLLOWING_POSTS_FAIL,

    SINGLE_POST_REQUEST,
    SINGLE_POST_SUCCESS,
    SINGLE_POST_FAIL,

    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,

    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,


    CLEAR_ERRORS,

} from "../constants/PostConstant";


export const PostsAction = (page) => async (dispatch) => {
    try {
        dispatch({ type: POSTS_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/post?page=${page}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: POSTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: POSTS_FAIL,
            payload: error.response.data,
        })

    }
}

export const SinglePostAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_POST_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/post/single/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SINGLE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SINGLE_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const DeletePostAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_POST_REQUEST });

        const { data } = await axios.delete(`${APP_URL}/user/post/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response.data,
        })

    }
}

export const FollowingPostsAction = () => async (dispatch) => {
    try {
        dispatch({ type: FOLLOWING_POSTS_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/post/my-following-posts`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: FOLLOWING_POSTS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: FOLLOWING_POSTS_FAIL,
            payload: error.response.data,
        })

    }
}

export const CreatePostAction = (caption, hashtag, images, who_can_see, allow_comments, allow_reactions, allow_high_quality) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST });

        const { data } = await axios.post(`${APP_URL}/user/post/store`, {
            caption, hashtag, images, who_can_see, allow_comments, allow_reactions, allow_high_quality,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: CREATE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const UpdatePostAction = (caption, hashtag, images, who_can_see, allow_comments, allow_reactions, allow_high_quality, post_id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/update/${post_id}`, {
            caption, hashtag, images, who_can_see, allow_comments, allow_reactions, allow_high_quality,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_POST_FAIL,
            payload: error.response.data,
        })

    }
}







export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};