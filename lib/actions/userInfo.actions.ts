import actionCreatorFactory from "typescript-fsa"

export interface UserInfoData {
  uid?: String
  token?: String
  githubName?: String
  githubAvatar?: String
}

const actionCreator = actionCreatorFactory("USERINFO");

export const setUserInfo = actionCreator<UserInfoData>("Set_User_Info");
