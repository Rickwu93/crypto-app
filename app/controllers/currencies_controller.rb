class CurrenciesController < ApplicationController
  def index
  end

  # post request when users make search requests to compare lower case name vs lower case of search result
  # send back json of all the currencies to that users' search
  def search
    @currencies = Currency.where('LOWER(name) Like ?', "%#{params[:search].downcase}%")
    render json: { currencies: @currencies }
  end

  # Takes in currency id and the amount owned
  # Returns final calculations
  #pass back json for our calculate method
  def calculate
    amount = params[:amount]
    render json: {
      currency: currency,
      current_price: currency.current_price,
      amount: amount,
      value: currency.calculate_value(amount)
    }
  end

  private

  def currency
    @currency ||= Currency.find(params[:id])
  end
end