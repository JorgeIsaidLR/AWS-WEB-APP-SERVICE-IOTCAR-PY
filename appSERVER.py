from flask import Flask, jsonify, request, render_template
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

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/items', methods=['POST'])
def create_item():
    try:
        data = request.json

        # Verificar si existe el encabezado 'X-Forwarded-For'
        ip_cliente = request.headers.get('X-Forwarded-For', request.remote_addr)

        connection = get_db_connection()
        with connection.cursor() as cursor:
            sql = """
                INSERT INTO IoTCarStatus (status, ip_cliente, name, id_device)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(sql, (data['status'], ip_cliente, data['name'], data['id_device']))
            connection.commit()
            return jsonify({"message": "Acción enviada correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/items', methods=['GET'])
def get_items():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM IoTCarStatus ORDER BY id DESC LIMIT 1")
            items = cursor.fetchall()
            return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/Titems', methods=['GET'])
def get_items_api():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM IoTCarStatus ORDER BY id DESC LIMIT 10")
            items = cursor.fetchall()
            return jsonify(items)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/monitor', methods=['GET'])
def get_monitor_items():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM IoTCarStatus ORDER BY id DESC")
            items = cursor.fetchall()
            return render_template('monitor.html', items=items)  # Cambiar a renderizar HTML
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

@app.route('/latest-status', methods=['GET'])
def get_latest_status():
    try:
        # Mantén la conexión abierta solo mientras sea necesario
        connection = get_db_connection()
        
        # Usar cursor para interactuar con la base de datos
        with connection.cursor() as cursor:
            # Se asume que la columna id está indexada, lo que mejora la velocidad de esta consulta
            cursor.execute("SELECT status FROM IoTCarStatus ORDER BY id DESC LIMIT 1")
            item = cursor.fetchone()  # Solo obtiene un registro

            # Si existe un resultado, devuelve el estado
            if item is not None:
                return jsonify({"status": item["status"]}), 200
            else:
                # Si no hay datos, retornar mensaje apropiado
                return jsonify({"status": None, "error": "No data found"}), 200
    except Exception as e:
        # Loguea o maneja el error de forma más detallada para mejorar la depuración
        app.logger.error(f"Error al obtener el último estado: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        # Utilizando with para cerrar la conexión automáticamente al salir del bloque
        if connection:
            connection.close()

@app.route('/device-status', methods=['POST'])
def update_device_status():
    data = request.json
    id_device = data.get('id_device')
    statusonline = data.get('statusonline', 0)  # status = 1 si está en línea, 0 si está fuera de línea

    connection = get_db_connection()
    with connection.cursor() as cursor:
        sql = """
            INSERT INTO DeviceStatus (id_device, statusonline) 
            VALUES (%s, %s) 
            ON DUPLICATE KEY UPDATE statusonline = %s, last_update = CURRENT_TIMESTAMP;
        """
        cursor.execute(sql, (id_device, statusonline, statusonline))
        connection.commit()
    connection.close()

    return jsonify({"message": "Estado de conexión actualizado correctamente"}), 200

@app.route('/Device-conected', methods=['GET'])
def get_latest_device_status():
    try:
        connection = get_db_connection()
        
        with connection.cursor() as cursor:
            # Consulta directa ya que solo hay un registro en la tabla
            cursor.execute("SELECT * FROM DeviceStatus")
            item = cursor.fetchone()  # Obtiene el único registro
            # Si existe un resultado, devuelve los datos
            if item is not None:
                return jsonify(dict(item)), 200
            else:
                return jsonify({"error": "No data found"}), 200
    except Exception as e:
        app.logger.error(f"Error al obtener el estado del dispositivo: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if connection:
            connection.close()
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
