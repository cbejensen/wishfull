import React from 'react';
import * as firebase from 'firebase';
import { Grid, Row, Col } from 'react-bootstrap';
import WishList from './WishList';
import AddWishBtn from './AddWishBtn';

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      search: '',
      filter: '',
      items: 'loading'
    }
  },
  componentDidMount() {
    const path = `lists/${this.props.uid}`
    const itemsRef = firebase.database().ref(path);
    itemsRef.on('value', snap => {
      this.setState({
        items: snap.val(),
      })
    });
  },
  handleSearchChange(e) {
    this.setState({search: e.target.value});
  },
  handleFilterChange(e) {
    this.setState({filter: e.target.value});
  },
  render() {
    if (this.state.items === 'loading') return (
      <div style={{textAlign: 'center'}}>Loading...</div>
    )
    // if (!this.state.items) return (
    //   <div style={{textAlign: 'center'}}>
    //     <h3>No wishes yet!</h3>
    //     <AddItemBtn uid={this.props.uid} text="Make a Wish!"></AddItemBtn>
    //   </div>
    // )

    return <WishListInner {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}
      uid={this.props.uid}
      mutable={this.props.mutable} />
  }
});

export function WishListInner(props) {
  console.log(props)
  const addWishBtn = (
    <Col xs={12} style={{textAlign: 'center'}}>
      <AddWishBtn uid={props.uid} />
    </Col>
  )
  return (
    <span>
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
          <WishList items={props.items} mutable={props.mutable} />
        </Row>
      </Grid>
    </span>
  );
}

export default WishListContainer;
