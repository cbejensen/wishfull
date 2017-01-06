import React from 'react';
import Avatar from './Avatar';
import { getFile } from 'utils/firebaseHelpers';

class AvatarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAd4AAAAJDE0OGE3MmM5LTA3M2YtNDRkOC05YzE0LTEyNjNlZTY1MThhNg.jpg'
    }
  }
  componentDidMount() {
    this.mounted = true;
    getFile(`images/avatars/${this.props.uid}`).then(url => {
      if (this.mounted) {
        this.setState({
          url: url
        })
      }
    }, err => {
      console.log(err)
    })
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    return <Avatar url={this.state.url}/>
  }
};

AvatarContainer.propTypes = {
  uid: React.PropTypes.string.isRequired
}

export default AvatarContainer;
