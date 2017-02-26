import React from 'react'
import SlideBox from './SlideBox'

class SlideBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {leftSelected: true}
    this.slide = this.slide.bind(this)
  }
  slide(bool) {
    this.setState({leftSelected: bool})
    this.props.handleSlide && this.props.handleSlide(bool)
  }
  render() {
    return <SlideBox
      {...this.props}
      slide={this.slide}
      leftSelected={this.state.leftSelected} />
  }
}

SlideBoxContainer.propTypes = {
  panelLeft: React.PropTypes.node.isRequired,
  panelRight: React.PropTypes.node.isRequired,
  radioLeft: React.PropTypes.string,
  radioRight: React.PropTypes.string,
  handleSlide: React.PropTypes.func
}

export default SlideBoxContainer
