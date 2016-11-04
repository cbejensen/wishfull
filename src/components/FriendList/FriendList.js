import React from 'react';
import { getFriends } from '../../utils/firebaseHelpers';
import { Grid, Row } from 'react-bootstrap';
import FriendItem from './FriendItem';

class FriendList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: 'Loading...'
    }
  }
  componentDidMount() {
    getFriends(this.props.uid).then(friends => {
      this.setState({
        friends: friends
      })
    })
    // const path = `users/${this.props.uid}/friends`
    // const friendsRef = firebase.database().ref(path);
    // friendsRef.on('value', snap => {
    //   this.setState({
    //     friends: snap.val(),
    //   })
    // });
  }
  render() {
    if (typeof this.state.friends === 'string') return <div style={{textAlign: 'center'}}>Loading...</div>
    if (!this.state.friends) return <div style={{textAlign: 'center'}}>You have no friends!</div>
    return (
      <Grid>
        {Object.keys(this.state.friends).map(id => {
          return (
            <Row key={id}>
              <FriendItem id={id} />
            </Row>
          )
        })}
      </Grid>
    )
  }
};

export default FriendList;
