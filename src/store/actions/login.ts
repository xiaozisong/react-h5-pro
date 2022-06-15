import { ApiRes, LoginForm } from '@/types/data'
import { Token } from '@/types/store'
import { RootThunkAction } from '@/types/store'
import request from '@/utils/request'
export const login = (data: LoginForm): RootThunkAction => {
  return async (dispatch, getState) => {
    const res = await request.post<ApiRes<Token>>('/authorizations', data)
    dispatch({
      type: 'login/saveToken',
      payload: res.data.data
    })
  }
}