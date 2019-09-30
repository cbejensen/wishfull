import React from 'react'

export default class SideScrollContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scrollY: window.scrollY
    }
  }
  componentDidMount() {
    // throttle scroll listener
    // https://developer.mozilla.org/en-US/docs/Web/Events/resize#requestAnimationFrame_customEvent
    let wait = false
    window.addEventListener('scroll', () => this.handleScroll(wait))
  }
  handleScroll = wait => {
    if (!wait) {
      wait = true
      requestAnimationFrame(() => {
        this.setState({ scrollY: window.scrollY })
        wait = false
      })
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  render() {
    return React.Children.only(this.props.children(this.state.scrollY))
  }
}
