import axios from 'axios'
import { APP_URL } from '../constants/App';

import {
    VIEW_POST_REQUEST,
    VIEW_POST_SUCCESS,
    VIEW_POST_FAIL,

    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,

    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAIL,

    SHEET_OPEN,
    SHEET_CLOSE,

    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAIL,

    LIKE_COMMENT_REQUEST,
    LIKE_COMMENT_SUCCESS,
    LIKE_COMMENT_FAIL,

    UNLIKE_COMMENT_REQUEST,
    UNLIKE_COMMENT_SUCCESS,
    UNLIKE_COMMENT_FAIL,

    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAIL,

    ONE_MINUT_REWARD_REQUEST,
    ONE_MINUT_REWARD_SUCCESS,
    ONE_MINUT_REWARD_FAIL,

    REPORT_POST_REQUEST,
    REPORT_POST_SUCCESS,
    REPORT_POST_FAIL,


    ADD_DIAMOND_IN_POST_REQUEST,
    ADD_DIAMOND_IN_POST_SUCCESS,
    ADD_DIAMOND_IN_POST_FAIL,

    SHARE_POST_REQUEST,
    SHARE_POST_SUCCESS,
    SHARE_POST_FAIL,

    CLEAR_ERRORS,

} from "../constants/ReactionConstant";



export const PostViewAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: VIEW_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/view/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: VIEW_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: VIEW_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const PostLikeAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: LIKE_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/like/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: LIKE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: LIKE_POST_FAIL,
            payload: error.response.data,
        })

    }
}


export const PostUnLikeAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: UNLIKE_POST_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/unlike/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UNLIKE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UNLIKE_POST_FAIL,
            payload: error.response.data,
        })

    }
}




export const OpenSheetAction = (open, post, modelType, isReact) => (dispatch) => {
    dispatch({
        open,
        post,
        modelType,
        isReact,
        type: SHEET_OPEN,
    });
}


export const CloseSheetAction = () => (dispatch) => {
    dispatch({
        type: SHEET_CLOSE,
    });
}




export const CreateCommentAction = (post_id, comment) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_COMMENT_REQUEST });


        const { data } = await axios.put(`${APP_URL}/user/post/comment/store/${post_id}`, {
            comment,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: CREATE_COMMENT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload: error.response.data,
        })

    }
}

export const LikeCommentAction = (post_id, comment_id) => async (dispatch) => {
    try {
        dispatch({ type: LIKE_COMMENT_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/comment/like/${post_id}/${comment_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: LIKE_COMMENT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: LIKE_COMMENT_FAIL,
            payload: error.response.data,
        })

    }
}

export const UnLikeCommentAction = (post_id, comment_id) => async (dispatch) => {
    try {
        dispatch({ type: UNLIKE_COMMENT_REQUEST });

        const { data } = await axios.put(`${APP_URL}/user/post/comment/unlike/${post_id}/${comment_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UNLIKE_COMMENT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UNLIKE_COMMENT_FAIL,
            payload: error.response.data,
        })

    }
}

export const DeleteCommentAction = (post_id, comment_id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COMMENT_REQUEST });

        const { data } = await axios.delete(`${APP_URL}/user/post/comment/delete/${post_id}/${comment_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: DELETE_COMMENT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload: error.response.data,
        })

    }
}

export const ReportPostAction = (post_id, reason) => async (dispatch) => {
    try {
        dispatch({ type: REPORT_POST_REQUEST });


        const { data } = await axios.post(`${APP_URL}/user/post/report/${post_id}`, {
            reason,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: REPORT_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: REPORT_POST_FAIL,
            payload: error.response.data,
        })

    }
}



export const AddDiamondPostAction = (post_id, user, post_diamonds) => async (dispatch) => {
    try {
        dispatch({ type: ADD_DIAMOND_IN_POST_REQUEST });


        const { data } = await axios.put(`${APP_URL}/user/post/diamond/${post_id}`, {
            user, post_diamonds,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: ADD_DIAMOND_IN_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADD_DIAMOND_IN_POST_FAIL,
            payload: error.response.data,
        })

    }
}



export const SharePostAction = (post_id) => async (dispatch) => {
    try {
        dispatch({ type: SHARE_POST_REQUEST });


        const { data } = await axios.put(`${APP_URL}/user/post/share/${post_id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: SHARE_POST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: SHARE_POST_FAIL,
            payload: error.response.data,
        })

    }
}



export const OneMinuteRewardAction = () => async (dispatch) => {
    try {
        dispatch({ type: ONE_MINUT_REWARD_REQUEST });

        const { data } = await axios.get(`${APP_URL}/user/diamond/reward/store`);
        dispatch({
            type: ONE_MINUT_REWARD_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ONE_MINUT_REWARD_FAIL,
            payload: error.response.data,
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};