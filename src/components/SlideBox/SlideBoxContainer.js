import React from 'react'
import SlideBox from './SlideBox'

class SlideBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {leftSelected: true}
    this.select = this.select.bind(this)
  }
  select(bool) {
    this.setState({leftSelected: bool})
  }
  render() {
    return <SlideBox
      {...this.props}
      select={this.select}
      leftSelected={this.state.leftSelected} />
  }
}

SlideBoxContainer.propTypes = {
  panelLeft: React.PropTypes.node.isRequired,
  panelRight: React.PropTypes.node.isRequired,
  radioLeft: React.PropTypes.string,
  radioRight: React.PropTypes.string
}

export default SlideBoxContainer
