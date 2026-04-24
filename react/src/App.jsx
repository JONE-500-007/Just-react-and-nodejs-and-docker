import { useState } from 'react'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ user_name: '', email: '', password: '' })
  const [msg, setMsg] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const url = isLogin
      ? 'http://localhost:3000/api/login'
      : 'http://localhost:3000/api/register'

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (data.message === 'Login success') {
      setLoggedIn(true) // just go anther web
    } else {
      setMsg(data.message || data.error)
    }
  }

  // just if login
  if (loggedIn) {
    return (
      <div>
        <h1>Welcome 🎉</h1>
        <p>Login สำเร็จแล้ว!</p>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      {!isLogin && (
        <input
          name="user_name"
          placeholder="Username"
          onChange={handleChange}
        />
      )}

      <br />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSubmit}>
        {isLogin ? 'Login' : 'Register'}
      </button>

      <p>{msg}</p>

      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  )
}

export default App