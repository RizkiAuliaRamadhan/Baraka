
import { combineReducers } from "redux";
import AuthReducer from './auth'
import ContentsReducer from './contents'
import DonasiReducer from './donasi'

const rootReducer = combineReducers({
    AuthReducer,ContentsReducer, DonasiReducer
})

export default rootReducer