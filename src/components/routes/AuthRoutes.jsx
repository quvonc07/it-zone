import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AuthRoutes({isLoged}) {
    if(isLoged){
        return <Navigate replace to={"/home"}/>
    }
  return <Outlet/>
}
