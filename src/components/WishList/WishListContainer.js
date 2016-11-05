import React from 'react';
import * as firebase from 'firebase';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import WishList from './WishList';
import AddWishBtn from './AddWishBtn';

class WishListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: '',
      items: 'loading'
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  componentDidMount() {
    const path = `lists/${this.props.uid}`
    const itemsRef = firebase.database().ref(path);
    itemsRef.on('value', snap => {
      this.setState({
        items: snap.val(),
      })
    });
  }
  componentWillUnmount() {
    const path = `lists/${this.props.uid}`
    const itemsRef = firebase.database().ref(path);
    itemsRef.off();
  }
  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }
  handleFilterChange(e) {
    this.setState({filter: e.target.value});
  }
  render() {
    if (this.state.items === 'loading') return (
      <div style={{textAlign: 'center'}}>Loading...</div>
    )
    if (!this.state.items) {
      const path = `users/${this.props.uid}/wish-form`;
      return (
        <div style={{textAlign: 'center'}}>
          <h3>No wishes yet!</h3>
          <button>
            <Link to={path}>Make a Wish!</Link>
          </button>
        </div>
      )
    }
    return <WishListInner {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}
      uid={this.props.uid}
      mutable={this.props.mutable} />
  }
};

export function WishListInner(props) {
  const addWishBtn = (
    <Col xs={12} style={{textAlign: 'center'}}>
      <AddWishBtn uid={props.uid} />
    </Col>
  )
  return (
    <Grid>
      <Row>
        {/* <Col xs={3} style={{textAlign: 'center'}}>
          <ListFilter value={props.filter}
            onChange={props.handleFilterChange} />
        </Col>
        <Col xs={6}>
          <ListSearch text={props.search}
            onChange={props.handleSearchChange} />
        </Col> */}
        {props.mutable ? addWishBtn : null}
      </Row>
      <Row style={{marginTop: '20px'}}>
        <WishList uid={props.uid} items={props.items} mutable={props.mutable} />
      </Row>
    </Grid>
  );
}

export default WishListContainer;