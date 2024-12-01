import tkinter as tk
import requests
from tkinter import ttk, messagebox
import socket
import datetime

# Función para obtener la fecha actual con segundos
def obtener_fecha_actual():
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# Función para obtener la IP del dispositivo
def obtener_ip_cliente():
    hostname = socket.gethostname()
    ip_cliente = socket.gethostbyname(hostname)
    return ip_cliente

# Función para enviar datos a la API en tu servidor
def enviar_accion(accion):
    # Genera los datos a enviar
    data = {
        "status": accion,
        "date": obtener_fecha_actual(),
        "ip_cliente": obtener_ip_cliente(),
        "name": "Nombre del Usuario",  # Cambiar si es necesario
        "id_device": "Device ID del IoT"  # Cambiar si es necesario
    }

    try:
        # URL del servidor Flask en AWS
        url = "http://54.210.66.9:80/items"
        response = requests.post(url, json=data)

        # Verificar si el POST fue exitoso
        if response.status_code == 201:
            messagebox.showinfo("Éxito", f"Acción '{accion}' enviada correctamente")
            obtener_ultimos_registros()  # Actualiza los registros después de enviar una acción
        else:
            messagebox.showerror("Error", f"Error {response.status_code}: No se pudo enviar la acción")
    except Exception as e:
        messagebox.showerror("Error", f"Hubo un problema: {e}")

# Función para obtener los últimos 10 registros de la API
def obtener_ultimos_registros():
    try:
        # URL del servidor Flask para obtener los últimos registros
        url = "http://54.210.66.9:80/items"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            ultimos_registros = data[-10:]  # Obtiene los últimos 10 registros
            mostrar_registros(ultimos_registros)
        else:
            messagebox.showerror("Error", f"No se pudieron obtener los registros (Código {response.status_code})")
    except Exception as e:
        messagebox.showerror("Error", f"Hubo un problema al obtener los registros: {e}")

    # Actualizar automáticamente cada 10 segundos
    # root.after(10000, obtener_ultimos_registros)

# Función para mostrar los registros en la interfaz
def mostrar_registros(registros):
    registros_text.config(state=tk.NORMAL)  # Habilita el widget Text
    registros_text.delete(1.0, tk.END)  # Limpia el widget Text antes de mostrar los nuevos registros
    for registro in registros:
        registros_text.insert(tk.END, f"ID: {registro['id']}, Status: {registro['status']}, "
                                      f"Date: {registro['date']}, IP: {registro['ip_cliente']}\n")
    registros_text.config(state=tk.DISABLED)  # Deshabilita el widget Text para evitar que el usuario edite

# Crear la ventana principal
root = tk.Tk()
root.title("Control de Movimiento")
root.geometry("600x700")
root.configure(bg="#f5f5f5")

# Estilo profesional usando ttk
style = ttk.Style()
style.configure('TButton', font=('Helvetica', 12), padding=10)
style.configure('TLabel', font=('Helvetica', 12))

# Marco principal para organizar los widgets
main_frame = ttk.Frame(root, padding=20)
main_frame.pack(expand=True, fill="both")

# LabelFrame para las acciones de control de movimiento
frame_acciones = ttk.LabelFrame(main_frame, text="Acciones de Control", padding=10)
frame_acciones.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")

# Botones para cada acción
botones_acciones = [
    ("Adelante", "mover_adelante"),
    ("Atrás", "mover_atras"),
    ("Vuelta a la derecha", "vuelta_derecha"),
    ("Vuelta a la izquierda", "vuelta_izquierda"),
    ("Giro 90° derecha", "giro_90_derecha"),
    ("Giro 90° izquierda", "giro_90_izquierda"),
    ("Detenerse", "detener"),
    ("Giro 360° derecha", "giro_360_derecha"),
    ("Giro 360° izquierda", "giro_360_izquierda")
]

# Crear y colocar los botones en un grid en el frame de acciones
for i, (texto, accion) in enumerate(botones_acciones):
    boton = ttk.Button(frame_acciones, text=texto, command=lambda a=accion: enviar_accion(a))
    boton.grid(row=i//3, column=i%3, padx=5, pady=5, sticky="nsew")

# LabelFrame para mostrar los registros de la API
frame_registros = ttk.LabelFrame(main_frame, text="Últimos 10 Registros", padding=10)
frame_registros.grid(row=1, column=0, padx=10, pady=10, sticky="nsew")

# Crear un widget Text para mostrar los registros
registros_text = tk.Text(frame_registros, height=10, width=70, state=tk.DISABLED, bg="#eaeaea", font=('Helvetica', 10))
registros_text.pack(pady=10, padx=10)

# Configuración de expansión de los widgets en la ventana
main_frame.columnconfigure(0, weight=1)
main_frame.rowconfigure(1, weight=1)

# Iniciar la función para obtener los últimos registros
obtener_ultimos_registros()

# Mantener la ventana abierta
root.mainloop()
