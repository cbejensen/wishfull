import React from 'react';
import { Avatar } from './Avatar';
import Bio from './Bio';

class UserHeading extends React.Component {
  render() {
    const styles = {
      name: {
        textAlign: 'center',
        fontSize: '2em'
      },
      avatar: {
        height: '60px',
        textAlign: 'center',
        marginBottom: '10px'
      }
    };
    const name = this.props.user.firstName + ' ' + this.props.user.lastName;
    return (
      <div>
        <div style={styles.name}>{name}</div>
        <div style={styles.avatar}>
          <Avatar uid={this.props.user.uid} />
        </div>
        {this.props.mutable && <Bio uid={this.props.user.uid} />}
      </div>
    );
  }
}

UserHeading.propTypes = {
  user: React.PropTypes.object.isRequired,
  mutable: React.PropTypes.bool
};

export default UserHeading;
