import { createContext, ReactNode, useCallback, useState, useContext } from 'react'
import { Auth, AuthContextTypes } from './Auth.types'

const AuthContext = createContext<AuthContextTypes | null>(null)

interface AuthProps {
  children: ReactNode //можно заменить на any
}

export const AuthProvider = ({ children }: AuthProps) => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState<Auth | null>(null)

  // Имитация асинхронного запроса
  const fakeRequest = async (auth: Auth, delay = 1000): Promise<Auth> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (auth.username === 'Admin' && auth.password === '12345') {
          //имитируем проверку username и password
          resolve({ ...auth, token: 'fake-token' })
        } else {
          console.error(new Error('Invalid data'))
        }
      }, delay)
    })
  }

  const login = useCallback(async (auth: Auth) => {
    try {
      setIsLoading(true)
      setError(null)
      setUser({ ...auth, isPending: true })
      const response = await fakeRequest(auth)
      setUser(response)
      return response
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setUser(null)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value: AuthContextTypes = {
    user,
    login,
    isAuth: !!user?.token,
    isLoading,
    error,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
//хук, который собственно нужен, чтобы проверять авторизован пользователь или нет
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

//Заметки:
//useOptimistic - хук, который обновляет интерфейс во время асинхронных действий (напривер, запроса к серверу), а затем синхронизирует интерфейс с реальным результатом.
//Нужен для: улучшения воспринимаемой производительности/ отзывчивых интерфейсов/ реалистичное отображения изменений до подтверждения сервера
//но в данном тестовом примере переусложнит код, поэтому я решила не использовать его

//isPending - флаг,показывающий: "Выполняется ли сейчас асинхронное действие"
