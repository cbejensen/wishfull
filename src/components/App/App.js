import React from 'react'
import { Nav } from './Nav'

export default function App(props) {
  const styles = {
    nav: {
      display: (props.location.pathname === '/')
        ? 'none'
        : 'block'
    },
    app: {
      position: 'relative'
    }
  }
  return (
    <div>
      <div style={styles.nav}>
        <Nav />
      </div>
      <div style={styles.app}>
        {props.children}
      </div>
    </div>
  )
}
