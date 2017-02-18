import React from 'react'
import {FriendList} from '../components/User'
import {CheckAuth} from 'components/CheckAuth'
import {Grid} from 'react-bootstrap'

export default function Friends(props) {
  return (
    <Grid>
      <CheckAuth>
        <FriendList />
      </CheckAuth>
    </Grid>
  )
}
