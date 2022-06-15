import { RootAction, Token } from "@/types/store"

const initalValues: Token = {
  refresh_token: '',
  token: ''
}

export default function Login(prevState = initalValues, action: RootAction){
  switch (action.type) {
    case 'login/saveToken':
      return action.payload
      default:
      return prevState
  }
}