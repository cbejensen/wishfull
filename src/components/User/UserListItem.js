import React from 'react';
import Avatar from './Avatar';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { browserHistory } from 'react-router';
import { Row, Col, Image } from 'react-bootstrap';
import './index.css';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      avatar: null
    }
  }
  componentDidMount() {
    getUser(this.props.id).then(user => {
      getFile(`images/avatars/${this.props.id}`).then(avatar => {
        const sub = 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAd4AAAAJDE0OGE3MmM5LTA3M2YtNDRkOC05YzE0LTEyNjNlZTY1MThhNg.jpg'
        const url = avatar ? avatar : sub;
        this.setState({
          user: user,
          avatar: url
        })
      })
    })
  }
  render() {
    const url = `url("${this.state.avatar}")`
    const style = {
      backgroundImage: url,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }
    if (!this.state.user) return null;
    const name = this.state.user.firstName + ' ' + this.state.user.lastName;
    return (
      <Row className="UserListItem-row" onClick={this.props.handleClickUser}>
        <Col xs={4} sm={3} className="UserListItem-img-col">
          <div style={style} className="UserListItem-img"></div>
        </Col>
        <Col xs={8} sm={9} className="UserListItem-name-col">
          <div>{name}</div>
        </Col>
      </Row>
    )
  }
};

export default UserContainer;
