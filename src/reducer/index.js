
import { combineReducers } from "redux";
import AuthReducer from './auth'
import ContentsReducer from './contents'

const rootReducer = combineReducers({
    AuthReducer,ContentsReducer
})

export default rootReducer