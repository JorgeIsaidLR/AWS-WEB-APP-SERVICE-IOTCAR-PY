from flask import Flask, jsonify, request
import pymysql

app = Flask(__name__)

# Configuración de la conexión a la base de datos
def get_db_connection():
    return pymysql.connect(
        host='instancia-db-iot.cfa0mqyweqgo.us-east-1.rds.amazonaws.com',
        user='admin',
        password='Admin12345#!',
        db='db_iot',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/items', methods=['GET'])
def get_items():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM IoTCarStatus")
            items = cursor.fetchall()
            return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM IoTCarStatus WHERE id = %s", (item_id,))
            item = cursor.fetchone()
            if item:
                return jsonify(item)
            return jsonify({"error": "Elemento no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/items', methods=['POST'])
def create_item():
    try:
        new_item = request.get_json()
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO IoTCarStatus (status, ip_cliente, name, id_device)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql, (new_item['status'], new_item['ip_cliente'], new_item['name'], new_item['id_device']))
            connection.commit()
            return jsonify({"message": "Elemento creado exitosamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    try:
        updated_item = request.get_json()
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                UPDATE IoTCarStatus
                SET status = %s, ip_cliente = %s, name = %s, id_device = %s
                WHERE id = %s
            """
            cursor.execute(sql, (updated_item['status'], updated_item['ip_cliente'], updated_item['name'], updated_item['id_device'], item_id))
            connection.commit()
            return jsonify({"message": "Elemento actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = "DELETE FROM IoTCarStatus WHERE id = %s"
            cursor.execute(sql, (item_id,))
            connection.commit()
            return jsonify({"message": "Elemento eliminado exitosamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
