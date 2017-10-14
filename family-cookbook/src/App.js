import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom';
import './App.css';

import Header from './Header.js';
import MyRecipe from './MyRecipe.js';
import AllRecipe from './AllRecipe.js';
import Login from './Login.js';
import Logout from './Logout';
import base,{auth} from './base';
import {PropsRoute} from 'react-router-with-props'

class App extends Component {
  state={
    recipes:{},
    uid:null,
  }

  addRecipe=()=>{
    const recipes={...this.state.recipes}
    const recipe={
      id:`recipe-${Date.now()}`,
      name:'',
      ingredients:[],
      directions:'',
      calories:'',
      Time:[],
    }
    recipes[recipe.id]=recipe;
    this.setState({recipes})
  }

  componentWillMount(){
    auth.onAuthStateChanged(
      (user)=>{
        if(user){
          this.authHandler({user})
        }
      }
    )
  }

  authHandler=(authData)=>{
    this.setState({uid:authData.user.uid})
  }

  logout=()=>{
    auth.signOut().then(()=>this.setState({uid:null})).then(alert('Success!'))
  }

  render(){
    return(
      <div>
        <Header/>
        <div className="App">
          <ul className='nav-links'>
            <li><NavLink to={'/MyRecipes/'}>My Recipes</NavLink></li>
            <li><NavLink to={'/AllRecipes/'}>Community Recipes</NavLink></li>
          </ul>
          <Switch>
            <PropsRoute path='/MyRecipes/' component={MyRecipe} uid={this.state.uid}/>
            <PropsRoute path='/AllRecipes/' component={AllRecipe}/>
            <PropsRoute exact path='/' component={Login} authHandler={this.authHandler} logout={this.logout}/>
          </Switch>
        </div>
        <Logout logout={this.logout} uid={this.state.uid?1:0}/>
      </div>
    )
  }
}

export default App;
