import { reducerWithInitialState } from 'typescript-fsa-reducers'
import * as actions from '../actions/root.actions'

export interface UserInfoReducer {
  uid?: String
  token?: String
  githubName?: String
  githubAvatar?: String
}


const initialState: UserInfoReducer = {}

export default reducerWithInitialState(initialState)
  .case(actions.setUserInfo, (state, payload) => {
    //    console.log( 'setting lcoale ', payload)
    return {
      ...state,
      ...payload
    }
  })
