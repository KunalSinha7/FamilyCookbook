import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import axios from 'axios'

class MyRecipe extends Component {
  constructor(props){
    super(props);
    //axios.get(`http://127.0.0.1:5000/getUser/id="${this.props.uid}"`)
    axios.get(`http://127.0.0.1:5000/getUser/id="lgXy4t3EzBVntAWPkt9pb14y9ZH2"`)
    .then(function(data){
      console.log(data)
    }).then(this.getRecipes())
  }

  getRecipes=()=>{

  }

   render() {
    return (
      <div>
        <SearchBar/>
      </div>
    );
  }
}

export default MyRecipe;