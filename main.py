from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hola, Mundo!'

if __name__ == '__main__':
    # Escuchar en todas las interfaces de red en el puerto 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
