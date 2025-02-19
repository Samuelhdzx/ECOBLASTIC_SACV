#include <DHT.h>
#include <WiFiS3.h>

// Configuración del sensor DHT22
#define DHTPIN A0
#define DHTTYPE DHT22

// Credenciales WiFi
const char* ssid = "INFINITUM7E25_2.4";     // Reemplaza con el nombre de tu red WiFi
const char* password = "JUxnP2A7Q6";  // Reemplaza con tu contraseña WiFi

// URL del backend para enviar datos
const char* serverName = "http://192.168.1.100:5173/api/data_sensors";  // Reemplaza con la URL de tu backend

// Crear objeto para el DHT
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Iniciar comunicación Serial para debug
  Serial.begin(9600);
  while (!Serial) {
    ; // Esperar a que el puerto serial se conecte
  }
  
  Serial.println("\n=========================");
  Serial.println("   Iniciando Arduino...");
  Serial.println("=========================\n");

  // Iniciar sensor DHT
  Serial.println("Iniciando sensor DHT...");
  dht.begin();
  
  // Verificar el módulo WiFi
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("⚠️  ¡Error! No se encuentra el módulo WiFi.");
    while (true);
  }

  // Conectar a WiFi
  Serial.print("Conectando a WiFi: ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\n✅ WiFi conectado con éxito.");
}

void loop() {
  // Leer temperatura y humedad
  float temperatura = dht.readTemperature();
  float humedad = dht.readHumidity();

  // Mostrar los datos en la consola Serial
  Serial.println("\n-----------------------------------");
  Serial.println("📊  Datos del sensor DHT22:");
  
  if (!isnan(temperatura) && !isnan(humedad)) {
    Serial.print("🌡️  Temperatura: ");
    Serial.print(temperatura);
    Serial.println("°C");

    Serial.print("💧  Humedad: ");
    Serial.print(humedad);
    Serial.println("%");

    // Enviar datos al servidor
    WiFiClient client;
    if (client.connect(serverName, 80)) {
      String postData = "temperature=" + String(temperatura) + "&humidity=" + String(humedad);
      client.println("POST /api/data_sensors HTTP/1.1");
      client.println("Host: 192.168.1.100");
      client.println("Content-Type: application/x-www-form-urlencoded");
      client.print("Content-Length: ");
      client.println(postData.length());
      client.println();
      client.print(postData);

      while (client.connected()) {
        String line = client.readStringUntil('\n');
        if (line == "\r") {
          break;
        }
      }
      client.stop();
      Serial.println("Datos enviados al servidor.");
    } else {
      Serial.println("Error al conectar con el servidor.");
    }
  } else {
    Serial.println("⚠️  Error leyendo el sensor DHT22.");
  }
  
  Serial.println("-----------------------------------");

  // Esperar 2 segundos antes de la siguiente lectura
  delay(2000);
}