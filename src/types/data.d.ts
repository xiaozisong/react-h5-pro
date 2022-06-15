export type LoginForm = {
  mobile: string
  code: string
}

// 后端返回的数据类型
export type ApiRes<T> = {
  data: T
  message: string
}
