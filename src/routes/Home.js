import React from 'react'
import {SlideBox} from 'components/SlideBox'
import {CheckAuth} from 'components/CheckAuth'
import {UserHeading} from 'components/User'
import AddWishBtn from 'components/Button/AddWishBtn'
import {AvatarForm} from 'components/User/AvatarForm'
import {Grid} from 'react-bootstrap'
import {WishList} from 'components/Wish'

export default function Home(props) {
  return (
    <CheckAuth>
      <HomeView {...props} />
    </CheckAuth>
  )
}

function HomeView(props) {
  const styles = {
    heading: {
      paddingTop: '10px'
    },
    btn: {
      padding: '10px',
      textAlign: 'center'
    }
  }
  if (!props.uid) return null;
  return (
    <Grid>
      <div style={styles.heading}>
        <UserHeading user={props.user} />
      </div>
      <SlideBox
        radioLeft='My Wishes'
        radioRight='My Avatar'
        panelLeft={
          <div>
            <div style={styles.btn}>
              <AddWishBtn uid={props.uid}/>
            </div>
            <WishList uid={props.uid} mutable />
          </div>
        }
        panelRight={
          <AvatarForm uid={props.uid} />
        }
      />
    </Grid>
  )
}

HomeView.propTypes = {
  uid: React.PropTypes.node.isRequired
}
