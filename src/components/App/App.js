import React from 'react'
import { Nav } from './Nav'

export default function App(props) {
  const styles = {
    nav: {
      display: (props.location.pathname === '/')
        ? 'none'
        : 'block'
    }
  }
  return (
    <div>
      <div style={styles.nav}>
        <Nav />
      </div>
      {props.children}
    </div>
  )
}
