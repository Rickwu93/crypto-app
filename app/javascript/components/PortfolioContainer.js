import React, { Component } from 'react';
import Search from './Search';
import Calculate from './Calculate';
import Portfolio from './Portfolio';
import axios from 'axios';

class PortfolioContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			portfolio: [],
			search_result: [],
			active_currency: null,
			amount: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleAmount = this.handleAmount.bind(this);
	}
	//when input field changes, it modifies our state
	handleChange(e) {
		axios
			.post('http://localhost:3000/search', {
				search: e.target.value,
			})
			.then(data => {
				console.log(data);
				this.setState({
					search_results: [...data.data.currencies],
				});
			})
			.catch(data => {
				debugger;
			});
	}

	handleSelect(e) {
		e.preventDefault();
		const id = e.target.getAttribute('data-id');
		//filter to check if the item id is equal to selected items id
		const activeCurrency = this.state.search_results.filter(
			item => item.id == parseInt(id)
		);
		this.setState({
			active_currency: activeCurrency[0],
			search_results: [],
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		let currency = this.state.active_currency;
		let amount = this.state.amount;
		axios
			.post('http://localhost:3000/calculate', {
				id: currency.id,
				amount: amount,
			})
			.then(data => {
				this.setState({
					amount: '',
					active_currency: null,
					portfolio: [...this.state.portfolio, data.data],
				});
			})
			.catch(data => {
				debugger;
			});
	}

	handleAmount(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	render() {
		//if we have an active currency we show calculate form otherwise show search form
		const searchOrCalculate = this.state.active_currency ? (
			<Calculate
				handleChange={this.handleAmount}
				handleSubmit={this.handleSubmit}
				activeCurrency={this.state.active_currency}
				amount={this.state.amount}
			/>
		) : (
			<Search
				handleSelect={this.handleSelect}
				searchResults={this.state.search_results}
				handleChange={this.handleChange}
			/>
		);

		return (
			<div className="grid">
				<div className="left">{searchOrCalculate}</div>
				<div className="right">
					<Portfolio portfolio={this.state.portfolio} />
				</div>
			</div>
		);
	}
}

export default PortfolioContainer;
