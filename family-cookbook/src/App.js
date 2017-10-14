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

  signOut=()=>{
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
            <li><NavLink to='/'>{this.state.uid==null?`Login`:`Logout`}</NavLink></li>
          </ul>
          <Switch>
            <PropsRoute path='/MyRecipes/' component={MyRecipe} uid={this.state.uid}/>
            <PropsRoute path='/AllRecipes/' component={AllRecipe}/>
            <PropsRoute exact path='/' component={this.state.uid==null?Login:Logout}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
