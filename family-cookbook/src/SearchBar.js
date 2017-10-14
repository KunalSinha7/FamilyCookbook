import React, { Component } from 'react';
import {NavLink, Switch, Route, DefaultRoute} from 'react-router-dom';

import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class SearchBar extends Component {
  state={
    recipeName:'',
    options:[],
  }

  handleSubmit=(val)=>{
    if(val!=null){
        const recipeName=val.value
        this.setState({recipeName})
        this.props.history.push(`/timeline/${recipeName}`)
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <Select
          name="Unit"
          value="one"
          options={this.state.options}
          onChange={val=>this.handleSubmit(val)}
        />
      </div>
    );
  }
}

export default SearchBar;