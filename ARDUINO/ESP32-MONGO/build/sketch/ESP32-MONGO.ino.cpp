#include <Arduino.h>
#line 1 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
/* Código basado en tutorial Youtube:
    https://www.youtube.com/watch?v=vGCJaMlH0_A&t=197s
*/

#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <time.h>


#define SOILPIN 32
#define LDRPIN 33
#define LEDGREENPIN 26
#define LEDREDPIN 27
#define SOILPOWER 4


unsigned long epochTime; //
unsigned long dataMillis = 0;

const char* ntpServer = "pool.ntp.org";
const char* serverName = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-tqmje/endpoint/emergency_calls";

const char* ssid = "HH_PHONE";
const char* password = "maranata";

StaticJsonDocument<500> doc;

#line 29 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
void setup();
#line 51 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
void loop();
#line 69 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
unsigned long getTime();
#line 78 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
void POSTData();
#line 29 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
void setup(){
	Serial.begin(115200);

  pinMode(26, OUTPUT);
  pinMode(27, OUTPUT);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED){
    Serial.println(",");
    delay(300);
  }

  Serial.println("");
  Serial.print("Connected with IP: ");
  Serial.print(WiFi.localIP());
  Serial.println("");

  configTime(0, 0, ntpServer );
  
}

void loop()
{
  if(millis() - dataMillis > 15000 || dataMillis == 0){
    dataMillis = millis();
    epochTime = getTime();
    
    // Serial.print("Epoch Time: ");
    // Serial.println(epochTime);

    doc ["data"]["epochTime"] = epochTime;

    Serial.println("Uploading data...");
    POSTData();
  }

  // Serial.print(dataMillis);
}

unsigned long getTime(){
  time_t now;
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)) return 0;

  time(&now);
  return now;  
}

void POSTData(){
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;

    http.begin(serverName);
    http.addHeader("Content-Type", "application/JSON");

    String json;
    serializeJson(doc, json);

    Serial.print(json);
    int httpResponseCode = http.POST(json);
    Serial.print(httpResponseCode);

    if(httpResponseCode == 200){
      Serial.println("Data Uploaded");
      digitalWrite(LEDGREENPIN, HIGH);
      delay(1000);
      digitalWrite(LEDGREENPIN, LOW);
    } else {
      Serial.println("Error: Couldn't upload data");
      digitalWrite(LEDREDPIN, HIGH);
      delay(1000);
      digitalWrite(LEDREDPIN, LOW);
    }
  }
}
