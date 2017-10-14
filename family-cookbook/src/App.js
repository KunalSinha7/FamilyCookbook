import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import './App.css';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import MyRecipe from './MyRecipe.js';
import AllRecipe from './AllRecipe.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="App">
          <ul className='nav-links'>
            <li><NavLink to='/MyRecipes'></NavLink></li>
            <li><NavLink to='/'></NavLink></li>
          </ul>
          
        </div>
      </div>
    );
  }
}

export default App;
