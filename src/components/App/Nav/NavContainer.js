import React from 'react';
import Nav from './Nav';
import * as firebase from 'firebase';

class NavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      showMenu: false,
      showSearch: false
    };
    this.handleSignOut = this.handleSignOut.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }
  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      this.setState({uid: user.uid})
    });
  }
  componentWillUnmount() {
    this.removeListener();
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
      console.log(error);
    });
  }
  render() {
    return <Nav {...this.state}
      toggleMenu={this.toggleMenu}
      toggleSearch={this.toggleSearch}
      handleSignOut={this.handleSignOut} />
  }
};

export default NavContainer;
