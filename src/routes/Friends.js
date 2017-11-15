import React from 'react';
import { SlideBox } from 'components/SlideBox';
import CheckAuth from 'components/CheckAuth';
import { FriendList } from 'components/User';
import { Search } from 'components/Search';
import { Grid } from 'react-bootstrap';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { leftSelected: true };
    this.handleSlide = this.handleSlide.bind(this);
  }
  handleSlide(bool) {
    this.setState({ leftSelected: bool });
  }
  render() {
    return (
      <Grid style={{ paddingTop: '20px' }}>
        <SlideBox
          radioLeft="My Friends"
          radioRight="Find Friends"
          handleSlide={this.handleSlide}
          panelLeft={
            <CheckAuth redirect>
              <FriendList focusInput />
            </CheckAuth>
          }
          panelRight={
            <CheckAuth redirect>
              <Search placeHolder="See who's on Wishfull" excludeFriends excludeWishes />
            </CheckAuth>
          }
        />
      </Grid>
    );
  }
}

export default Friends;
