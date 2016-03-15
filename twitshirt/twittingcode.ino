/*
  Serial RGB LED controller
 Context: Arduino

 Controls an RGB LED whose R, G and B legs are
 connected to pins 9, 11, and 10, respectively.
 This is for a common cathode RGB LED.
 The cathode is attached to ground.

 To control it, send a string formatted like so:
 r/255/g/0/b/127
 or r255g0b127

 This was designed to be used with a REST or
 OSC-formatted command string, as shown above.

 created 19 July 2010
 modified 7 Jul 2014
 by Tom Igoe

 */
#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 8, 9, 10, 11, 12);

int fsrPin = 0; // the FSR and 10K pulldown are connected to a0
int fsrReading; // the analog reading from the FSR resistor divider
int lastMillis = 0;
 
String tweet;

void setup() {
  // initiate serial communication:
  Serial.begin(9600);
  Serial.setTimeout(10);
  // set up the LCD's number of columns and rows:
  lcd.begin(20, 4);
}

void loop() {
  fsrReading = analogRead(0);
  // if there's any serial data in the buffer, read a byte:
  if (Serial.available() > 0) {
    int inByte = Serial.read();

    lcd.setCursor(0, 0);
    

    if (inByte != '^'){
      tweet += (char)inByte;
    } else {
      change(tweet);
      tweet="";
    }  
   
  }

  if (fsrReading > 10) {
      Serial.println('1');
      }
  else {
    Serial.println('0');
  }

  if(millis() - lastMillis > 300000){
    lastMillis = millis();
    Serial.println('1');
    } 

   
}

void change(String tweet){
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print(tweet);
}


