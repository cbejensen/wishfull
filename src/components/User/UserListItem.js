import React from 'react';
import Avatar from './Avatar';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { Row, Col } from 'react-bootstrap';
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
      this.setState({
        user: user
      })
      getFile(`images/avatars/${this.props.id}`).then(avatar => {
        this.setState({
          avatar: avatar
        })
      }, err => {
        this.setState({
          avatar: 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAd4AAAAJDE0OGE3MmM5LTA3M2YtNDRkOC05YzE0LTEyNjNlZTY1MThhNg.jpg'
        })
      })
    })
  }
  render() {
    if (!this.state.user) return null;
    const name = this.state.user.firstName + ' ' + this.state.user.lastName;
    return (
      <Row className="UserListItem-row" onClick={this.props.handleClickUser}>
        <Col xs={4} sm={3} className="UserListItem-img-col">
          <Avatar avatar={this.state.avatar} />
        </Col>
        <Col xs={8} sm={9} className="UserListItem-name-col">
          <div>{name}</div>
        </Col>
      </Row>
    )
  }
};

export default UserContainer;
