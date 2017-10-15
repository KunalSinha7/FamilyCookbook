import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import './AllRecipe.css';
import base,{auth} from './base'
import AddButton from './AddButton.js'

class AllRecipe extends Component {
  state={
    id:0,
    recipeName:[],
  }

  constructor(props){
    super(props);
    base.fetch('recipes',{asArray:true})//.then(stuff=>console.log(stuff))
    .then(result => this.iterateRecipes(result))
  }

  iterateRecipes=(result)=>{
    const insertionList=document.querySelector('.listOfRecipes')
    for(let i=0;i<result.length;i++){
      const bigDiv=document.createElement('div')
      bigDiv.className='listed'

      const foodName=document.createElement('h3')
      foodName.innerHTML=`${result[i].name}`
      bigDiv.appendChild(foodName)

      const r={...this.state.recipeName}
      r[this.state.id]={name:result[i].name,value:result[i].name}
      this.setState({recipeName:r})
      this.setState({id:this.state.id+1})

      const times=document.createElement('p')
      times.innerHTML=`Calories: ${result[i].calories}<br/>Total time: ${result[i].Time.total} |
                      Prep time: ${result[i].Time.prep} | Cook time: ${result[i].Time.cook}`
      bigDiv.appendChild(times)

      const ingreTitle=document.createElement('h4')
      ingreTitle.innerHTML=`Ingredients`
      bigDiv.appendChild(ingreTitle)

      const ingreList=document.createElement('ul')
      ingreList.className='ingreList'
      for(let j in result[i].ingredients){
        const tempingre=document.createElement('li')
        tempingre.innerHTML=`${result[i].ingredients[j]}`
        ingreList.appendChild(tempingre)
      }
      bigDiv.appendChild(ingreList)

      const dire=document.createElement('p')
      dire.innerHTML=`${result[i].directions}`
      bigDiv.appendChild(dire)
      bigDiv.appendChild(document.createElement('hr'))
      insertionList.appendChild(bigDiv)
    }
  }

   render() {
     console.log(this.state.recipeName)
    return (
      <div>
        <SearchBar operations={this.state.recipeName}/>
        <div className='listOfRecipes'>
        </div>
        <div className='filler'></div>
        <AddButton />
      </div>
    );
  }
}

export default AllRecipe;