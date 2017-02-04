import React from 'react'
import ItemBox from 'components/ItemBox'
import ImageTextBlock from 'components/ImageTextBlock'
import { Avatar } from './Avatar'
import UserBoxSubtitle from './UserBoxSubtitle'
import { Row, Col } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import randomColor from 'randomcolor'

export default function UserBox(props) {
  const styles = {
    itemBox: {
      height: props.boxHeight
        ? props.boxHeight
        : '80px',
      get fontSize() {
        return props.fontSize
          ? props.fontSize
          : (parseInt(this.height, 10) / 3) + 'px'
      },
      maxWidth: '500px'
    },
    name: {
      color: props.nameColor ? props.nameColor : '#434343',
      whiteSpace: 'pre',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  }
  const goToUser = () => {
    const path = `/users/${props.uid}`
    browserHistory.push(path)
  }
  const handleClick = props.handleClick ? props.handleClick : goToUser
  return (
    <ItemBox style={styles.itemBox}
      handleClick={handleClick}
      colorTheme={randomColor({luminosity: 'light'})}>
      <ImageTextBlock img={<Avatar uid={props.uid}/>} style={{height: '100%'}}>
        <div style={styles.name}>{props.name}</div>
        <UserBoxSubtitle uid={props.uid} />
      </ImageTextBlock>
    </ItemBox>
  )
}

UserBox.propTypes = {
  name: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired,
  height: React.PropTypes.string,
  nameColor: React.PropTypes.string,
  handleClick: React.PropTypes.func
}
