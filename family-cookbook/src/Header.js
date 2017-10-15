import React, { Component } from 'react';
import './Header.css';
import my_image from './eatBlue.png'

class Header extends Component {
  render() {
    return (
      <div className='picdiv'>
        <img src={my_image} alt='Eat Your Heart Out' className='thing'/>
      </div>
    );
  }
}

export default Header;