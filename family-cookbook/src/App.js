import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import './App.css';
import SearchBar from './SearchBar.js';
import Header from './Header.js';
import MyRecipe from './MyRecipe.js';
import AllRecipe from './AllRecipe.js';

class App extends Component {
  state={
    recipes:{},
    uid:null,
  }

  isLogin=()=>{
    this.state.uid==null?`Login`:`Logout`;
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="App">
          <ul className='nav-links'>
            <li><NavLink to='/MyRecipes'>My Recipes</NavLink></li>
            <li><NavLink to='/AllRecipes'>Community Recipes</NavLink></li>
            <li><NavLink to='/'>{this.state.uid==null?`Login`:`Logout`}</NavLink></li>
          </ul>
        </div>
        <Switch>
          <Route path='/MyRecipes' component={MyRecipe}/>
          <Route path='/AllRecipes' component={AllRecipe}/>
          <Route exact path='/'/>
        </Switch>
      </div>
    );
  }
}

export default App;
