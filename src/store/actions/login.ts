import { LoginForm } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
export const login = (data: LoginForm): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await request.post('/authorizations', data)
    console.log(res)
  }
}