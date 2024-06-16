from flask import Blueprint, request, jsonify, redirect, url_for
import requests
from CryptoFlask.database import db_connection
from CryptoFlask.models import Crypto

crypto_bp = Blueprint('crypto', __name__)

db = db_connection()


@crypto_bp.route('/cryptos', methods=['GET'])
def get_cryptos():
    cryptos = db['cryptos']
    # No incluir _id en los resultados
    crypto_list = list(cryptos.find({}, {'_id': 0}))
    return jsonify(crypto_list)


@crypto_bp.route('/cryptos', methods=['POST'])
def add_crypto():
    data = request.get_json()
    name = data.get('name')
    symbol = data.get('symbol')
    price = data.get('price')

    if name and symbol and price:
        crypto = Crypto(name, symbol, price)
        cryptos = db['cryptos']
        cryptos.insert_one(crypto.to_db_collection())
        return jsonify({'message': 'Criptomoneda agregada con éxito.'}), 201
    else:
        return jsonify({'error': 'Se deben proporcionar nombre, símbolo y precio.'}), 400


@crypto_bp.route('/fetch_cryptos', methods=['GET'])
def fetch_cryptos():
    response = requests.get('https://api.coingecko.com/api/v3/coins/markets', params={
        'vs_currency': 'usd',
        'order': 'market_cap_desc',
        'per_page': 10,
        'page': 1,
        'sparkline': False
    })

    if response.status_code == 200:
        cryptos = db['cryptos']
        data = response.json()
        for item in data:
            crypto = Crypto(item['name'], item['symbol'],
                            item['current_price'])
            cryptos.update_one(
                {'symbol': crypto.symbol},
                {'$set': crypto.to_db_collection()},
                upsert=True
            )
        return jsonify({'message': 'Datos de criptomonedas actualizados con éxito.'}), 200
    else:
        return jsonify({'message': 'Error fetching data from CoinGecko'}), 500
