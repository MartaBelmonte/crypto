from flask import Flask, render_template, request, redirect, url_for, jsonify
import database as dbase
from routes import crypto_bp

app = Flask(__name__)

# Registrar blueprints
app.register_blueprint(crypto_bp)


@app.route('/')
def home():
    return render_template('index.html')


@app.errorhandler(404)
def not_found(error=None):
    message = {
        'message': 'No encontrado ' + request.url,
        'status': '404 Not Found'
    }
    response = jsonify(message)
    response.status_code = 404
    return response


if __name__ == '__main__':
    app.run(debug=True, port=4000)
