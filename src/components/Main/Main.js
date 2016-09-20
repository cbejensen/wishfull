import React from 'react';
// import { Link } from 'react-router';
// import NavLink from './NavLink/NavLink.js';
import * as firebase from 'firebase';

export function Dashboard(props) {
  return (
    <div>
      This is the main page. Test is: {props.test}
    </div>
  )
}

class DashboardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      test: 0
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('test');
    rootRef.on('value', snap => {
      this.setState({
        test: snap.val()
      });
    });
  }

  render() {
    return <Dashboard test={this.state.test}/>
  }
};

export default DashboardContainer;
