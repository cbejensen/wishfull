import React from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class Bio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bio: null, dirty: false };
  }
  componentDidMount() {
    this.path = `users/${this.props.uid}/bio`;
    this.firebaseListener = firebase.database().ref(this.path);
    this.firebaseListener.on('value', snap => {
      this.setState({ bio: snap.val() });
    });
  }
  componentWillUnmount() {
    this.firebaseListener.off();
  }
  handleChange = e => {
    this.setState({ bio: e.target.value, dirty: true });
  };
  handleSave = e => {
    firebase
      .database()
      .ref(this.path)
      .set(this.state.bio)
      .then(res => {
        this.setState({ dirty: false });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    const styles = {
      container: {
        textAlign: 'center'
      },
      bio: {
        width: '300px',
        maxWidth: '100%',
        resize: 'vertical',
        padding: '10px'
      },
      btn: {
        display: 'block',
        margin: 'auto'
      },
      msg: {
        visibility: this.state.dirty ? 'visible' : 'hidden',
        color: '#c20404'
      }
    };
    return (
      <div style={styles.container}>
        <textarea
          onChange={this.handleChange}
          value={this.state.bio || ''}
          style={styles.bio}
        />
        <Button bsStyle="success" onClick={this.handleSave} style={styles.btn}>
          Save Bio
        </Button>
        <div style={styles.msg}>Unsaved changes</div>
      </div>
    );
  }
}

Bio.propTypes = {
  uid: React.PropTypes.node.isRequired
};

export default Bio;
