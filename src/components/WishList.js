import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Button, Grid, Row, Col, Modal } from 'react-bootstrap';
import { List, ListFilter, ListSearch } from './List';
import AddItemBtn from './List/AddItemBtn';

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      search: '',
      filter: '',
      items: 'loading',
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
  addItem() {
    const path = `/${this.props.user.uid}/new-wish`
    browserHistory.push(path)
  },
  editItem(key) {
    browserHistory.push(`${this.props.uid}/edit-wish/${key}`)
  },
  render() {
    if (this.state.items === 'loading') return <div style={{textAlign: 'center'}}>Loading...</div>
    if (!this.state.items) return (
      <div style={{textAlign: 'center'}}>
        <h3>No wishes yet!</h3>
        <AddItemBtn uid={this.props.uid} text="Make a Wish!"></AddItemBtn>
      </div>
    )
    console.log('state updated')
    return <WishList {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}
      uid={this.props.uid}
      editItem={this.editItem} />
  }
});

export function WishList(props) {
  const path = `${props.uid}/new-wish`;
  // TODO: make modal function
  console.log(props.editing)
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
          <Col xs={12} style={{textAlign: 'center'}}>
            <AddItemBtn uid={props.uid} text="Add Wish" />
          </Col>
        </Row>
        <Row style={{marginTop: '20px'}}>
          <List items={props.items} editItem={props.editItem}/>
        </Row>
      </Grid>
    </span>
  );
}

export default WishListContainer;
