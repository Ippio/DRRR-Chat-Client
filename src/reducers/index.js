import {combineReducers} from 'redux'
import loungeReducer from './lounge'
import userReducer from './user'
import roomReducer from './room'
const rootReducer = combineReducers({
    user: userReducer,
    lounge : loungeReducer,
    room : roomReducer
})

export default rootReducer