import React from 'react'
import { Nav } from './Nav'
import './App.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <div className="App-main-container">
          {/* <div className="App-shadow-top"></div> */}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
