import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { authRoutes, priviteRoutes } from '../config/routes'
import ProtectedRoutes from '../components/routes/ProtectedRoutes'
import { useContext } from 'react'
import { AuthContext } from '../context/auth/authContext'
import AuthRoutes from '../components/routes/AuthRoutes'
import CheckRole from '../components/routes/CheckRole'
import { UserContext } from '../context/auth/userContext'
import NotFound from '../features/notfound/NotFound'
export default function AllPages() {
    const { user } = useContext(AuthContext)
    const { userData } = useContext(UserContext)
    return (
        <>
            <Routes>

                <Route path='/' element={<ProtectedRoutes isLoged={user.isLoged} />}>
                    {
                        priviteRoutes.map(item => <Route key={item.key} path={item.path}
                            element={<CheckRole userRole={userData.role} roles={item.roles} >
                                {item.element}
                            </CheckRole>} />)
                    }
                </Route>

                <Route path='/' element={<AuthRoutes isLoged={user.isLoged} />} >
                    {
                        authRoutes.map(item => <Route key={item.key} path={item.path} element={item.element} />)
                    }
                </Route>
                <Route path='*' element={<NotFound/>}>

                </Route>
            </Routes>
        </>
    )
}

