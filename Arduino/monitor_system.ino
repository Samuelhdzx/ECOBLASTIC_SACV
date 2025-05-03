#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <DHT.h>

const char* ssid     = "INFINITUM7E25_2.4";
const char* password = "JUxnP2A7Q6";

char serverAddress[] = "192.168.1.67";
int port = 1337;

WiFiClient wifi;  
HttpClient client = HttpClient(wifi, serverAddress, port);

// Configuración de sensores
#define DHTPIN A1     
#define DHTTYPE DHT22 
DHT dht(DHTPIN, DHTTYPE);

#define CURRENT_SENSOR_PIN A0  // Pin para el sensor de corriente ACS712
const int numReadings = 10;    // Número de lecturas para promediar
float currentReadings[numReadings];  // Array para almacenar lecturas
int readIndex = 0;             // Índice de lectura actual

// Pin para detectar inicio/fin de inyección
const int injectionPin = 2;
unsigned long injectionStartTime = 0;
unsigned long injectionDuration = 0;
bool debugMode = true;

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.println("Iniciando sistema de monitoreo...");

  pinMode(injectionPin, INPUT);
  pinMode(CURRENT_SENSOR_PIN, INPUT);

  // Inicializar array de lecturas
  for (int i = 0; i < numReadings; i++) {
    currentReadings[i] = 0;
  }

  // Conectar a WiFi
  Serial.print("Conectando a ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  int timeout = 0;
  while (WiFi.status() != WL_CONNECTED && timeout < 20) {
    delay(500);
    Serial.print(".");
    timeout++;
  }
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\nFallo al conectar WiFi. Reiniciando...");
    Serial.println("Por favor, reinicia manualmente si persisten los problemas");
  } else {
    Serial.println("\nWiFi conectado!");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());
  }

  dht.begin();
  Serial.println("Sensor DHT iniciado");
  Serial.println("Sistema listo para enviar datos");
}

float readCurrent() {
  // Leer y promediar múltiples lecturas para estabilidad
  float total = 0;
  
  // Descartar algunas lecturas iniciales
  for(int i = 0; i < 5; i++) {
    analogRead(CURRENT_SENSOR_PIN);
    delay(1);
  }
  
  // Tomar muestras y promediar
  for(int i = 0; i < numReadings; i++) {
    int rawValue = analogRead(CURRENT_SENSOR_PIN);
    float voltage = (rawValue * 5.0) / 1023.0;
    float current = ((voltage - 2.5) / 0.066); // Para ACS712 30A
    currentReadings[readIndex] = abs(current);
    total += currentReadings[readIndex];
    readIndex = (readIndex + 1) % numReadings;
    delay(2);
  }
  
  return total / numReadings;
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Conexión WiFi perdida. Reconectando...");
    WiFi.begin(ssid, password);
    delay(5000);
    return;
  }

  float temperature = dht.readTemperature();
  if (isnan(temperature)) {
    Serial.println("Error leyendo la temperatura");
    delay(2000);
    return;
  }
  
  // Leer corriente
  float current = readCurrent();
  
  // Verificar el estado del pin de inyección
  int injectionState = digitalRead(injectionPin);
  
  if (injectionState == HIGH && injectionStartTime == 0) {
    injectionStartTime = millis();
    Serial.println("Inyección iniciada");
  }
  
  if (injectionState == LOW && injectionStartTime != 0) {
    injectionDuration = millis() - injectionStartTime;
    Serial.print("Inyección finalizada. Duración: ");
    Serial.print(injectionDuration);
    Serial.println(" ms");
    injectionStartTime = 0;
  }

  float injectionTimeSeconds = injectionDuration / 1000.0;

  String path = "/api/temperature";
  
  // JSON actualizado para incluir la corriente
  String jsonPayload = "{\"temperature\":" + String(temperature) + 
                      ",\"injectionTime\":" + String(injectionTimeSeconds) + 
                      ",\"current\":" + String(current) + "}";
  
  if (debugMode) {
    Serial.println("\n--- ENVIANDO DATOS ---");
    Serial.print("Temperatura: ");
    Serial.print(temperature);
    Serial.println(" °C");
    Serial.print("Tiempo de inyección: ");
    Serial.print(injectionTimeSeconds);
    Serial.println(" s");
    Serial.print("Corriente: ");
    Serial.print(current);
    Serial.println(" A");
    Serial.print("URL completa: http://");
    Serial.print(serverAddress);
    Serial.print(":");
    Serial.print(port);
    Serial.println(path);
    Serial.print("JSON: ");
    Serial.println(jsonPayload);
  }
  
  client.beginRequest();
  client.post(path);
  client.sendHeader("Content-Type", "application/json");
  client.sendHeader("Content-Length", jsonPayload.length());
  client.beginBody();
  client.print(jsonPayload);
  client.endRequest();
  
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();
  
  Serial.print("Código de respuesta: ");
  Serial.println(statusCode);
  Serial.print("Respuesta: ");
  Serial.println(response);
  
  if (statusCode >= 200 && statusCode < 300) {
    Serial.println("¡Datos enviados correctamente!");
  } else {
    Serial.println("Error al enviar datos. Verificar el servidor.");
  }

  Serial.println("Esperando para la próxima lectura...");
  Serial.println("------------------------------");
  delay(3000);
}
