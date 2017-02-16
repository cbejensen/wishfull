import React from 'react'
import {Nav} from './Nav'
import {Footer} from './Footer'

export default function App(props) {
  // don't show Nav on Main
  return (
    <div>
      <div style={{minHeight: 'calc(100vh - 50px)'}}>
        <nav>{(props.location.pathname === '/') || <Nav />}</nav>
        <main>{props.children}</main>
      </div>
      <footer style={{height: '50px'}}><Footer /></footer>
    </div>
  )
}
