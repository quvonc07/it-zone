import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../Layout'
export default function ProtectedRoutes({isLoged}) {
    if(isLoged){
        return <Layout> <Outlet/> </Layout>
    }

  return <Navigate replace to={"/login"}/>
}
