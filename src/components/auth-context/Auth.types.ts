export interface Auth{
    username: string
    password: string
    token?: string
    isPending?: boolean
}

export interface AuthContextTypes {
  user: Auth | null
  login: (auth: Auth) => Promise<Auth>
  logout: () => void
  isAuth?: boolean
  isLoading?: boolean
  error: string | null
}