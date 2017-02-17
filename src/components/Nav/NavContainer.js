import React from 'react'
import Nav from './Nav'
import {browserHistory} from 'react-router'
import * as firebase from 'firebase'

class NavContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: '',
      menuVisible: false,
      searchVisible: false
    }
    this.toggleMenu = this.toggleMenu.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.signOut = this.signOut.bind(this)
  }
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) this.setState({uid: user.uid})
      else this.setState({uid: false})
    })
  }
  componentWillUnmount() {
    this.removeListener()
  }
  componentWillReceiveProps(nextProps) {
    // when route changes, set default Nav
    this.setState({
      menuVisible: false,
      searchVisible: false
    })
  }
  toggleMenu() {
    this.setState((prevState, props) => {
      return {
        menuVisible: !prevState.menuVisible,
        searchVisible: false
      }
    })
  }
  toggleSearch() {
    this.setState((prevState, props) => {
      return {
        menuVisible: false,
        searchVisible: !prevState.searchVisible
      }
    })
  }
  signOut() {
    firebase.auth().signOut().then(() => {
      this.toggleMenu()
      browserHistory.push('/sign-in')
    }, error => {
      console.log(error)
    })
  }
  render() {
    return <Nav {...this.state}
      toggleMenu={this.toggleMenu}
      toggleSearch={this.toggleSearch}
      signOut={this.signOut} />
  }
}

export default NavContainer
