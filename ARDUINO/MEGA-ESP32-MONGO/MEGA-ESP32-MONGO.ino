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
#include "tables.h"

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
  char dataMega;
  int index;
  if(Serial.available() > 0){
    
    dataMillis = millis();
    epochTime = getTime();
    dataMega = Serial.read();
    Serial.read(); // Se limpia el buffer

    for(int i=0; i < sizeof(ardMegaData); i++){
      if(ardMegaData[i] == dataMega){
        index = i;
        break;
      }
    }

    buildDataArray(index);
    Serial.println("Uploading data...");
    POSTData();
    Serial.flush();
  }

  //Serial.println("waiting...");
  delay(500);
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

    //Serial.print(json);
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

void buildDataArray(int index){
  doc ["data"]["epochTime"] = epochTime;
  doc ["data"]["Room"] = alarmCode[index][0];
  doc ["data"]["codeAlarm"] = alarmCode[index][1];
  if(std::string(alarmCode[index][1]) == "blue") mensajeTelegram(alarmCode[index][0]);
  if(std::string(alarmCode[index][1]) == "cancel"){ 
    doc ["data"]["unactivateTime"] = epochTime;
    return;
  }else{
    doc ["data"]["activateTime"] = epochTime;
  }
}

void mensajeTelegram(String room){
  // Código para enviar un mensaje a través de Telegram
  long long int chat_id1 = CHAT_ID_1;
  long long int chat_id2 = CHAT_ID_2;

  String message = "Doctor,  Hay un codigo azul en la cama de la " + room + "\n su presencia es requerida";
  bot.sendMessage(chat_id1, message);
  bot.sendMessage(chat_id2, message);

  Serial.println(message);
  delay(50);
}