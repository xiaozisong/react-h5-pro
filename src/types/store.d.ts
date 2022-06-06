import store from "@/store"
import { ThunkAction } from "redux-thunk"

export type Token = {
  token: string
  refresh_token: string
}

export type LoginType = Token

export type LoginAction = {
  type: 'login/saveToken'
}

// ------------------------------------------------------------------------
// store的state的类型
export type RootState = ReturnType<typeof store.getState>
// 所有的Action的类型
export type RootAction = LoginAction
// thunkAction类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>