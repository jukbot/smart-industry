#include <TM1637Display.h>
#include <Arduino.h>
#include <Firebase.h>
#include <FirebaseArduino.h>
#include <FirebaseCloudMessaging.h>
#include <FirebaseError.h>
#include <FirebaseHttpClient.h>
#include <FirebaseObject.h>
#include <time.h>
#include <ESP8266WiFi.h>
#ifdef ESP8266
extern "C" {
#include "user_interface.h"
}
#endif

// Config wifi network
#define WIFI_SSID "Juk"
#define WIFI_PASSWORD "jukjukjuk"

// Config firebase database
#define FIREBASE_HOST "smart-mes.firebaseio.com"
#define FIREBASE_AUTH "JjOsXsD1a6USQ3wWmKUCbXw3ij5UIp7esLeomjkz"

// Config device value
const String userKey = "-KtIglRKGl4iQURKGFBn"; // userKey
const String deviceID = "-KjXc5Hfk8-vUE6NN3Fb"; // deviceID
const String deviceName = "Sensor 1";
const String deviceType = "nodeMCU esp8266";

// Config time zone
const int timezone = 7; // timezone
const int dst = 0; // day save time
const int delayCount = 0; // delayCount to push static data
const char ntp_server1[18] = "th.pool.ntp.org";
const char ntp_server2[18] = "ntp.ku.ac.th";
const char ntp_server3[18] = "time.uni.net.th";

// Initial value
int sensorCounter = 0; 
int sensorTarget = 0;
int sensorState = 0;
bool sensorEnabled;

// Config display port
const int CLK = D2; 
const int DIO = D3; 

// Initial the 4-Digit Display.
TM1637Display display(CLK, DIO);
uint8_t data[] = { 0x00, 0x00, 0x00, 0x00 };

void setup() {
  // Begin serial
  Serial.begin(115200);
  Serial.println();
  Serial.print("Booted ");
  tone(14, 1000, 500);
    
  rst_info *rsti;
  rsti = ESP.getResetInfoPtr();
  Serial.printf("RST_INFO = %lu\r\n", rsti->reason);
  Serial.print("RESET REASON => ");
  Serial.println(ESP.getResetReason());
  delay(1000);
  if (rsti->reason == REASON_DEEP_SLEEP_AWAKE) {
    ESP.reset();
  }
  // Setup Display brightness
  display.setBrightness(7, true);
  
  // Setup Pin Mode
  pinMode(0, INPUT); // IR sensor
  pinMode(12, OUTPUT); // alarm light
  pinMode(14, OUTPUT); // buzzer

  // Set Load to display
  data[0]= 0b00111000; // L
  data[1]= 0b00111111; // O
  data[2]= 0b01110111; // A
  data[3]= 0b00111111; // D
  display.setSegments(data);
  
  // Start connect to wifi.
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to wifi..");

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    display.setBrightness(7, false);  // Turn off
    display.setSegments(data);
    delay(250);
    display.setBrightness(7, true); // Turn on
    display.setSegments(data);
    delay(250);  
  }    
 
  Serial.println();
  Serial.print("Connected to: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  tone(14, 2500, 250); // Send 1KHz sound signal..
  tone(14, 1500, 250); // Send 1KHz sound signal..

  // Start connect to NTP server
  configTime(timezone * 3600, dst, ntp_server1, ntp_server2, ntp_server3);
  Serial.println("Connecting to time server..");
  while (!time(nullptr)) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();

  // Initial connecting to firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Serial.println("Connecting to firebase..");

  data[0]= 0b01110111; // R
  data[1]= 0b01111001; // E
  data[2]= 0b01110111; // A
  data[3]= 0b00111111; // D
  display.setSegments(data);
  
  // Initial sensor value to firebase
  Firebase.setString("data/" + userKey + "/factoryData/device/" + deviceID + "/name", deviceName);
  Firebase.setString("data/" + userKey + "/factoryData/device/" + deviceID + "/type", deviceType);
  Firebase.setInt("data/" + userKey + "/factoryData/device/" + deviceID + "/counter", sensorCounter);
  Firebase.setInt("data/" + userKey + "/factoryData/device/" + deviceID + "/update", TimeStamp());
  sensorEnabled = Firebase.getBool("data/" + userKey + "/factoryData/device/" + deviceID + "/enable");
  Serial.print("Sensor enable: ");
  Serial.println(sensorEnabled);

  // Set Load to display
  tone(14, 500, 3000);
  data[0]= 0b00111111; // D
  data[1]= 0b00111111; // O
  data[2]= 0b00110111; // n
  data[3]= 0b01111001; // E
  display.setSegments(data);
  delay(1000); 
  
  // Initial sensor display counter
  Serial.println("Reset counter");
  sensorCounter = 0;
  display.showNumberDec(0);
}

void loop() {
  
  sensorState = analogRead(0);
  Serial.print("Sensor read: ");
  Serial.println(sensorState);
  sensorEnabled = Firebase.getBool("data/" + userKey + "/factoryData/device/" + deviceID + "/enable");
  sensorCounter = Firebase.getInt("data/" + userKey + "/factoryData/device/" + deviceID + "/counter");
  sensorTarget = Firebase.getInt("data/" + userKey + "/factoryData/device/" + deviceID + "/target");

  if(sensorEnabled) {
    display.showNumberDec(sensorCounter);
    if(sensorState > 600) {
        sensorCounter++;
        delay(500);
        display.showNumberDec(sensorCounter);
        digitalWrite(12, HIGH);        
        UpdateSensor(sensorCounter);
        tone(14, 2000, 250);
        if(sensorCounter >= sensorTarget) {
          tone(14, 1000, 250);
          tone(14, 500, 250);
          tone(14, 1500, 250);
        }
    }
     digitalWrite(12, LOW);
  } 
  else if(sensorEnabled == 0) {
    uint8_t off[] = {0x00, 0b00111111, 0b01110001, 0b01110001};
    display.setSegments(off);
  } 
  else {
     uint8_t err[] = {0x00, 0b01111001, 0b01110111, 0b01110111};
     display.setSegments(err);
  }
}

void UpdateSensor(int count) {
    Firebase.setInt("data/" + userKey + "/factoryData/device/" + deviceID + "/counter", count);
    Firebase.setInt("data/" + userKey + "/factoryData/device/" + deviceID + "/update", TimeStamp());

    if(Firebase.failed()) {
       uint8_t err[] = {0x00, 0b01111001, 0b01110111, 0b01110111};
       display.setSegments(err);
       Serial.print("Failed to set firebase counter:");
       Serial.println(Firebase.error());
       return;
    }
}

int TimeStamp() {
  int tmpStp = (int)time(NULL);
  return tmpStp;
}

