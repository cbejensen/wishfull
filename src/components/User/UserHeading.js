import React from 'react';
import { Avatar } from './Avatar';
import Bio from './Bio';

class UserHeading extends React.Component {
  render() {
    const styles = {
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '20px  auto',
        ...this.props.style
      },
      name: {
        // flex: 1,
        textAlign: 'left',
        fontSize: '4rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        lineHeight: '1',
        margin: '0 0 0 30px'
      }
    };
    const name = this.props.user.firstName + ' ' + this.props.user.lastName;
    return (
      <div>
        <div style={styles.container}>
          <Avatar
            uid={this.props.user.uid}
            mutable={this.props.mutable}
            style={{margin: 'auto'}}
          />
          <h1 style={styles.name}>{name}</h1>
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
