import React from 'react';
import { browserHistory } from 'react-router';
import { getUser } from '../utils/firebaseHelpers';
import { WishListContainer } from '../components/WishList';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null}
  }
  componentDidMount() {
    const uid = this.props.params.uid;
    getUser(uid).then(user => {
      this.setState({user: user})
      console.log(user)
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (!this.state.user) return <div>Loading...</div>;
    const name = this.state.user.firstName + ' ' + this.state.user.lastName;
    return (
      <div>
        <div className="h1" style={{textAlign: 'center'}}>{name}</div>
        <WishListContainer uid={this.props.params.uid} mutable={false} />
      </div>
    );
  }
}

export default UserView;
