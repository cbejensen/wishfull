import React from 'react'
import FormInput from '../FormInput'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col, Button } from 'react-bootstrap'
import { addWish, updateWish, getWish, deleteWish } from '../../utils/firebaseHelpers'
import { browserHistory, Link } from 'react-router'
import {validateWish,
        validatePrice as validatePriceHelper,
        validateUrl as validateUrlHelper
        } from 'utils/validationHelpers'

class WishFormContainer extends React.Component {
  constructor(props) {
    super(props)
    // TODO: add security rules to encapsulate fulfilled
    this.state = {
      title: '',
      description: '',
      url: '',
      price: '',
      priority: 5
    }
    this.handleChange = this.handleChange.bind(this)
    this.validateUrl = this.validateUrl.bind(this)
    this.validatePrice = this.validatePrice.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.wishId) {
      getWish(this.props.uid, this.props.wishId).then(wish => {
        this.setState({
          title: wish.title,
          description: wish.description,
          url: wish.url,
          price: wish.price.toString(),
          priority: wish.priority.toString()
        })
      }, err => {
        browserHistory.push('/home')
      })
    }
  }
  handleChange(field, e) {
    const newState = {}
    newState[field] = e.target.value
    this.setState(newState)
  }
  validateUrl() {
    let url = this.state.url
    if (url === '') return null
    let verified = validateUrlHelper(url)
    return verified ? 'success' : 'error'
  }
  validatePrice() {
    let price = this.state.price
    if (price === '') {
      return null
    } else {
      let verified = validatePriceHelper(price)
      return verified ? 'success' : 'error'
    }
  }
  handleDelete(e) {
    const confirmed = confirm('WARNING\nThis wish will be permanently deleted.')
    if (confirmed) deleteWish(this.props.uid, this.props.wishId)
    browserHistory.push('/home')
  }
  handleSubmit(e) {
    e.preventDefault()
    let wish = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      price: this.state.price,
      priority: this.state.priority
    }
    if (wish.price) wish.price = parseInt(wish.price.replace(/,/g, ''), 10)
    wish.priority = parseInt(wish.priority, 10)
    validateWish(wish).then(res => {
      const onSuccess = res => browserHistory.push('/home')
      const onError = err => alert('There was an error processing your request. Please try again.')
      if (!this.props.wishId) {
        addWish(wish, this.props.uid).then(onSuccess, onError)
      } else {
        updateWish(this.props.uid, this.props.wishId, wish).then(onSuccess, onError)
      }
    }, err => {
      alert(err)
    })
  }
  render() {
    return <WishForm {...this.state}
      handleChange={this.handleChange}
      validateUrl={this.validateUrl}
      validatePrice={this.validatePrice}
      handleDelete={this.handleDelete}
      handleSubmit={this.handleSubmit} />
  }
}

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
        getValidation={props.validateUrl()}
        placeholder='example.com'
        help='Copy and paste a link to this item on the web' />
      <FormInput label='Price'
        value={props.price}
        onChange={props.handleChange.bind(null, 'price')}
        getValidation={props.validatePrice()}
        help='Only whole numbers' />
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <FormControl value={props.priority}
          onChange={props.handleChange.bind(null, 'priority')}
          componentClass="select"
          placeholder="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
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

export default WishFormContainer
