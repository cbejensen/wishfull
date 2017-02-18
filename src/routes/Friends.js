import React from 'react'
import {SlideBox} from 'components/SlideBox'
import {CheckAuth} from 'components/CheckAuth'
import {FriendList} from 'components/User'
import {Search} from 'components/Search'
import {Grid} from 'react-bootstrap'

export default function Friends(props) {
  const styles = {
    container: {
      paddingTop: '20px'
    }
  }
  return (
    <Grid style={styles.container}>
      <SlideBox
        radioLeft='My Friends'
        radioRight='Find Friends'
        panelLeft={<CheckAuth><FriendList /></CheckAuth>}
        panelRight={<Search />} />
    </Grid>
  )
}
