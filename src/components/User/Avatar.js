import React from 'react';
import { getFile } from 'utils/firebaseHelpers';
import './Avatar.css';

class AvatarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAd4AAAAJDE0OGE3MmM5LTA3M2YtNDRkOC05YzE0LTEyNjNlZTY1MThhNg.jpg'
    }
  }
  componentDidMount() {
    getFile(`images/avatars/${this.props.uid}`).then(avatar => {
      console.log(avatar)
      this.setState({
        avatar: avatar
      })
    }, err => {
    })
  }
  render() {
    return <Avatar avatar={this.state.avatar}/>
  }
};

function Avatar(props) {
  const url = `url("${props.avatar}")`
  const style = {
    backgroundImage: url,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
  return <div style={style} className="avatar"></div>
};

export default AvatarContainer;
