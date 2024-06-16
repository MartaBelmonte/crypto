class Crypto:
    def __init__(self, name, symbol, price):
        self.name = name
        self.symbol = symbol
        self.price = price

    def to_db_collection(self):
        return {
            'name': self.name,
            'symbol': self.symbol,
            'price': self.price
        }
