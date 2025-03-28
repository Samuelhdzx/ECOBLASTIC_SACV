//Red privada
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// #include <DHT.h>
// #include <WiFi.h>  // Librería nativa para Arduino UNO R4 WiFi

// // Configuración del sensor DHT22 en el pin A1
// #define DHTPIN A1     // Pin donde está conectado el sensor
// #define DHTTYPE DHT22 // DHT22

// DHT dht(DHTPIN, DHTTYPE);

// // Datos de la red WiFi privada
// const char* ssid     = "INFINITUM";      // Reemplaza con el nombre de tu red
// const char* password = "JUxnP2A7Q6";  // Reemplaza con la contraseña de tu red

// void setup() {
//   Serial.begin(9600);
//   delay(1000);
  
//   Serial.println("====================");
//   Serial.println("Prueba de sensor DHT22");
//   Serial.println("====================");

//   // Conexión a la red WiFi privada
//   Serial.print("Conectando a ");
//   Serial.println(ssid);
  
//   WiFi.begin(ssid, password);
  
//   // Espera hasta conectarse a la red
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println();
//   Serial.println("Conectado a la red privada.");
//   Serial.print("Dirección IP: ");
//   Serial.println(WiFi.localIP());
  
//   // Inicializar el sensor DHT22
//   dht.begin();
  
//   // Prueba de lectura del sensor (sin enviar datos a ningún servidor)
//   Serial.println("Realizando prueba de conexión con el sensor...");
//   for (int i = 0; i < 5; i++) {
//     Serial.print("Intento ");
//     Serial.print(i + 1);
//     Serial.print(": ");
    
//     float h = dht.readHumidity();
//     float t = dht.readTemperature();
    
//     if (isnan(h) || isnan(t)) {
//       Serial.println("Fallo al leer del sensor");
//     } else {
//       Serial.print("H: ");
//       Serial.print(h);
//       Serial.print("%  T: ");
//       Serial.print(t);
//       Serial.println("°C");
//     }
//     delay(2000);
//   }
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
  
//   // Nota: En este código no se envían datos a ningún servidor.
// }


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Red publica
#include <DHT.h>
#include <WiFi.h>  // Librería nativa para Arduino UNO R4 WiFi

// Configuración del sensor DHT22 en el pin A1
#define DHTPIN A1     // Pin donde está conectado el sensor
#define DHTTYPE DHT22 // DHT22

DHT dht(DHTPIN, DHTTYPE);

// Datos de la red WiFi pública sin contraseña
const char* ssid = "WiFi IPN"; // Reemplaza con el nombre de la red pública

void setup() {
  Serial.begin(9600);
  delay(1000);
  
  Serial.println("====================");
  Serial.println("Prueba de sensor DHT22");
  Serial.println("====================");

  // Conexión a la red WiFi pública
  Serial.print("Conectando a la red pública: ");
  Serial.println(ssid);
  
  WiFi.begin(ssid);
  
  // Espera hasta conectarse a la red
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Conectado a la red pública.");
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());
  
  // Inicializar el sensor DHT22
  dht.begin();
}

void loop() {
  // Esperar 2 segundos entre lecturas
  delay(2000);
  
  // Leer la humedad y la temperatura
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Error obteniendo los datos del sensor DHT22");
    return;
  }

  // Calcular el índice de calor
  float hic = dht.computeHeatIndex(t, h, false);

  // Mostrar los resultados en el monitor serial
  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.print(" *C\t");
  Serial.print("Índice de calor: ");
  Serial.print(hic);
  Serial.println(" *C");
}