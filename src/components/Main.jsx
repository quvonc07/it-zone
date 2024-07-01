import React from 'react'
import Header from './Header'
import Content from './Content'

export default function Main({children}) {
  return (
    <div className='main'>
      <Header/>
      <Content>{children}</Content>
    </div>
  )
}
