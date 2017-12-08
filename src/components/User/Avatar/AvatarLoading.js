import React from 'react';

const AvatarLoading = props => {
  const styles = {
    default: {
      height: props.size,
      width: props.size,
      background: '#000000',
      color: '#ffffff',
      borderRadius: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  };
  return <div style={{ ...styles.default, ...props.style }}>Loading...</div>;
};

AvatarLoading.propTypes = {
  size: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

export default AvatarLoading;
