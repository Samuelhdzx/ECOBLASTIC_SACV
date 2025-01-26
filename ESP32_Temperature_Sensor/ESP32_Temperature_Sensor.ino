    /*
 * ECOBLASTIC IoT Device - ESP32 con DHT11
 * 
 * Este código implementa un dispositivo IoT que:
 * 1. Se conecta a WiFi
 * 2. Establece conexión MQTT con un broker
 * 3. Lee datos de temperatura y humedad de un sensor DHT11
 * 4. Publica los datos en tiempo real
 * 5. Recibe comandos para control remoto
 */

// ============================================
// Librerías necesarias
// ============================================
#include <WiFi.h>              // Biblioteca para conexión WiFi
#include <PubSubClient.h>      // Cliente MQTT
#include <ArduinoJson.h>       // Manejo de JSON
#include <DHT.h>               // Sensor DHT11
#include <EEPROM.h>            // Almacenamiento persistente

// ============================================
// Configuración de pines y constantes
// ============================================
#define DHTPIN 27               // Pin donde está conectado el sensor DHT11
#define DHTTYPE DHT11         // Tipo de sensor DHT
#define EEPROM_SIZE 512       // Tamaño de EEPROM a usar

// ============================================
// Configuración de red
// ============================================
const char* ssid = "INFINITUM7E25_2";           // Nombre de tu red WiFi
const char* password = "JUxnP2A7Q6";    // Contraseña de tu red WiFi
const char* mqtt_server = "broker.hivemq.com";  // Dirección del servidor MQTT
const int mqtt_port = 1883;            // Puerto MQTT

// ============================================
// Variables globales
// ============================================
WiFiClient espClient;                  // Cliente WiFi
PubSubClient client(espClient);        // Cliente MQTT
DHT dht(DHTPIN, DHTTYPE);             // Objeto sensor DHT

String deviceId = "ESP32_001";         // ID único del dispositivo
float tempOffset = 0.0;                // Offset de calibración de temperatura
float humOffset = 0.0;                 // Offset de calibración de humedad
unsigned long lastMsg = 0;             // Último tiempo de envío
const long interval = 2000;            // Intervalo de envío (2 segundos)

// ============================================
// Configuración inicial
// ============================================
void setup() {
    Serial.begin(115200);              // Iniciar comunicación serial
    EEPROM.begin(EEPROM_SIZE);         // Iniciar EEPROM
    dht.begin();                       // Iniciar sensor DHT
    
    // Cargar offsets de calibración guardados
    loadCalibration();
    
    // Conectar a WiFi
    setup_wifi();
    
    // Configurar servidor MQTT
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);
}

// ============================================
// Conexión WiFi
// ============================================
void setup_wifi() {
    delay(10);
    Serial.println("Conectando a WiFi...");
    
    WiFi.begin(ssid, password);
    
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("Error: No conectado a WiFi");
        while (true) {
            delay(1000);
        }
    }
    
    Serial.println("WiFi conectado");
    Serial.println("IP: " + WiFi.localIP().toString());
}

// ============================================
// Callback MQTT - Manejo de mensajes entrantes
// ============================================
void callback(char* topic, byte* payload, unsigned int length) {
    // Convertir payload a string
    String message;
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    
    // Parsear JSON
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, message);
    
    if (error) {
        Serial.println("Error parseando JSON");
        return;
    }
    
    // Procesar comandos
    String action = doc["action"];
    if (action == "calibrate") {
        float tempCal = doc["tempOffset"] | 0.0;
        float humCal = doc["humOffset"] | 0.0;
        calibrateSensor(tempCal, humCal);
    } else if (action == "startMonitoring") {
        monitoring_enabled = true;
        Serial.println("Monitoreo activado");
    } else if (action == "stopMonitoring") {
        monitoring_enabled = false;
        Serial.println("Monitoreo desactivado");
    }
}

// ============================================
// Reconexión MQTT
// ============================================
void reconnect() {
    while (!client.connected()) {
        Serial.println("Conectando a MQTT...");
        
        if (client.connect(deviceId.c_str())) {
            Serial.println("Conectado a MQTT");
            // Suscribirse a tópico de comandos
            String cmdTopic = "ecoblastic/devices/" + deviceId + "/control";
            client.subscribe(cmdTopic.c_str());
        } else {
            Serial.print("Error MQTT, rc=");
            Serial.print(client.state());
            Serial.println(" reintentando en 5 segundos");
            delay(5000);
        }
    }
}

// ============================================
// Calibración del sensor
// ============================================
void calibrateSensor(float tempCal, float humCal) {
    tempOffset = tempCal;
    humOffset = humCal;
    
    // Guardar calibración en EEPROM
    EEPROM.writeFloat(0, tempOffset);
    EEPROM.writeFloat(4, humOffset);
    EEPROM.commit();
    
    Serial.println("Sensor calibrado");
}

// ============================================
// Cargar calibración guardada
// ============================================
void loadCalibration() {
    tempOffset = EEPROM.readFloat(0);
    humOffset = EEPROM.readFloat(4);
}

// ============================================
// Lectura y envío de datos
// ============================================
void loop() {
    if (!client.connected()) {
        Serial.println("Error: No conectado a MQTT");
        reconnect();
    }
    client.loop();
    
    unsigned long now = millis();
    if (now - lastMsg > interval) {
        lastMsg = now;
        
        // Leer sensor
        float temperature = dht.readTemperature() + tempOffset;
        float humidity = dht.readHumidity() + humOffset;
        
        // Verificar lecturas válidas
        if (isnan(temperature) || isnan(humidity)) {
            Serial.println("Error leyendo sensor DHT11!");
            return;
        }
        
        // Crear JSON con datos
        StaticJsonDocument<200> doc;
        doc["deviceId"] = deviceId;
        doc["temperature"] = temperature;
        doc["humidity"] = humidity;
        
        char jsonBuffer[200];
        serializeJson(doc, jsonBuffer);
        
        // Publicar datos
        String dataTopic = "ecoblastic/devices/" + deviceId + "/data";
        if (!client.publish(dataTopic.c_str(), jsonBuffer)) {
            Serial.println("Error publicando datos");
        } else {
            Serial.println("Datos enviados: " + String(jsonBuffer));
        }
    }
}

// ============================================
// Publicar estado del dispositivo
// ============================================
void publishStatus() {
    StaticJsonDocument<200> status;
    status["status"] = "online";
    status["deviceId"] = deviceId;
    
    String status_msg;
    serializeJson(status, status_msg);
    String statusTopic = "ecoblastic/devices/" + deviceId + "/status";
    if (!client.publish(statusTopic.c_str(), status_msg.c_str(), true)) {
        Serial.println("Error publicando estado");
    }
}

// ============================================
// Publicar datos del sensor
// ============================================
void publishSensorData() {
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    
    // Verificar si la lectura fue exitosa
    if (isnan(temperature) || isnan(humidity)) {
        Serial.println("Error leyendo sensor DHT11");
        return;
    }

    // Crear objeto JSON con los datos
    StaticJsonDocument<200> doc;
    doc["deviceId"] = deviceId;
    doc["temperature"] = temperature;
    doc["humidity"] = humidity;
    
    String output;
    serializeJson(doc, output);
    
    // Publicar datos via MQTT
    String dataTopic = "ecoblastic/devices/" + deviceId + "/data";
    if (!client.publish(dataTopic.c_str(), output.c_str())) {
        Serial.println("Error publicando datos");
    } else {
        Serial.println("Datos publicados: " + output);
    }
}

// ============================================
// Variables de estado
// ============================================
bool monitoring_enabled = true;                  // Control de monitoreo
unsigned long last_reading = 0;                  // Último tiempo de lectura
const long reading_interval = 5000;              // Intervalo de lectura (5 segundos)
