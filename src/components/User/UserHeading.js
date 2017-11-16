import React from 'react'
import {Avatar} from './Avatar'

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
    }
    const name = this.props.user.firstName + ' ' + this.props.user.lastName
    return (
      <div>
        <div style={styles.name}>{name}</div>
        <div style={styles.avatar}>
          <Avatar uid={this.props.user.uid} />
        </div>
      </div>
    )
  }
};

export default UserHeading;

// export default function UserHeading(props) {
//   console.log('userHeading reload');
//   const styles = {
//     name: {
//       textAlign: 'center',
//       fontSize: '2em'
//     },
//     avatar: {
//       height: '60px',
//       textAlign: 'center',
//       marginBottom: '10px'
//     }
//   }
//   const name = props.user.firstName + ' ' + props.user.lastName
//   return (
//     <div>
//       <div style={styles.name}>{name}</div>
//       <div style={styles.avatar}>
//         <Avatar uid={props.user.uid} />
//       </div>
//     </div>
//   )
// }

UserHeading.propTypes = {
  user: React.PropTypes.object.isRequired
}
