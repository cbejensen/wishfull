import React from 'react';
import { Avatar } from 'components/User/Avatar';
import { browserHistory } from 'react-router';
import { Grid } from 'react-bootstrap';
import { getUser } from 'utils/firebaseHelpers';
import { WishList } from '../components/WishList/WishList';
import * as firebase from 'firebase';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    const uid = this.props.params.uid;
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      // if user page is same as auth user
      // redirect to home page
      if (user.uid === uid) {
        browserHistory.push('/home')
      }
    })
    getUser(uid).then(user => {
      this.setState({user: user})

    }, err => {
      console.log(err);
    })
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    if (!this.state.user) return <div>Loading...</div>;
    const name = this.state.user.firstName + ' ' + this.state.user.lastName;
    return (
      <Grid>
        <div className="h1" style={{textAlign: 'center'}}>{name}</div>
        <div style={{height: '60px', textAlign: 'center'}}>
          <Avatar uid={this.props.params.uid} />
        </div>
        <WishList uid={this.props.params.uid} />
      </Grid>
    );
  }
}

export default UserView;
