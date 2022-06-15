import { Token } from "@/types/store"

// 持久化redux中的token
const TOKEN_KEY = 'mobile-user-token'

export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_KEY) || '{}')
}

export const setToken = (token: Token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const hasToken = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY)
}