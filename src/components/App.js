import React from 'react'
import { Nav } from './Nav'

export default function App(props) {
  // don't show Nav on Main
  return (
    <div>
      {(props.location.pathname === '/') || <Nav />}
      {props.children}
    </div>
  )
}
