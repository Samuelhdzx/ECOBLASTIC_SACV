#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Configuración WiFi
const char* ssid = "TU_SSID_WIFI";
const char* password = "TU_PASSWORD_WIFI";

// URL del backend (ajusta según tu configuración)
const char* serverUrl = "http://tu-servidor:puerto/api/esp32/sensor-data";

// Pin del sensor de temperatura (ajusta según tu conexión)
const int tempPin = 34;  // Ejemplo: GPIO34

void setup() {
  Serial.begin(115200);
  
  // Conectar a WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Leer temperatura (ajusta según tu sensor específico)
    float temperature = readTemperature();
    
    // Crear JSON con los datos
    StaticJsonDocument<200> doc;
    doc["temperature"] = temperature;
    
    // Convertir a String
    String jsonString;
    serializeJson(doc, jsonString);
    
    // Crear cliente HTTP
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    // Enviar POST request
    int httpResponseCode = http.POST(jsonString);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("HTTP Response code: " + String(httpResponseCode));
      Serial.println(response);
    } else {
      Serial.println("Error en HTTP request");
    }
    
    http.end();
  }
  
  // Esperar antes de la siguiente lectura
  delay(5000);  // Ajusta según tus necesidades
}

float readTemperature() {
  // Implementa la lectura de tu sensor específico aquí
  // Este es solo un ejemplo, ajusta según tu sensor
  int rawValue = analogRead(tempPin);
  float voltage = rawValue * (3.3 / 4095.0);  // Para ESP32 (0-4095)
  float temperature = voltage * 100.0;  // Ajusta según tu sensor
  
  return temperature;
}
