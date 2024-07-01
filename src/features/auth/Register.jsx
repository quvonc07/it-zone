import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [open, setOpen] = useState(false)
  return (
    <div className='login'>
      <div className='login__header'></div>
      <form className='login__form'>
        <h1 className='login__form__title'>Register</h1>
        <input type="text" placeholder='Name' required />
        <input type="email" placeholder='Email' required />
        <div className='form__control'>
          <input type={open ? "text" : "password"} placeholder='Password' required />
          {
            open ? <span className='form__icon' onClick={() => setOpen(!open)}>🐵 </span> : <span className='form__icon' onClick={() => setOpen(!open)}>🙈 </span>
          }

        </div>

        <button type='submit'>SIGN UP</button>
        <p className='login__form__link'>Already have an account? <Link to={"/login"}>Login</Link></p>
      </form>
    </div>
  )
}
