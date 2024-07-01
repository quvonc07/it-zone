import React from 'react'
import NotFoundApp from '../../pages/privite/NotFound'

export default function CheckRole({userRole,roles,children}) {
  return roles.some(item=>item===userRole)?<>{children}</>:<NotFoundApp/>
}
