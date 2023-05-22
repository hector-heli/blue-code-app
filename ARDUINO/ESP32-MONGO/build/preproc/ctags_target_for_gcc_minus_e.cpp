# 1 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
/* Código basado en tutorial Youtube:

    https://www.youtube.com/watch?v=vGCJaMlH0_A&t=197s

*/
# 5 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
# 6 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino" 2
# 7 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino" 2
# 8 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino" 2
# 9 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino" 2
# 18 "C:\\Users\\hh_rg\\OneDrive\\Escritorio\\COSERTEC_APP\\Tutos\\ESP32-MONGO\\ESP32-MONGO.ino"
unsigned long epochTime; //
unsigned long dataMillis = 0;

const char* ntpServer = "pool.ntp.org";
const char* serverName = "https://us-east-1.aws.data.mongodb-api.com/app/application-0-tqmje/endpoint/emergency_calls";

const char* ssid = "HH_PHONE";
const char* password = "maranata";

StaticJsonDocument<500> doc;

void setup(){
 Serial.begin(115200);

  pinMode(26, 0x03);
  pinMode(27, 0x03);

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
