import React from 'react';
import FormInput from '../FormInput';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button } from 'react-bootstrap';
import { addWish, updateWish, getWish, deleteWish } from '../../utils/firebaseHelpers';
import { browserHistory, Link } from 'react-router';

class WishFormContainer extends React.Component {
  constructor(props) {
    super(props);
    // TODO: add security rules to encapsulate fulfilled
    this.state = {
      title: '',
      description: '',
      url: '',
      price: '',
      priority: 1,
      fulfilled: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.wishId) {
      getWish(this.props.uid, this.props.wishId).then(wish => {
        this.setState({
          title: wish.title,
          description: wish.description,
          url: wish.url,
          price: wish.price,
          priority: wish.priority,
          fulfilled: wish.fulfilled
        })
      }, err => {
        console.log(err)
        browserHistory.push('/home');
      })
    }
  }
  handleChange(field, e) {
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
  }
  handleDelete(e) {
    const confirmed = confirm('WARNING\nThis wish will be permanently deleted.')
    if (confirmed) deleteWish(this.props.uid, this.props.wishId);
    browserHistory.push('/home')
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.props.wishId) {
      addWish(this.state, this.props.uid).then(res => {
        browserHistory.push('/home')
      }, err => {
        alert(err)
      })
    } else {
      updateWish(this.props.uid, this.props.wishId, this.state)
      .then(res => {
        browserHistory.push('/home');
      }, err => {
        alert('There was an error processing your request. Please try again.');
      })
    }
  }
  render() {
    return <WishForm {...this.state}
      handleChange={this.handleChange}
      handleDelete={this.handleDelete}
      handleSubmit={this.handleSubmit} />
  }
};

export function WishForm(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormInput label='Title'
        value={props.title}
        onChange={props.handleChange.bind(null, 'title')}
        required />
      <FormInput label='Description'
        value={props.description}
        onChange={props.handleChange.bind(null, 'description')}
        componentClass="textarea"
        help='Describe what the product is and why you want it' />
      <FormInput label='URL'
        value={props.url}
        onChange={props.handleChange.bind(null, 'url')}
        placeholder='example.com'
        help='Copy and paste a link to props item on the web' />
      <FormInput label='Price'
        value={props.price}
        onChange={props.handleChange.bind(null, 'price')}
        help='Do not include a dollar sign' />
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <FormControl value={props.priority}
          onChange={props.handleChange.bind(null, 'priority')}
          componentClass="select"
          placeholder="select">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </FormControl>
        <HelpBlock>
          1 = I barely even want this <br />
          10 = I practically need this to survive
        </HelpBlock>
      </FormGroup>
      <Grid>
        <Row style={{textAlign: 'center'}}>
          <Col xs={12} sm={4} style={{marginBottom: '30px'}}>
            <Button bsStyle="primary" type="submit">Save</Button>
          </Col>
          <Col xs={12} sm={4} style={{marginBottom: '30px'}}>
            <Link to='/home'>
              <Button bsStyle="warning">Cancel</Button>
            </Link>
          </Col>
          <Col xs={12} sm={4} style={{marginBottom: '30px'}}>
            <Button bsStyle="danger" onClick={props.handleDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Grid>
    </form>
  )
}

export default WishFormContainer;
