import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useAuth } from './AuthContext'
import './AuthPage.css'

const AuthPage: FC = () => {
  const { isAuth, user, isLoading, error, login, logout } = useAuth()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(formData)
    } catch (err) {
      //уже обработано в контексте
    }
  }

  return (
    <div className="container">
      {isAuth ? (
        <div className="auth">
          <h2 className="auth-text">Yeah! You Are Authorized!</h2>
          <p>Your username: {user?.username}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="auth">
          <h2 className="auth-text">Try to Log In Here:</h2>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="auth-input"
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
            <input
              className="auth-input"
              type="text"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export { AuthPage }
