import React from 'react'
import Sidebar from './Sidebar'
import Main from './Main'

export default function Layout({ children }) {
    return (
        <div className='layout'>
            <Sidebar />
            <Main>
                {
                    children
                }
            </Main>
        </div>
    )
}
