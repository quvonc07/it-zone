import React, { useEffect, useState } from 'react'

export default function Header() {
  const [theme,setTheme]  = useState(localStorage.getItem("theme")?true:false)
  useEffect(()=>{
    const body = document.querySelector("body")
     if(theme){
        body.classList.add("theme");
        localStorage.setItem("theme",true)
        return;
     }
     body.classList.remove("theme")
     localStorage.removeItem("theme")
  },[theme])
  return (
    <div>
      <div className='header'>
        <div className="header-content">
          <div className="header-left">
            Home /
          </div>
          <div className="header-right">
            <div className="header-box">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="header-icon">
                <g>
                  <path
                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                  ></path>
                </g>
              </svg>
              <input className="header-input" id='header-input' type="search" placeholder="Search" />
            </div>
            <div className="theme" onClick={()=>setTheme(!theme)}>
              {
                theme?<i className="bi bi-sun"></i>: <i className="bi bi-moon-fill"></i>
              }
             
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
