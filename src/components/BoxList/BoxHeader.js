import React from 'react'

class BoxHeader extends React.PureComponent {
  render() {
    const { children, setHeader, ...rest } = this.props
    const numChildren = React.Children.count(children)
    if (!numChildren) {
      throw Error(`Expected 1 child. Showing ${numChildren}`)
    }
    return (
      <div ref={header => setHeader(header)} {...rest}>
        {children}
      </div>
    )
  }
}

BoxHeader.propTypes = {
  setHeader: React.PropTypes.func
}

export default BoxHeader
