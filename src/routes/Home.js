import React from 'react';
import UserHeading from 'components/User/UserHeading';
import { AvatarForm } from 'components/User/AvatarForm';
import { CheckAuth } from '../components/CheckAuth';
import { Grid, Nav, NavItem } from 'react-bootstrap';
import { WishList } from '../components/WishList/WishList';

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  handleTabSelect(e) {
    this.setState({
      activeTab: e
    })
  }
  render() {
    return (
      <CheckAuth>
        <Home user={this.props.user}
          activeTab={this.state.activeTab}
          handleTabSelect={this.handleTabSelect}/>
      </CheckAuth>
    )
  }
};

const Home = props => {
  const name = props.user.firstName + ' ' + props.user.lastName;
  let activeComponent;
  if (props.activeTab === 1) {
    activeComponent = (
      <WishList uid={props.user.uid} mutable={true} />
    )
  } else {
    activeComponent = (
      <AvatarForm user={props.user} />
    )
  }
  return (
    <Grid>
      <UserHeading uid={props.user.uid}
        name={name} />
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
