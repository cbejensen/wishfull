import React from 'react';
import { Avatar } from './Avatar';
import ItemBox from 'components/ItemBox';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { Row, Col } from 'react-bootstrap';
import './UserHeading.css';

const UserHeading = props => {
  const styles = {
    itemBox: {
      height: props.boxHeight
        ? props.boxHeight
        : '80px',
      get fontSize() {
        return props.fontSize
          ? props.fontSize
          : (parseInt(this.height) / 3) + 'px'
      },
      maxWidth: '500px'
    },
    container: {
      position: 'relative',
      height: '100%'
    },
    avatarCol: {
      textAlign: 'center'
    },
    nameCol: {
      padding: '0'
    },
    nameWrapper: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }
  return (
    <ItemBox styles={styles.itemBox}
      handleClick={props.handleClickUser}
      colorTheme='#f88379'>
      <Row style={styles.container}>
        <Col xs={3} style={{...styles.container, ...styles.avatarCol}}>
          <Avatar uid={props.uid}/>
        </Col>
        <Col xs={9} style={{...styles.container, ...styles.nameCol}}>
          <span style={styles.nameWrapper}>{props.name}</span>
        </Col>
      </Row>
    </ItemBox>
  )
};

UserHeading.propTypes = {
  name: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired,
  height: React.PropTypes.string,
  handleClickUser: React.PropTypes.func
}

export default UserHeading;
