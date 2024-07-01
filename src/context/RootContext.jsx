import React from 'react'
import AuthContextProvider from './auth/authContext'
import UserContextProvider from './auth/userContext'

export default function RootContext({ children }) {
    return (
        <>
            <UserContextProvider>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
            </UserContextProvider>

        </>
    )
}
