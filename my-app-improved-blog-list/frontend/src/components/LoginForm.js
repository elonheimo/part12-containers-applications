import { useState } from 'react'
import { useNotify } from '../NotificationContext';
import { useLogin } from '../UserContext';

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const showNotification = useNotify()
  const notifyWith = (message, type = "info") => {
    showNotification(message);
  };
  const handleSubmit = async (event) => {
    event.preventDefault()
    const message = await login({ username, password })
    notifyWith(message)
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm