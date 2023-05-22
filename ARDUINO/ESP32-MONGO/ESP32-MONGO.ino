/* Código basado en tutorial Youtube:
    https://www.youtube.com/watch?v=vGCJaMlH0_A&t=197s

    Para consultar actualización de la API:
    https://api.telegram.org/botinserta_tu_token_aqui/getUpdates

*/
#include <CTBot.h>
#include <time.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include "secret.h"

#define SOILPIN 32
#define LDRPIN 33
#define LEDGREENPIN 26
#define LEDREDPIN 27
#define SOILPOWER 4


unsigned long epochTime; //
unsigned long dataMillis = 0;

const char* ntpServer = "pool.ntp.org";
const char* serverName = SERVER_NAME;

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;

char* dummyCases[5][5] = {{ "epochTime", "red", "30", "Maria", "Maria"    },
                              { "epochTime", "yellow", "35", "Maria", "Maria" },
                              { "epochTime", "green", "20", "Ana", "Maria"},
                              { "epochTime", "blue", "120", "Andrés, María"},
                              { "epochTime", "green", "45", "Luisa", "Rebeca"}
                            };


StaticJsonDocument<500> doc;
CTBot bot;
HTTPClient http;

void setup(){
	Serial.begin(115200);

  pinMode(26, OUTPUT);
  pinMode(27, OUTPUT);

  bot.wifiConnect(ssid, password);
  Serial.println("Connecting to WiFi...");

  bot.setTelegramToken(API_TELEGRAM_BOT);

  bot.testConnection()? Serial.println("Connected"): Serial.println("not connected yet"); 

  Serial.println("");
  Serial.print("Connected with IP: ");
  Serial.print(WiFi.localIP());
  Serial.println("");

  configTime(-5, 0, ntpServer );
}

void loop(){
  if(millis() - dataMillis > 15000 || dataMillis == 0){
    dataMillis = millis();
    epochTime = getTime();
    
    // Serial.print("Epoch Time: ");
    // Serial.println(epochTime);

    // doc ["data"]["epochTime"] = epochTime;
    buildDataArray();

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

    http.begin(serverName);
    http.addHeader("Content-Type", "application/JSON");
    http.addHeader("Authorization", API_KEY);

    String json;
    serializeJson(doc, json);

    Serial.print(json);
    int httpResponseCode = http.POST(json);
    Serial.print(httpResponseCode);

    if(httpResponseCode == 200){
      Serial.println("\nData Uploaded");
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

void buildDataArray(){
  
  int azar = random(5);
  doc ["data"]["epochTime"] = epochTime;
  doc ["data"]["CallType"] = dummyCases[azar][1];
  if(azar == 3) mensajeTelegram();
  doc ["data"]["ElapsedTime"] = dummyCases[azar][2];
  doc ["data"]["DesactivedBy"] = dummyCases[azar][3];
  doc ["data"]["Responsable"] = dummyCases[azar][4];

}

void mensajeTelegram(){
  // Código para enviar un mensaje a través de Telegram
  long long int chat_id1 = CHAT_ID_1;
  long long int chat_id2 = CHAT_ID_2;

  String message = "Doctor,  Hay un codigo azul en la zona de emergencias.\n su presencia es requerida";
  bot.sendMessage(chat_id1, message);
  bot.sendMessage(chat_id2, message);

  Serial.println(message);
  delay(50);
}