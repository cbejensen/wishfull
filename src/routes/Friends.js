import React from 'react'
import {FriendList} from '../components/User'
import {CheckAuth} from 'components/CheckAuth'
import {Grid} from 'react-bootstrap'

class Friends extends React.Component {
  render() {
    return (
      <Grid>
        <CheckAuth>
          <FriendList />
        </CheckAuth>
      </Grid>
    )
  }
}

export default Friends
