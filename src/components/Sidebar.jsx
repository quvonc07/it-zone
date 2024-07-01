import React from 'react'
import logo from '../assets/svg/logo.svg'
import { NavLink } from 'react-router-dom'
import { priviteRoutes } from '../config/routes'
// import shopIcon from '../assets/svg/shop.svg'
// import office from '../assets/svg/office.svg'

export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-logo">
                <img src={logo} alt="" />
            </div>
            {
                priviteRoutes.map(item => item.name && (
                    <div className="sidebar-border" key={item.key}>
                        <NavLink to={item.path}>
                            <div  className="sidebar-icon ">
                                {
                                    item.icon
                                }
                            </div>
                            <p className='bold'>
                                {
                                    item.name
                                }
                            </p>
                        </NavLink>
                    </div>
                ))
            }

        </div>
    )
}
