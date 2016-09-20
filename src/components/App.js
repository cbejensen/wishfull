import React from 'react';
import Header from './Header/Header'
import './App.css';

export default function App(props) {
    return (
      <div>
        <Header />
        {props.children}
      </div>
    );
}
