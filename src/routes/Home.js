import React from 'react';
import { CheckAuth } from '../components/CheckAuth';
import { UserItem } from '../components/User';
import { browserHistory } from 'react-router';
import { Grid, Row, Col, Nav, NavItem, Button } from 'react-bootstrap';
import { WishList } from '../components/WishList/WishList';
import { getFile, uploadFile } from '../utils/firebaseHelpers';
import * as firebase from 'firebase';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
      loading: false
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleAvatarSelect = this.handleAvatarSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTabSelect(e) {
    this.setState({
      activeTab: e
    })
  }
  handleAvatarSelect(e) {
    var img = e.target.files[0]
    this.setState({
      pendingAvatar: img
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.pendingAvatar) {
      this.setState({loading: 'Loading...'})
      const file = this.state.pendingAvatar;
      const path = `images/avatars/${this.props.user.uid}`;
      uploadFile(file, path).then(res => {
        alert('Success!');
        getFile(`images/avatars/${this.props.user.uid}`).then(avatar => {
          this.setState({
            avatar: avatar,
            loading: false
          })
        })
      }, err => {
        alert('There was an error. Please try again.')
        console.log(err)
      })
    } else {
      alert('Please choose a picture first')
    }
  }
  render() {
    return (
      <CheckAuth>
        <Home user={this.props.user}
          activeTab={this.state.activeTab}
          handleTabSelect={e => {this.handleTabSelect.bind(null, e)}}/>
      </CheckAuth>
    )
  }
};

const Home = props => {
  const style = {
    textAlign: 'center',
    paddingTop: '10px'
  }
  if (!props.user) return null;
  let activeComponent;
  if (props.activeTab === 1) {
    activeComponent = (
      <WishList uid={props.user.uid} mutable={true} />
    )
  } else {
    activeComponent = (
      <form onSubmit={props.handleSubmit} style={style}>
        <input type="file" onChange={props.handleAvatarSelect} />
        <Button bsStyle="primary" type="submit"
          style={{margin: '20px'}}>Submit</Button>
        {props.loading && props.loading}
        <UserItem id={props.user.uid}/>
        Refresh page after submitting new avatar.
      </form>
    )
  }
  return (
    <Grid>
      <Nav bsStyle="tabs" activeKey={props.activeTab}
        onSelect={props.handleTabSelect} justified >
        <NavItem eventKey={1}>My Wish List</NavItem>
        <NavItem eventKey={2}>Change Avatar</NavItem>
      </Nav>
      {activeComponent}
    </Grid>
  );
}

export default HomeContainer;
