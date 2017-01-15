import React from 'react';
import Nav from './Nav';
import {browserHistory} from 'react-router';
import * as firebase from 'firebase';

class NavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      menuVisible: false,
      searchVisible: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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
  handleSignOut() {
    firebase.auth().signOut().then(() => {
      this.toggleMenu();
      browserHistory.push('/sign-in');
    }, error => {
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
