import React from 'react';

const alignment = {
  textAlign: 'center',
  marginTop: '100px'
}

const sub1 = {
  color: 'green'
}

const sub2 = {
  color: 'red'
}

export default function Main(props) {
  return (
    <div style={alignment}>
      <span className='h1'>Welcome!</span> <br />
      <span style={sub1}>Please sign in to start making wishes, or simply view all curent wish lists by clicking on 'All Wish Lists'.</span> <br />
      <span style={sub2}>And remember - 'tis better to give than to receive!</span>
    </div>
  )
};
