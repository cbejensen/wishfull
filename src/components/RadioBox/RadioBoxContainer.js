import React from 'react'
import RadioBox from './RadioBox'

class RadioBoxContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { leftSelected: true }
    this.select = this.select.bind(this)
  }
  select(bool) {
    this.setState({ leftSelected: bool })
    this.props.handleSelect(bool)
  }
  render() {
    const { handleSelect, ...props } = this.props
    return (
      <RadioBox
        {...props}
        leftSelected={this.state.leftSelected}
        select={this.select}
      />
    )
  }
}

RadioBoxContainer.propTypes = {
  handleSelect: React.PropTypes.func.isRequired,
  radioLeft: React.PropTypes.string,
  radioRight: React.PropTypes.string,
  style: React.PropTypes.object,
}

export default RadioBoxContainer
