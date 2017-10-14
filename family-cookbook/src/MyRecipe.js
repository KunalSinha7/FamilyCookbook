import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import axios from 'axios'

class MyRecipe extends Component {
  state={
    objects:{},
  }

  constructor(props){
    super(props);
    //axios.get(`http://127.0.0.1:5000/getUser/id="${this.props.uid}"`)
    axios.get(`http://127.0.0.1:5000/getUser/id="lgXy4t3EzBVntAWPkt9pb14y9ZH2"`)
    .then(function(data){
      console.log(data)
    }).then(data => this.getRecipes(data))
  }

  getRecipes=(data)=>{
    for(let i = 0;i<data.length;i++){
      axios.get(`http://127.0.0.1:5000/getRecipe/recipeId=${data[i]}`)
      .then(rec => this.addToPage(rec,i))
    }
  }

  addToPage=(data,numThings)=>{
    let item=`<div className='listed'>
                  <h3>${data.name}</h3>
                  Calories: ${data.calories} | Total time: ${data.Time.total}<br/>
                  Prep time: ${data.Time.prep} | Cook time: ${data.Time.cook}<br/>
                  <h4>Ingredients</h4>
                  <ul>
                    `;
    for(let i=0;i<data.ingredients.length;i++){
      item+=`<li>${data.ingredients[i]}</li>
      `
    }
    item+=`Directions: ${data.directions}<br/></div>`;
    
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