import {
    MEMORIES_REQUEST,
    MEMORIES_SUCCESS,
    MEMORIES_FAIL,
    MEMORIES_RESET,

    MEMORY_REPOST_REQUEST,
    MEMORY_REPOST_SUCCESS,
    MEMORY_REPOST_FAIL,
    MEMORY_REPOST_RESET,

    CLEAR_ERRORS,
    MEMORIES_TIMELINE,

} from "../constants/MemoriesConstant";





export const memoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case MEMORIES_REQUEST:
        case MEMORY_REPOST_REQUEST:
            return {
                ...state,
                loading: true,
            };



        case MEMORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                firstWeekPosts: action.payload.firstWeekPosts,
                secondWeekPosts: action.payload.secondWeekPosts,
                thirdWeekPosts: action.payload.thirdWeekPosts,
                fourWeekPosts: action.payload.fourWeekPosts,
                fiveWeekPosts: action.payload.fiveWeekPosts,

                monthDay1Posts: action.payload.monthDay1Posts,
                monthDay2Posts: action.payload.monthDay2Posts,
                monthDay3Posts: action.payload.monthDay3Posts,
                monthDay4Posts: action.payload.monthDay4Posts,
                monthDay5Posts: action.payload.monthDay5Posts,
                monthDay6Posts: action.payload.monthDay6Posts,
                monthDay7Posts: action.payload.monthDay7Posts,

                monthDay8Posts: action.payload.monthDay8Posts,
                monthDay9Posts: action.payload.monthDay9Posts,
                monthDay10Posts: action.payload.monthDay10Posts,
                monthDay11Posts: action.payload.monthDay11Posts,
                monthDay12Posts: action.payload.monthDay12Posts,
                monthDay13Posts: action.payload.monthDay13Posts,
                monthDay14Posts: action.payload.monthDay14Posts,

                monthDay15Posts: action.payload.monthDay15Posts,
                monthDay16Posts: action.payload.monthDay16Posts,
                monthDay18Posts: action.payload.monthDay18Posts,
                monthDay19Posts: action.payload.monthDay19Posts,
                monthDay20Posts: action.payload.monthDay20Posts,
                monthDay21Posts: action.payload.monthDay21Posts,

                monthDay22Posts: action.payload.monthDay22Posts,
                monthDay23Posts: action.payload.monthDay23Posts,
                monthDay24Posts: action.payload.monthDay24Posts,
                monthDay25Posts: action.payload.monthDay25Posts,
                monthDay26Posts: action.payload.monthDay26Posts,
                monthDay27Posts: action.payload.monthDay27Posts,
                monthDay28Posts: action.payload.monthDay28Posts,

                monthDay29Posts: action.payload.monthDay29Posts,
                monthDay30Posts: action.payload.monthDay30Posts,
                monthDay31Posts: action.payload.monthDay31Posts,
            };

        case MEMORY_REPOST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
            };
        case MEMORIES_TIMELINE:
            return {
                ...state,
                loading: false,
                posts: action.posts,
            };


        case MEMORIES_FAIL:
        case MEMORY_REPOST_FAIL:
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                status: action.payload.status,
                errors: action.payload,
            };



        case MEMORIES_RESET:
        case MEMORY_REPOST_RESET:
            return {
                ...state,
                errors: null,
                message: null,
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




