import React, { Component } from 'react'

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
  }
}