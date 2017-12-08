import React from 'react';
import { SlideBox } from 'components/SlideBox';
import CheckAuth from 'components/CheckAuth';
import { UserHeading } from 'components/User';
import AddWishBtn from 'components/Button/AddWishBtn';
import { Grid } from 'react-bootstrap';
import { WishList } from 'components/Wish/WishList';

export default function Home(props) {
  return (
    <CheckAuth redirect>
      <HomeView {...props} />
    </CheckAuth>
  );
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
  };
  if (!props.uid) return null;
  return (
    <Grid>
      <div style={styles.heading}>
        <UserHeading user={props.user} mutable />
      </div>
      <SlideBox
        radioLeft="My Wishes"
        radioRight="Notifications"
        panelLeft={
          <div>
            <div style={styles.btn}>
              <AddWishBtn uid={props.uid} />
            </div>
            <WishList userId={props.uid} uid={props.uid} mutable />
          </div>
        }
        panelRight={
          <h2
            style={{ textAlign: 'center', marginTop: '75px', color: '#d85454' }}
          >
            Coming Soon!
          </h2>
        }
      />
    </Grid>
  );
}

HomeView.propTypes = {
  uid: React.PropTypes.node
};
