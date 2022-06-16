import React, { Component } from 'react'
import Search from './Search'
import Calculate from './Calculate'
import axios from 'axios'

class PortfolioContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      portfolio: [],
      search_result: [],
      active_currency: null,
      amount: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  //when input field changes, it modifies our state
  handleChange(e){
    axios.post('http://localhost:3000/search', {
      search: e.target.value
    })
    .then((data) => {
        this.setState({
      search_results: [...data.data.currencies]
    })
    
    })
    .catch( (data) => {
      debugger
    })
    console.log(this.state.name)
  }

    handleSelect(e){
      e.preventDefault()
    }

  render(){
    return(
      <div>
      <Search handleSelect={this.handleSelect} searchResults={this.state.search_results} handleChange={this.handleChange}/>
      <Calculate/>
      </div>
    )
  }
}

export default PortfolioContainer