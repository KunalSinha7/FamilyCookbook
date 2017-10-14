import React, { Component } from 'react';
import './Header.css';
import imag from './whiteTitle.png';

class Header extends Component {
  render() {
    return (
      <div className='picdiv'>
        <img src='./whiteTitle.png' alt='Family Cookbook' className='thing'/>
      </div>
    );
  }
}

export default Header;