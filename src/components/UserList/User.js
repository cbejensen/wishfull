import React from 'react';
import { getUser } from '../../utils/firebaseHelpers';
import { Link } from 'react-router';
import { Row, Col, Image } from 'react-bootstrap';
import './index.css';

class UserContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  componentDidMount() {
    getUser(this.props.id).then(user => {
      this.setState({
        user: user
      })
    })
  }
  render() {
    if (!this.state.user) return null;
    const name = this.state.user.firstName + ' ' + this.state.user.lastName;
    const path = `users/${this.props.id}`
    return (
      <Row className="User-row">
        <Link to={path}>
          {/* <Col xs={4} sm={3} className="User-col">
            <div className="User-img-container">
              <Image src="http://placehold.it/75x75"
                className="User-img"
                circle />
            </div>
          </Col>
          <Col xs={8} sm={9} className="User-col">
            <div className="User-name-container">
              <span className="User-name">{name}</span>
            </div>
          </Col> */}
          <Col xs={12}>
            <Image src="http://placehold.it/75x75"
              className="User-img"
              circle />
            <span className="User-name">{name}</span>
          </Col>
        </Link>
      </Row>
    )
  }
};

export default UserContainer;
