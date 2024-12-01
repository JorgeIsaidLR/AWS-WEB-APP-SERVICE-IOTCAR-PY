from flask import Flask, jsonify, request
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Conexión a la base de datos MySQL en AWS
def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host='instancia-db-iot.cfa0mqyweqgo.us-east-1.rds.amazonaws.com',
            port=3306,
            database='IoTCarStatus',
            user='admin',
            password='Admin12345#!'
        )
        return connection
    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

@app.route('/items', methods=['GET'])
def get_items():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "No se pudo conectar a la base de datos"}), 500
    
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM IoTCarStatus")
        rows = cursor.fetchall()
        if rows:
            return jsonify(rows), 200
        else:
            return jsonify({"message": "No hay registros en la base de datos"}), 404
    except Error as e:
        return jsonify({"error": f"Error al obtener los datos: {str(e)}"}), 500
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
