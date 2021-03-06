import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import {browserHistory} from 'react-router'

class TextLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showUnderline: false
    }
    this.signUp = this.signUp.bind(this)
    this.growUnderline = this.growUnderline.bind(this)
    this.shrinkUnderline = this.shrinkUnderline.bind(this)
  }
  signUp() {
    browserHistory.push(this.props.link)
  }
  growUnderline() {
    this.setState({showUnderline: true})
  }
  shrinkUnderline() {
    this.setState({showUnderline: false})
  }
  render() {
    const styles = {
      text: {
        padding: '0 15px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: this.props.fontSize,
        color: this.props.color || 'inherit'
      },
      underline: {
        height: '1px',
        margin: 'auto',
        width: this.state.showUnderline
          ? '100%'
          : '0%',
        backgroundColor: this.props.color || '#000000',
        transition: '.5s'
      },
      arrow: {
        fontSize: '.7em'
      }
    }
    return (
      <span style={styles.text}
        onMouseEnter={this.growUnderline}
        onMouseLeave={this.shrinkUnderline}
        onClick={this.signUp}>
        {this.props.text}{' '}
          <span style={styles.arrow}>
            <Glyphicon glyph='menu-right'/>
          </span>
        <div style={styles.underline}></div>
      </span>
    )
  }
}

TextLink.propTypes = {
  text: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  fontSize: React.PropTypes.string
}

export default TextLink
