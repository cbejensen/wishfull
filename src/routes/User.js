import React from 'react';
import ToggleFriendButton from 'components/ToggleFriendButton';
import { browserHistory } from 'react-router';
import { Grid } from 'react-bootstrap';
import { getUser } from 'utils/firebaseHelpers';
import { UserHeading } from 'components/User';
import { WishList } from 'components/Wish/WishList';
import * as firebase from 'firebase';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      user: null
    };
    this.loadUser = this.loadUser.bind(this);
  }
  componentDidMount() {
    const uid = this.props.params.uid;
    this.removeAuthListener = firebase
      .auth()
      .onAuthStateChanged(authUser => {
        // if user page is same as auth user
        // redirect to home page
        if (authUser.uid === uid) {
          browserHistory.push('/home');
        } else {
          this.setState({ uid: authUser.uid });
        }
      });
    this.loadUser(uid);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.uid !== nextProps.params.uid) {
      this.loadUser(nextProps.params.uid);
    }
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  loadUser(uid) {
    getUser(uid).then(
      user => {
        this.setState({ user: user });
      },
      err => {
        console.log(err);
      }
    );
  }
  render() {
    if (!this.state.user) return <div>Loading...</div>;
    return (
      <Grid>
        <UserHeading user={this.state.user} />
        {this.state.uid && (
          <ToggleFriendButton
            uid={this.state.uid}
            friendId={this.state.user.uid}
          />
        )}
        <WishList
          uid={this.state.user.uid}
          showFulfilled={this.state.uid ? true : false}
        />
      </Grid>
    );
  }
}

export default UserView;
