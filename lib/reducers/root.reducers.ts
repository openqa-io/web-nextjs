import { combineReducers } from 'redux'
import userInfoReducer, { UserInfoReducer } from './userInfo.reducers'

export interface RootReducers {
  userInfo: UserInfoReducer
}

export default combineReducers({
  userInfoReducer
})
