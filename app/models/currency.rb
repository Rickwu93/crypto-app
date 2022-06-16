class Currency < ApplicationRecord
  def calculate_value(amount)
    current_price.to.f * amount.to_f
  end

  def current_price
url = 'http://api.coinbase.com/v2/prices/btc-usd/spot'
request = HTTParty.get(url + self.slug)
response = JSON.parse(request.body)[0]["price_usd"]
  end
end
