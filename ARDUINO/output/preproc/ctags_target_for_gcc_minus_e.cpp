# 1 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino"
/* Código basado en tutorial Youtube:

    https://www.youtube.com/watch?v=vGCJaMlH0_A&t=197s



    Para consultar actualización de la API:

    https://api.telegram.org/botinserta_tu_token_aqui/getUpdates



*/
# 8 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino"
# 9 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino" 2
# 10 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino" 2
# 11 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino" 2
# 12 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino" 2

# 14 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino" 2
# 15 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino" 2
# 23 "D:\\app-prototype\\blue-code-app\\ARDUINO\\MEGA-ESP32-MONGO\\MEGA-ESP32-MONGO.ino"
unsigned long epochTime; //
unsigned long dataMillis = 0;

const char* ntpServer = "pool.ntp.org";
const char* serverName = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-tqmje/endpoint/calls";

const char* ssid = "HH_PHONE";
const char* password = "maranata";

StaticJsonDocument<500> doc;
CTBot bot;
HTTPClient http;

void setup(){
 Serial.begin(115200);

  pinMode(26, 0x03);
  pinMode(27, 0x03);

  bot.wifiConnect(ssid, password);
  Serial.println("Connecting to WiFi...");

  bot.setTelegramToken("6160796395:AAG6y9d7x0dFVsJ9W9ixqAxxeNsszm5Idp4");

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
    http.addHeader("Authorization", "Api-Key 1odWshFJJwy71HJlgI64fFRpGa9DNgUmhgWNcA6DDDLdLVk8b9R5Pz53LbFxKTp0");

    String json;
    serializeJson(doc, json);

    //Serial.print(json);
    int httpResponseCode = http.POST(json);
    Serial.print(httpResponseCode);

    if(httpResponseCode == 200){
      Serial.println("\nData Uploaded");
      digitalWrite(26, 0x1);
      delay(1000);
      digitalWrite(26, 0x0);
    } else {
      Serial.println("Error: Couldn't upload data");
      digitalWrite(27, 0x1);
      delay(1000);
      digitalWrite(27, 0x0);
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
  long long int chat_id1 = 5496351450;
  long long int chat_id2 = 5881324885;

  String message = "Doctor,  Hay un codigo azul en la cama de la " + room + "\n su presencia es requerida";
  bot.sendMessage(chat_id1, message);
  bot.sendMessage(chat_id2, message);

  Serial.println(message);
  delay(50);
}
