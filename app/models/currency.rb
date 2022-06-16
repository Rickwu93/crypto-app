class Currency < ApplicationRecord
  def calculate_value(amount)
    # current crypto price * quantity
    (current_price.to.f * amount.to_f).round(4)
  end

  def current_price
# api no longer working
url = 'http://api.coinbase.com/v2/prices/btc-usd/spot'
request = HTTParty.get(url + self.slug)
response = JSON.parse(request.body)[0]["price_usd"]
  end
end
