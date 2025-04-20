//Red privada
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// #include <WiFi.h>
// #include <ArduinoHttpClient.h>
// #include <DHT.h>

// // Datos de tu red WiFi
// const char* ssid     = "INFINITUM7E25_2.4";
// const char* password = "JUxnP2A7Q6";

// // IP o dominio del servidor y puerto
// char serverAddress[] = "192.168.1.65";  
// int port = 3000;

// // Inicializar el cliente y el objeto HttpClient
// WiFiClient wifi;  
// HttpClient client = HttpClient(wifi, serverAddress, port);

// // Configuración del DHT
// #define DHTPIN A1     
// #define DHTTYPE DHT22 
// DHT dht(DHTPIN, DHTTYPE);

// void setup() {
//   Serial.begin(9600);
//   delay(1000);

//   // Conectar a la red WiFi
//   Serial.print("Conectando a ");
//   Serial.println(ssid);
//   WiFi.begin(ssid, password);
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("\nWiFi conectado!");
//   Serial.print("IP: ");
//   Serial.println(WiFi.localIP());

//   dht.begin();
// }

// void loop() {
//   delay(2000);

//   // Leer el DHT
//   float h = dht.readHumidity();
//   float t = dht.readTemperature();

//   if (isnan(h) || isnan(t)) {
//     Serial.println("Error leyendo el DHT22");
//     return;
//   }

//   // Cálculo de índice de calor
//   float hic = dht.computeHeatIndex(t, h, false);

//   // Mostrar en Serial
//   Serial.print("Humedad: ");
//   Serial.print(h);
//   Serial.print(" %\t");
//   Serial.print("Temperatura: ");
//   Serial.print(t);
//   Serial.print(" °C\t");
//   Serial.print("Índice de calor: ");
//   Serial.print(hic);
//   Serial.println(" °C");

//   // Preparar la ruta (endpoint) para tu servidor
//   String path = "/insert";

//   // Construir el contenido (JSON)
//   String jsonPayload = String("{\"temperatura\":") + t +
//                        ",\"humedad\":" + h +
//                        ",\"indice\":" + hic + "}";

//   // Hacer la petición POST
//   Serial.println("Enviando datos al servidor...");
//   client.beginRequest();
//   client.post(path);
//   client.sendHeader("Content-Type", "application/json");
//   client.sendHeader("Content-Length", jsonPayload.length());
//   client.beginBody();
//   client.print(jsonPayload);
//   client.endRequest();

//   // Obtener respuesta del servidor
//   int statusCode = client.responseStatusCode();
//   String response = client.responseBody();

//   Serial.print("Código de respuesta: ");
//   Serial.println(statusCode);
//   Serial.print("Respuesta: ");
//   Serial.println(response);
// }



//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Red publica
// #include <DHT.h>
// #include <WiFi.h>  // Librería nativa para Arduino UNO R4 WiFi

// // Configuración del sensor DHT22 en el pin A1
// #define DHTPIN A1     // Pin donde está conectado el sensor
// #define DHTTYPE DHT22 // DHT22

// DHT dht(DHTPIN, DHTTYPE);

// // Datos de la red WiFi pública sin contraseña
// const char* ssid = "WiFi IPN"; // Reemplaza con el nombre de la red pública

// void setup() {
//   Serial.begin(9600);
//   delay(1000);
  
//   Serial.println("====================");
//   Serial.println("Prueba de sensor DHT22");
//   Serial.println("====================");

//   // Conexión a la red WiFi pública
//   Serial.print("Conectando a la red pública: ");
//   Serial.println(ssid);
  
//   WiFi.begin(ssid);
  
//   // Espera hasta conectarse a la red
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println();
//   Serial.println("Conectado a la red pública.");
//   Serial.print("Dirección IP: ");
//   Serial.println(WiFi.localIP());
  
//   // Inicializar el sensor DHT22
//   dht.begin();
// }

// void loop() {
//   // Esperar 2 segundos entre lecturas
//   delay(2000);
  
//   // Leer la humedad y la temperatura
//   float h = dht.readHumidity();
//   float t = dht.readTemperature();

//   if (isnan(h) || isnan(t)) {
//     Serial.println("Error obteniendo los datos del sensor DHT22");
//     return;
//   }

//   // Calcular el índice de calor
//   float hic = dht.computeHeatIndex(t, h, false);

//   // Mostrar los resultados en el monitor serial
//   Serial.print("Humedad: ");
//   Serial.print(h);
//   Serial.print(" %\t");
//   Serial.print("Temperatura: ");
//   Serial.print(t);
//   Serial.print(" *C\t");
//   Serial.print("Índice de calor: ");
//   Serial.print(hic);
//   Serial.println(" *C");
// }
// Solo tú
// Y tus manos calientes
// Solo tú
// Y tus labios ardientes
// Solo tú
// Y tu forma de hablar, de reír y de amar
// Solo tú
// Para andar por el tiempo
// Solo tú
// Para ser pluma o viento
// Solo tú
// Y tu forma de ser, y tu voz y tu piel

//ECOBLASTIC
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 


#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <DHT.h>

const char* ssid     = "INFINITUM7E25_2.4";
const char* password = "JUxnP2A7Q6";

// Dirección IP o nombre de dominio del servidor backend
char serverAddress[] = "192.168.1.72";  // Actualiza con la IP correcta de tu servidor
int port = 1337;  // Puerto donde se ejecuta tu backend

WiFiClient wifi;  
HttpClient client = HttpClient(wifi, serverAddress, port);

// Configuración del DHT
#define DHTPIN A1     
#define DHTTYPE DHT22 
DHT dht(DHTPIN, DHTTYPE);

// Pin para detectar inicio/fin de inyección
const int injectionPin = 2;
unsigned long injectionStartTime = 0;
unsigned long injectionDuration = 0;
bool debugMode = true;  // Activa mensajes de depuración más detallados

void setup() {
  Serial.begin(9600);
  delay(1000);
  Serial.println("Iniciando sistema de monitoreo...");

  // Configurar pin de inyección como entrada
  pinMode(injectionPin, INPUT);

  // Conectar a WiFi
  Serial.print("Conectando a ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  // Esperar a que se conecte con timeout
  int timeout = 0;
  while (WiFi.status() != WL_CONNECTED && timeout < 20) {
    delay(500);
    Serial.print(".");
    timeout++;
  }
  
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("\nFallo al conectar WiFi. Reiniciando...");
    // Para Arduino UNO R4 no usamos ESP.restart()
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

void loop() {
  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Conexión WiFi perdida. Reconectando...");
    WiFi.begin(ssid, password);
    delay(5000);
    return;
  }

  // Leer el sensor DHT
  float temperature = dht.readTemperature();
  if (isnan(temperature)) {
    Serial.println("Error leyendo la temperatura");
    delay(2000);
    return;
  }
  
  // Verificar el estado del pin de inyección
  int injectionState = digitalRead(injectionPin);
  
  // Si detecta que inicia la inyección (cambio a HIGH) y aún no se registró el inicio
  if (injectionState == HIGH && injectionStartTime == 0) {
    injectionStartTime = millis();
    Serial.println("Inyección iniciada");
  }
  
  // Si la inyección terminó (estado LOW) y ya se había registrado el inicio
  if (injectionState == LOW && injectionStartTime != 0) {
    injectionDuration = millis() - injectionStartTime;
    Serial.print("Inyección finalizada. Duración: ");
    Serial.print(injectionDuration);
    Serial.println(" ms");
    // Reiniciar para la siguiente medición
    injectionStartTime = 0;
  }

  // Convertir tiempo de inyección de ms a segundos
  float injectionTimeSeconds = injectionDuration / 1000.0;

  // Preparar el JSON para enviar al servidor
  // Usamos la ruta que está definida en app.js
  String path = "/api/temperature";
  
  // Formato JSON que coincide con el modelo Temperature
  String jsonPayload = "{\"temperature\":" + String(temperature) + 
                       ",\"injectionTime\":" + String(injectionTimeSeconds) + "}";
  
  if (debugMode) {
    Serial.println("\n--- ENVIANDO DATOS ---");
    Serial.print("Temperatura: ");
    Serial.print(temperature);
    Serial.println(" °C");
    Serial.print("Tiempo de inyección: ");
    Serial.print(injectionTimeSeconds);
    Serial.println(" s");
    Serial.print("URL completa: http://");
    Serial.print(serverAddress);
    Serial.print(":");
    Serial.print(port);
    Serial.println(path);
    Serial.print("JSON: ");
    Serial.println(jsonPayload);
  }
  
  // Realizar la solicitud HTTP
  client.beginRequest();
  client.post(path);
  client.sendHeader("Content-Type", "application/json");
  client.sendHeader("Content-Length", jsonPayload.length());
  client.beginBody();
  client.print(jsonPayload);
  client.endRequest();
  
  // Obtener y mostrar la respuesta
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

  // Esperar antes de la siguiente lectura
  Serial.println("Esperando para la próxima lectura...");
  Serial.println("------------------------------");
  delay(3000);  // 3 segundos entre lecturas
}
