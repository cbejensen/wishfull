import React from 'react';
import App from './App';

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showSearch: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
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
  render() {
    return (
      <App showMenu={this.state.showMenu}
        showSearch={this.state.showSearch}
        toggleMenu={this.toggleMenu}
        toggleSearch={this.toggleSearch}>
        {this.props.children}
      </App>
    )
  }
};

export default AppContainer;
