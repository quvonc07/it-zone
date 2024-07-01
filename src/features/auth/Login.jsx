import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/auth/userContext'
import { AuthContext } from '../../context/auth/authContext'

export default function Login() {
  const { userData } = useContext(UserContext)
  const { setUser } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const email = useRef()
  const password = useRef()

  useEffect(() => {
    email.current.value = "admin@mail.com"
    password.current.value = "admin"
  }, [])

  const login = (e) => {
    e.preventDefault();
    if (userData.email === email.current.value && userData.password === password.current.value) {
      setUser({ isLoged: true, token: "tokin" })
      localStorage.setItem("userTokin", "tokin")
      return;
    }
    alert("Login yoki parol xato")

  }


  return (
    <div className='login'>
      <div className='login__header'></div>
      <form className='login__form' onSubmit={(e) => login(e)}>
        <h1 className='login__form__title'>Login</h1>
        <input ref={email} type="email" placeholder='Email' required />

        <div className='form__control'>
          <input ref={password} type={open ? "text" : "password"} placeholder='Password' required />
          {
            open ? <span className='form__icon' onClick={() => setOpen(!open)}>🐵 </span> : <span className='form__icon' onClick={() => setOpen(!open)}>🙈 </span>
          }

        </div>

        <button type='submit'>SIGN UP</button>
        <p className='login__form__link'>Already have an account? <Link to={"/register"}>Register</Link></p>
      </form>
    </div>
  )
}
