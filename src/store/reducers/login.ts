import { RootAction, Token } from "@/types/store"
import { getToken } from "@/utils/storage"

const initalValues: Token = getToken()

export default function Login(prevState = initalValues, action: RootAction){
  switch (action.type) {
    case 'login/saveToken':
      return action.payload
      default:
      return prevState
  }
}