import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { AuthReducer, UserReducer, updateProfileReducer } from './reducers/AuthReducer';
import { memoriesReducer } from './reducers/MemoriesReducer';
import { postReducer } from './reducers/PostReducer';
import { commentModeReducer, reactionReducer } from './reducers/ReactionReducer';
import { searchReducer } from './reducers/SearchReducer';
import { supportReducer } from './reducers/SupportReducer';
import { promptsReducer, yelloReducer } from './reducers/YelloReducer';



const reducer = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    updateProfile: updateProfileReducer,
    support: supportReducer,
    yello: yelloReducer,

    post: postReducer,
    reaction: reactionReducer,
    commentModel: commentModeReducer,
    prompts: promptsReducer,

    search: searchReducer,
    memories: memoriesReducer,
});

let initialState = {};

const middleware = [thunk];

const Store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;