import React from 'react';
import Nav from './Nav';
import * as firebase from 'firebase';

class NavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      query: '',
      showMenu: false,
      showSearch: false
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    });
  }
  toggleMenu() {
    this.setState((prevState, props) => {
      return {
        showMenu: !prevState.showMenu,
        showSearch: false
      }
    })
  }
  toggleSearch() {
    this.setState((prevState, props) => {
      return {
        showMenu: false,
        showSearch: !prevState.showSearch
      }
    })
  }
  handleSignOut() {
    firebase.auth().signOut().then(() => {}, error => {
      console.log(error)
    });
  }
  render() {
    if (!this.state.user) return <Nav user={null} />
    return <Nav {...this.state}
      toggleMenu={this.toggleMenu}
      toggleSearch={this.toggleSearch}
      handleSignOut={this.handleSignOut} />
  }
};

export default NavContainer;
