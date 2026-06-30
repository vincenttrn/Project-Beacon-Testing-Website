import './Resources.css'
import { useState, useEffect } from 'react'
import AlternativeFooter from '../Footer/AlternativeFooter.jsx'

import LockIcon from '@mui/icons-material/Lock'
import DownloadIcon from '@mui/icons-material/Download'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import SchoolIcon from '@mui/icons-material/School'
import SEO from '../SEO/SEO.jsx'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const schoolAccessCodes = {
  BCH2026: {
    schoolName: 'Bethany College',
    displayName: 'Bethany College students'
  },
  BEACON2025: {
    schoolName: 'Project Beacon',
    displayName: 'Project Beacon students'
  }
}

/*
  Replace these placeholder code strings with your full Arduino code.
  Keep the same structure: title, description, code.
*/
const templates = [
  {
    title: 'Movement Code',
    fileURL: '/alarm-bot-workshop-code/movement_code.ino',
    fileName: 'movement_code.ino',
    description: 'Basic Movement Code Template',
    code: `/**
  * REQUIRED LIBRARIES
  */
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>     // Adafruit GFX Library by Adafruit
#include <Adafruit_SH110X.h>  // Adafruit SH110X by Adafruit
#include <Servo.h>            // Servo by Michael Margolis


/**
  * PIN DEFINITIONS
  */
#define ENCODER_BTN 7
#define SERVO_L_PIN 9
#define SERVO_R_PIN 10

#define L_STOP 0
#define R_STOP 0


/**
  * DISPLAY CONFIGURATION
  */
#define SCREEN_WIDTH  128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);


/**
  * SERVO CONFIGURATION
  */
Servo leftMotorServo;
Servo rightMotorServo;


/**
  * PROGRAM VARIABLES
  */
bool testRunning = false;

int moveCurrentStep = 0;
int moveLineCounter = 0;

bool moveWaiting = false;
unsigned long moveWaitStartMs = 0;

bool lastBtn = HIGH;
bool btnArmed = true;
unsigned long lastBtnChangeMs = 0;


/**
  * FUNCTION DECLARATIONS
  */

/* Student Movement Program */
void studentMotorTest(void);

/* Motor Control */
void setLeftMotor(int speed);
void setRightMotor(int speed);
void stopMotors(void);

/* Movement Sequencer */
void resetMoveSequence(void);
void beginMoveSequence(void);
void endMoveSequence(void);

void moveLeftMotorCmd(int speed);
void moveRightMotorCmd(int speed);
void moveWaitCmd(unsigned long durationMs);

/* User Interface */
void drawCenteredText(const char *line1, const char *line2 = "");
void drawUI(void);
void handleButton(void);


/**
 * STUDENT MOVEMENT MACROS
 */
#define leftMotor(x)  moveLeftMotorCmd(x)
#define rightMotor(x) moveRightMotorCmd(x)
#define wait(sec)     moveWaitCmd((unsigned long)((sec) * 1000))


/**
 * STUDENT MOVEMENT CODE
 */
void studentMotorTest(void)
{
  beginMoveSequence();

  /** =====================================================
    * ============ STUDENT MOVEMENT CODE START ============
    * ===================================================== */


  /* Example: Back and Forth Movement (remove the slashes // underneath) */
  // leftMotor(50);
  // rightMotor(50);
  // wait(10);
  // leftMotor(10);
  // rightMotor(40);
  // wait(2);


  /* Example: Big Circle Movement (remove the slashes // underneath) */
  // leftMotor(20);
  // rightMotor(50);


  /** =====================================================
    * ============= STUDENT MOVEMENT CODE END =============
    * ===================================================== */

  endMoveSequence();
}

/* Undefine student movement macros */
#undef leftMotor
#undef rightMotor
#undef wait


/**
 * FUNCTION DEFINITIONS
 */

/* Motor Functions */
void setLeftMotor(int speed)
{
  speed = constrain(speed, -90, 90);
  leftMotorServo.write(90 + speed);
}

void setRightMotor(int speed)
{
  speed = constrain(speed, -90, 90);
  rightMotorServo.write(90 - speed);
}

void stopMotors(void)
{
  setLeftMotor(L_STOP);
  setRightMotor(R_STOP);
}

/* Movement Sequence Functions */
void resetMoveSequence(void)
{
  moveCurrentStep = 0;
  moveLineCounter = 0;
  moveWaiting = false;
  moveWaitStartMs = 0;
}

void beginMoveSequence(void)
{
  moveLineCounter = 0;
}

void endMoveSequence(void)
{
  if (moveLineCounter <= moveCurrentStep)
  {
    moveCurrentStep = 0;
    moveWaiting = false;
    stopMotors();
  }
}

void moveLeftMotorCmd(int speed)
{
  if (moveLineCounter == moveCurrentStep)
  {
    setLeftMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveRightMotorCmd(int speed)
{
  if (moveLineCounter == moveCurrentStep)
  {
    setRightMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveWaitCmd(unsigned long durationMs)
{
  if (moveLineCounter == moveCurrentStep)
  {
    if (!moveWaiting)
    {
      moveWaitStartMs = millis();
      moveWaiting = true;
    }
    else if (millis() - moveWaitStartMs >= durationMs)
    {
      moveWaiting = false;
      moveCurrentStep++;
    }
  }
  moveLineCounter++;
}

/* Display Functions */
void drawCenteredText(const char *line1, const char *line2)
{
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setTextSize(1);

  int16_t x1, y1;
  uint16_t w, h;

  display.getTextBounds(line1, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - (int)w) / 2, 20);
  display.print(line1);

  if (line2[0] != (char)0)
  {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 40);
    display.print(line2);
  }

  display.display();
}

void drawUI(void)
{
  if (testRunning)
  {
    drawCenteredText("Motor Test Running", "Press to stop");
  }
  else
  {
    drawCenteredText("Press knob to start");
  }
}

/* Button Functions */
void handleButton(void)
{
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn)
  {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > 30)
  {
    if (btn == LOW && btnArmed)
    {
      if (!testRunning)
      {
        resetMoveSequence();
        testRunning = true;
      }
      else
      {
        testRunning = false;
        resetMoveSequence();
        stopMotors();
      }
      btnArmed = false;
    }

    if (btn == HIGH)
    {
      btnArmed = true;
    }
  }
}


/**
  * SETUP
  */
void setup()
{
  pinMode(ENCODER_BTN, INPUT_PULLUP);

  leftMotorServo.attach(SERVO_L_PIN);
  rightMotorServo.attach(SERVO_R_PIN);

  stopMotors();

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
}

/**
  * MAIN LOOP
  */
void loop()
{
  handleButton();

  if (testRunning)
  {
    studentMotorTest();
  }

  drawUI();
}
`
  },
  {
    title: 'Alarm Code',
    fileURL: '/alarm-bot-workshop-code/alarm_code.ino',
    fileName: 'alarm_code.ino',
    description: 'Basic Alarm Code Template',
    code: `/**
  * REQUIRED LIBRARIES
  */
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>     // Adafruit GFX Library by Adafruit
#include <Adafruit_SH110X.h>  // Adafruit SH110X by Adafruit


/**
  * PIN DEFINITIONS
  */
#define ENCODER_BTN 7
#define BUZZER_PIN  8


/**
  * DISPLAY CONFIGURATION
  */
#define SCREEN_WIDTH  128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);


/**
  * PROGRAM VARIABLES
  */
bool testRunning = false;

bool lastBtn = HIGH;
bool btnArmed = true;

unsigned long lastBtnChangeMs = 0;
const unsigned long debounceMs = 30;

int soundCurrentStep = 0;
int soundLineCounter = 0;

bool soundWaiting = false;
unsigned long soundWaitStartMs = 0;

bool toneActive = false;
unsigned long toneStartMs = 0;


/**
  * FUNCTION DECLARATIONS
  */

/* Student Alarm Program */
void studentAlarmSound(void);

/* Sound Sequence */
void resetSoundSequence(void);
void beginSoundSequence(void);
void endSoundSequence(void);

void soundWaitCmd(unsigned long durationMs);
void soundPlayToneCmd(int pitch, unsigned long durationMs);

/* User Interface */
void drawCenteredText(const char *line1, const char *line2 = "", const char *line3 = "");

void drawUI(void);
void handleButton(void);


/**
  * STUDENT ALARM MACROS
  */
#define playTone(p, sec) soundPlayToneCmd(p, (unsigned long)((sec) * 1000))
#define wait(sec)        soundWaitCmd((unsigned long)((sec) * 1000))


/**
  * STUDENT ALARM CODE
  */
void studentAlarmSound(void)
{
  beginSoundSequence();

  /** =====================================================
    * ============== STUDENT ALARM CODE START =============
    * ===================================================== */


  /* Example: Happy Birthday Alarm (remove the slashes // underneath) */
  // playTone(528, 0.25); wait(0.05);
  // playTone(528, 0.25); wait(0.05);
  // playTone(594, 0.50); wait(0.05);
  // playTone(528, 0.50); wait(0.05);
  // playTone(704, 0.50); wait(0.05);
  // playTone(660, 1.00); wait(0.20);


  /* Example: Hogwarts Alarm (remove the slashes // underneath) */
  // playTone(494, 0.35); wait(0.05);
  // playTone(659, 0.50); wait(0.05);
  // playTone(784, 0.25); wait(0.05);
  // playTone(740, 0.25); wait(0.05);
  // playTone(659, 0.50); wait(0.10);

  // playTone(988, 0.35); wait(0.05);
  // playTone(880, 0.75); wait(0.10);
  // playTone(740, 0.75); wait(0.15);

  // playTone(659, 0.35); wait(0.05);
  // playTone(784, 0.25); wait(0.05);
  // playTone(740, 0.25); wait(0.05);
  // playTone(622, 0.50); wait(0.10);

  // playTone(698, 0.35); wait(0.05);
  // playTone(494, 0.75); wait(0.30);


  /* Example: Mission Impossible Alarm (remove the slashes // underneath) */
  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(932, 0.15); wait(0.05);
  // playTone(1047, 0.15); wait(0.10);

  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(699, 0.15); wait(0.05);
  // playTone(740, 0.15); wait(0.15);

  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(932, 0.15); wait(0.05);
  // playTone(1047, 0.15); wait(0.10);

  // playTone(784, 0.15); wait(0.05);
  // playTone(784, 0.15); wait(0.05);
  // playTone(699, 0.15); wait(0.05);
  // playTone(740, 0.30); wait(0.25);


  /** =====================================================
    * =============== STUDENT ALARM CODE END ==============
    * ===================================================== */

  endSoundSequence();
}

/* Undefine student alarm macros */
#undef playTone
#undef wait


/**
  * FUNCTION DEFINITIONS
  */

/* Sound Sequence Functions */
void resetSoundSequence(void)
{
  soundCurrentStep = 0;
  soundLineCounter = 0;

  soundWaiting = false;
  soundWaitStartMs = 0;

  toneActive = false;
  toneStartMs = 0;

  noTone(BUZZER_PIN);
}

void beginSoundSequence(void)
{
  soundLineCounter = 0;
}

void endSoundSequence(void)
{
  if (soundLineCounter <= soundCurrentStep)
  {
    soundCurrentStep = 0;
    soundWaiting = false;

    toneActive = false;
    noTone(BUZZER_PIN);
  }
}

void soundWaitCmd(unsigned long durationMs)
{
  if (soundLineCounter == soundCurrentStep)
  {
    if (!soundWaiting)
    {
      noTone(BUZZER_PIN);

      soundWaitStartMs = millis();
      soundWaiting = true;
    }
    else if (millis() - soundWaitStartMs >= durationMs)
    {
      soundWaiting = false;
      soundCurrentStep++;
    }
  }

  soundLineCounter++;
}

void soundPlayToneCmd(int pitch, unsigned long durationMs)
{
  if (soundLineCounter == soundCurrentStep)
  {
    if (!toneActive)
    {
      tone(BUZZER_PIN, pitch);

      toneStartMs = millis();
      toneActive = true;
    }
    else if (millis() - toneStartMs >= durationMs)
    {
      noTone(BUZZER_PIN);

      toneActive = false;
      soundCurrentStep++;
    }
  }

  soundLineCounter++;
}


/* Display Functions */
void drawCenteredText(const char *line1, const char *line2, const char *line3)
{
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setTextSize(1);

  int16_t x1, y1;
  uint16_t w, h;

  display.getTextBounds(line1, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - (int)w) / 2, 16);
  display.print(line1);

  if (line2[0] != (char)0)
  {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 32);
    display.print(line2);
  }

  if (line3[0] != (char)0)
  {
    display.getTextBounds(line3, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 48);
    display.print(line3);
  }

  display.display();
}

void drawUI(void)
{
  if (testRunning)
  {
    drawCenteredText("Alarm Test Running", "Press knob to stop");
  }
  else
  {
    drawCenteredText("Press knob to start", "alarm sound test");
  }
}


/* Button Functions */
void handleButton(void)
{
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn)
  {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > debounceMs)
  {
    if (btn == LOW && btnArmed)
    {
      if (!testRunning)
      {
        resetSoundSequence();
        testRunning = true;
      }
      else
      {
        testRunning = false;
        resetSoundSequence();
      }

      btnArmed = false;
    }

    if (btn == HIGH)
    {
      btnArmed = true;
    }
  }
}


/**
  * SETUP
  */
void setup()
{
  pinMode(ENCODER_BTN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);

  noTone(BUZZER_PIN);

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
}


/**
  * MAIN LOOP
  */
void loop()
{
  handleButton();

  if (testRunning)
  {
    studentAlarmSound();
  }

  drawUI();
}
`
  },
  {
    title: 'Overall Code',
    fileURL: '/alarm-bot-workshop-code/overall_code.ino',
    fileName: 'overall_code.ino',
    description: 'Overall Code Template',
    code: `/**
  * REQUIRED LIBRARIES
  */
#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>               // Adafruit GFX Library by Adafruit
#include <Adafruit_SH110X.h>            // Adafruit SH110X by Adafruit
#include <RTClib.h>                     // RTCLib by NeiroN
#include <Fonts/FreeSansBold12pt7b.h>
#include <Servo.h>                      // Servo by Michael Margolis


/**
  * PIN DEFINITIONS
  */
#define ENCODER_A   5
#define ENCODER_B   6
#define ENCODER_BTN 7
#define BUZZER_PIN  8
#define SERVO_L_PIN 9
#define SERVO_R_PIN 10

#define RTC_CE  4
#define RTC_SCK 2
#define RTC_IO  3


/**
  * DISPLAY CONFIGURATION
  */
#define SCREEN_WIDTH  128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);


/**
  * RTC CONFIGURATION
  */
DS1302 rtc(RTC_CE, RTC_SCK, RTC_IO);


/**
  * SERVO CONFIGURATION
  */
Servo leftMotorServo;
Servo rightMotorServo;

#define L_STOP 90
#define R_STOP 90


/**
  * PROGRAM VARIABLES
  */

/* Alarm State */
bool alarmEnabled = false;
bool alarmEnabledPending = false;

int alarmH = 7;
int alarmM = 0;

bool alarmRinging = false;
bool alarmLatchedThisMinute = false;

/* UI Timing */
unsigned long lastUiMs = 0;
const unsigned long uiPeriodMs = 120;

/* Button State */
bool lastBtn = HIGH;
bool btnArmed = true;
unsigned long lastBtnChangeMs = 0;
const unsigned long debounceMs = 30;

/* Encoder State */
const int8_t QDEC[16] = {
   0, -1,  1,  0,
   1,  0,  0, -1,
  -1,  0,  0,  1,
   0,  1, -1,  0
};

uint8_t oldAB = 0;
int accum = 0;
const int STEPS_PER_DETENT = 4;

/* Battery Monitoring */
const float BAT_V_FULL  = 5.60;
const float BAT_V_EMPTY = 4.40;
float vccFilt = 5.0f;

/* UI Mode */
enum Mode { MODE_TIME, MODE_ALARM_TOGGLE, MODE_ALARM_H, MODE_ALARM_M };
Mode mode = MODE_TIME;

/* Movement Sequencer */
int moveCurrentStep = 0;
int moveLineCounter = 0;
bool moveWaiting = false;
unsigned long moveWaitStartMs = 0;

/* Sound Sequencer */
int soundCurrentStep = 0;
int soundLineCounter = 0;
bool soundWaiting = false;
unsigned long soundWaitStartMs = 0;
bool toneActive = false;
unsigned long toneStartMs = 0;


/**
  * FUNCTION DECLARATIONS
  */

/* Student Alarm Programs */
void alarmMove(void);
void alarmSound(void);

/* Motor Control */
void setLeftMotor(int speed);
void setRightMotor(int speed);

/* Movement Sequencer */
void resetMoveSequence(void);
void beginMoveSequence(void);
void endMoveSequence(void);
void moveLeftMotorCmd(int speed);
void moveRightMotorCmd(int speed);
void moveWaitCmd(unsigned long durationMs);

/* Sound Sequencer */
void resetSoundSequence(void);
void beginSoundSequence(void);
void endSoundSequence(void);
void soundWaitCmd(unsigned long durationMs);
void soundPlayToneCmd(int pitch, unsigned long durationMs);

/* Alarm Control */
void resetAlarmSequence(void);
void alarmStart(void);
void alarmStop(void);

/* Encoder */
void readEncoder(void);
void applyDelta(int d);

/* Battery */
long readVcc_mV(void);
float readVccFiltered(void);
int batteryPctFromV(float v);

/* User Interface */
void drawBatteryIcon(int percent);
void drawUI(const DateTime &now);
void drawCenteredText(const char *line1, const char *line2 = "", const char *line3 = "");

/* Button */
void handleButton(void);

/* Alarm Logic */
void updateAlarmState(const DateTime &now);

/* Utilities */
int wrap(int v, int lo, int hi);
int clampi(int v, int lo, int hi);


/**
  * STUDENT MOVEMENT MACROS
  */
#define leftMotor(x)  moveLeftMotorCmd(x)
#define rightMotor(x) moveRightMotorCmd(x)
#define wait(sec)     moveWaitCmd((unsigned long)((sec) * 1000))


/**
  * STUDENT MOVEMENT CODE
  */
void alarmMove(void)
{
  beginMoveSequence();

  /** =====================================================
    * =========== STUDENT MOVEMENT CODE START =============
    * ===================================================== */

  // Example:
  // leftMotor(50);
  // rightMotor(50);
  // wait(2);

  /** =====================================================
    * ============ STUDENT MOVEMENT CODE END ==============
    * ===================================================== */

  endMoveSequence();
}

/* Undefine student movement macros */
#undef leftMotor
#undef rightMotor
#undef wait


/**
  * STUDENT ALARM MACROS
  */
#define playTone(p, sec) soundPlayToneCmd(p, (unsigned long)((sec) * 1000))
#define wait(sec)        soundWaitCmd((unsigned long)((sec) * 1000))


/**
  * STUDENT ALARM CODE
  */
void alarmSound(void)
{
  beginSoundSequence();

  /** =====================================================
    * ============ STUDENT ALARM CODE START ===============
    * ===================================================== */

  // Example:
  // playTone(1000, 0.5);
  // wait(0.25);
  // playTone(1500, 0.5);

  /** =====================================================
    * ============= STUDENT ALARM CODE END ================
    * ===================================================== */

  endSoundSequence();
}

/* Undefine student alarm macros */
#undef playTone
#undef wait


/**
  * FUNCTION DEFINITIONS
  */

/* Utility Functions */
int wrap(int v, int lo, int hi)
{
  int r = hi - lo + 1;
  while (v < lo) v += r;
  while (v > hi) v -= r;
  return v;
}

int clampi(int v, int lo, int hi)
{
  return v < lo ? lo : (v > hi ? hi : v);
}


/* Motor Functions */
void setLeftMotor(int speed)
{
  leftMotorServo.write(speed);
}

void setRightMotor(int speed)
{
  rightMotorServo.write(180 - speed);
}


/* Movement Sequence Functions */
void beginMoveSequence(void)
{
  moveLineCounter = 0;
}

void endMoveSequence(void)
{
  if (moveLineCounter <= moveCurrentStep)
  {
    moveCurrentStep = 0;
    moveWaiting = false;
    setLeftMotor(L_STOP);
    setRightMotor(R_STOP);
  }
}

void moveLeftMotorCmd(int speed)
{
  if (moveLineCounter == moveCurrentStep)
  {
    setLeftMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveRightMotorCmd(int speed)
{
  if (moveLineCounter == moveCurrentStep)
  {
    setRightMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveWaitCmd(unsigned long durationMs)
{
  if (moveLineCounter == moveCurrentStep)
  {
    if (!moveWaiting)
    {
      moveWaitStartMs = millis();
      moveWaiting = true;
    }
    else if (millis() - moveWaitStartMs >= durationMs)
    {
      moveWaiting = false;
      moveCurrentStep++;
    }
  }
  moveLineCounter++;
}


/* Sound Sequence Functions */
void beginSoundSequence(void)
{
  soundLineCounter = 0;
}

void endSoundSequence(void)
{
  if (soundLineCounter <= soundCurrentStep)
  {
    soundCurrentStep = 0;
    soundWaiting = false;
    toneActive = false;
    noTone(BUZZER_PIN);
  }
}

void soundWaitCmd(unsigned long durationMs)
{
  if (soundLineCounter == soundCurrentStep)
  {
    if (!soundWaiting)
    {
      noTone(BUZZER_PIN);
      soundWaitStartMs = millis();
      soundWaiting = true;
    }
    else if (millis() - soundWaitStartMs >= durationMs)
    {
      soundWaiting = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

void soundPlayToneCmd(int pitch, unsigned long durationMs)
{
  if (soundLineCounter == soundCurrentStep)
  {
    if (!toneActive)
    {
      tone(BUZZER_PIN, pitch);
      toneStartMs = millis();
      toneActive = true;
    }
    else if (millis() - toneStartMs >= durationMs)
    {
      noTone(BUZZER_PIN);
      toneActive = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}


/* Alarm Control Functions */
void resetAlarmSequence(void)
{
  moveCurrentStep = 0;
  moveLineCounter = 0;
  moveWaiting = false;
  moveWaitStartMs = 0;

  soundCurrentStep = 0;
  soundLineCounter = 0;
  soundWaiting = false;
  soundWaitStartMs = 0;

  toneActive = false;
  toneStartMs = 0;
  noTone(BUZZER_PIN);

  setLeftMotor(L_STOP);
  setRightMotor(R_STOP);
}

void alarmStart(void)
{
  alarmRinging = true;
  alarmLatchedThisMinute = true;
  resetAlarmSequence();
}

void alarmStop(void)
{
  alarmRinging = false;
  noTone(BUZZER_PIN);
  setLeftMotor(L_STOP);
  setRightMotor(R_STOP);
  resetAlarmSequence();
}

void updateAlarmState(const DateTime &now)
{
  if (mode != MODE_TIME)
  {
    alarmLatchedThisMinute = false;
    return;
  }

  if (!alarmEnabled)
  {
    alarmLatchedThisMinute = false;
    return;
  }

  if (now.hour() == alarmH && now.minute() == alarmM)
  {
    if (!alarmLatchedThisMinute && !alarmRinging)
    {
      alarmStart();
    }
  }
  else
  {
    alarmLatchedThisMinute = false;
  }
}


/* Battery Functions */
long readVcc_mV(void)
{
#if defined(__AVR__)
  ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  delayMicroseconds(200);
  ADCSRA |= _BV(ADSC);
  while (bit_is_set(ADCSRA, ADSC));
  return 1125300L / ADC;
#else
  return 5000;
#endif
}

float readVccFiltered(void)
{
  float v = readVcc_mV() / 1000.0f;
  vccFilt = 0.92f * vccFilt + 0.08f * v;
  return vccFilt;
}

int batteryPctFromV(float v)
{
  int pct = (int)((v - BAT_V_EMPTY) * 100.0f / (BAT_V_FULL - BAT_V_EMPTY) + 0.5f);
  return clampi(pct, 0, 100);
}


/* Encoder Functions */
void applyDelta(int d)
{
  if (mode == MODE_ALARM_TOGGLE && d) alarmEnabledPending = !alarmEnabledPending;
  else if (mode == MODE_ALARM_H)      alarmH = wrap(alarmH + d, 0, 23);
  else if (mode == MODE_ALARM_M)      alarmM = wrap(alarmM + d, 0, 59);
}

void readEncoder(void)
{
  uint8_t ab = (digitalRead(ENCODER_A) << 1) | digitalRead(ENCODER_B);
  int8_t step = QDEC[(oldAB << 2) | ab];

  if (step)
  {
    accum += step;
    if (abs(accum) >= STEPS_PER_DETENT)
    {
      applyDelta(accum > 0 ? 1 : -1);
      accum = 0;
    }
  }
  oldAB = ab;
}


/* Button Functions */
void handleButton(void)
{
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn)
  {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > debounceMs)
  {
    if (btn == LOW && btnArmed)
    {
      if (alarmRinging)
      {
        alarmStop();
        btnArmed = false;
        return;
      }

      if (mode == MODE_TIME)             mode = MODE_ALARM_TOGGLE, alarmEnabledPending = alarmEnabled;
      else if (mode == MODE_ALARM_TOGGLE) mode = MODE_ALARM_H;
      else if (mode == MODE_ALARM_H)      mode = MODE_ALARM_M;
      else                               mode = MODE_TIME, alarmEnabled = alarmEnabledPending;

      btnArmed = false;
    }

    if (btn == HIGH) btnArmed = true;
  }
}


/* Display Functions */
void drawBatteryIcon(int percent)
{
  int level = percent >= 100 ? 4 : percent >= 75 ? 3 : percent >= 50 ? 2 : percent >= 25 ? 1 : 0;
  const int w = 15, h = 9, x = SCREEN_WIDTH - w - 3, y = -1;

  display.fillRect(x,         y,         w,  2,  SH110X_WHITE);
  display.fillRect(x,         y + h - 2, w,  2,  SH110X_WHITE);
  display.fillRect(x,         y,         2,  h,  SH110X_WHITE);
  display.fillRect(x + w - 2, y,         2,  h,  SH110X_WHITE);
  display.fillRect(x + w,     y + 3,     2,  3,  SH110X_WHITE);

  for (int i = 0; i < level; i++)
  {
    display.fillRect(x + 3 + i * 3, y + 3, 2, h - 6, SH110X_WHITE);
  }
}

void drawUI(const DateTime &now)
{
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setFont(NULL);
  display.setTextSize(1);

  /* Date */
  char dateBuf[11];
  snprintf(dateBuf, sizeof(dateBuf), "%02d/%02d/%04d", now.day(), now.month(), now.year());
  display.setCursor(0, 0);
  display.print(dateBuf);

  drawBatteryIcon(batteryPctFromV(readVccFiltered()));

  /* Time (12h) */
  int h24 = now.hour();
  bool pm = h24 >= 12;
  int h12 = h24 % 12;
  if (h12 == 0) h12 = 12;

  char timeBuf[10];
  snprintf(timeBuf, sizeof(timeBuf), "%d:%02d %s", h12, now.minute(), pm ? "PM" : "AM");

  display.setFont(&FreeSansBold12pt7b);
  int16_t x1, y1;
  uint16_t tw, th;
  display.getTextBounds(timeBuf, 0, 0, &x1, &y1, &tw, &th);
  display.setCursor((SCREEN_WIDTH - (int)tw) / 2, (SCREEN_HEIGHT - (int)th) / 2 - y1);
  display.print(timeBuf);

  display.setFont(NULL);
  display.setTextSize(1);

  /* Alarm Status Row */
  bool showEnabled = (mode == MODE_TIME) ? alarmEnabled : alarmEnabledPending;

  int ah24 = alarmH;
  bool apm = ah24 >= 12;
  int ah12 = ah24 % 12;
  if (ah12 == 0) ah12 = 12;

  char stateBuf[12];
  snprintf(stateBuf, sizeof(stateBuf), "%s", showEnabled ? "ALARM ON" : "ALARM OFF");

  char alarmTimeBuf[10];
  snprintf(alarmTimeBuf, sizeof(alarmTimeBuf), "%d:%02d %s", ah12, alarmM, apm ? "PM" : "AM");

  const char *sep = " - ";

  uint16_t sw, sepw, aw;
  display.getTextBounds(stateBuf,    0, 0, &x1, &y1, &sw,   &th);
  display.getTextBounds(sep,         0, 0, &x1, &y1, &sepw, &th);
  display.getTextBounds(alarmTimeBuf,0, 0, &x1, &y1, &aw,   &th);

  int totalW = (int)sw + (int)sepw + (int)aw;
  int ax = (SCREEN_WIDTH - totalW) / 2;
  int ay = 56;

  display.setCursor(ax, ay);
  display.print(stateBuf);
  display.print(sep);
  display.print(alarmTimeBuf);

  /* Underline active edit field */
  int uy = ay + 7;

  if (mode == MODE_ALARM_TOGGLE)
  {
    display.drawLine(ax, uy, ax + (int)sw, uy, SH110X_WHITE);
  }
  else if (mode == MODE_ALARM_H)
  {
    char hb[3];
    snprintf(hb, sizeof(hb), "%d", ah12);
    uint16_t hw;
    display.getTextBounds(hb, 0, 0, &x1, &y1, &hw, &th);
    int hx = ax + (int)sw + (int)sepw;
    display.drawLine(hx, uy, hx + (int)hw, uy, SH110X_WHITE);
  }
  else if (mode == MODE_ALARM_M)
  {
    uint16_t hw, cw, mw;
    char hb[3];
    snprintf(hb, sizeof(hb), "%d", ah12);
    display.getTextBounds(hb,  0, 0, &x1, &y1, &hw, &th);
    display.getTextBounds(":", 0, 0, &x1, &y1, &cw, &th);
    display.getTextBounds("00",0, 0, &x1, &y1, &mw, &th);
    int mx = ax + (int)sw + (int)sepw + (int)hw + (int)cw;
    display.drawLine(mx, uy, mx + (int)mw, uy, SH110X_WHITE);
  }

  display.display();
}


/**
  * SETUP
  */
void setup(void)
{
  pinMode(ENCODER_A,   INPUT_PULLUP);
  pinMode(ENCODER_B,   INPUT_PULLUP);
  pinMode(ENCODER_BTN, INPUT_PULLUP);

  pinMode(BUZZER_PIN, OUTPUT);
  noTone(BUZZER_PIN);

  leftMotorServo.attach(SERVO_L_PIN);
  rightMotorServo.attach(SERVO_R_PIN);
  setLeftMotor(L_STOP);
  setRightMotor(R_STOP);

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();

  rtc.begin();
  rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));

  oldAB = (digitalRead(ENCODER_A) << 1) | digitalRead(ENCODER_B);
}


/**
  * MAIN LOOP
  */
void loop(void)
{
  readEncoder();
  handleButton();

  DateTime now = rtc.now();
  updateAlarmState(now);

  if (alarmRinging)
  {
    alarmMove();
    alarmSound();
  }

  if (millis() - lastUiMs >= uiPeriodMs)
  {
    drawUI(now);
    lastUiMs = millis();
  }
}
`
  }
]

function Resources() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [school, setSchool] = useState(null)
  const [error, setError] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)
  const [expandedCodeIndex, setExpandedCodeIndex] = useState(null)

  useEffect(() => {
    const savedSchool = sessionStorage.getItem('resourcesSchool')

    if (savedSchool) {
      try {
        setSchool(JSON.parse(savedSchool))
        setIsUnlocked(true)
      } catch {
        sessionStorage.removeItem('resourcesSchool')
      }
    }
  }, [])

  const handleUnlock = () => {
    const normalisedCode = accessCode.trim().toUpperCase()
    const matchedSchool = schoolAccessCodes[normalisedCode]

    if (matchedSchool) {
      setSchool(matchedSchool)
      setIsUnlocked(true)
      sessionStorage.setItem('resourcesSchool', JSON.stringify(matchedSchool))
      setError(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleUnlock()
  }

  const handleToggleCode = (index) => {
    setExpandedCodeIndex(expandedCodeIndex === index ? null : index)
  }

  const handleCopy = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      console.error('Copy failed')
    }
  }

  if (!isUnlocked) {
    return (
      <>
        <SEO
          title="Student Resources | Project Beacon"
          description="Protected Project Beacon student resources for school robotics incursions, including Arduino code templates, manuals, and workshop materials."
        />

        <div className="resources-container locked">
          <div className="resources-header">
            <h1 className="resources-title">Student Resources</h1>
          </div>

          <div className="resources-locked-card">
            <div className="resources-locked-icon">
              <LockIcon />
            </div>

            <div className="resources-locked-title">
              Protected Student Resources
            </div>

            <p className="resources-locked-description">
              These resources are available to students from registered schools.
              Please enter the access code provided by your teacher.
            </p>

            <div className="resources-access-code-section">
              <label className="resources-access-code-label">
                School Access Code
              </label>

              <input
                type="text"
                className={`resources-access-code-input ${error ? 'error' : ''}`}
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyDown={handleKeyPress}
              />

              <button
                className="resources-unlock-button"
                onClick={handleUnlock}
              >
                Unlock Student Resources
              </button>

              {error && (
                <p className="resources-error-message">
                  Invalid access code. Please check the code provided by your teacher.
                </p>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO
        title={`${school?.schoolName || 'School'} Student Resources | Project Beacon`}
        description={`Project Beacon student resources for ${school?.schoolName || 'registered schools'}, including Arduino code templates, robotics incursion materials, and student manuals.`}
      />

      <div className="resources-container unlocked">
        <div className="resources-student-welcome">
          <div className="resources-welcome-icon">
            <SchoolIcon />
          </div>

          <p className="resources-welcome-label">Welcome</p>

          <h1 className="resources-title">
            Welcome Students from
            <br />
            <span>{school?.schoolName || 'your school'}</span>
          </h1>

          <p className="resources-subtitle">
            Access your robotics incursion resources below, including the student
            manual, Arduino code templates, and downloadable project files.
          </p>
        </div>

        <section className="student-code-section resources-files-section">
          <div className="student-code-header">
            <p className="student-code-label">Student Resources</p>

            <h2>Incursion Materials</h2>

            <p>
              Download the student manual and supporting materials for your
              Project Beacon robotics incursion.
            </p>
          </div>

          <div className="student-code-grid">
            <div className="student-code-card resource-download-card">
              <div className="student-code-card-topbar">
                <div>
                  <div className="student-code-card-label">
                    PDF Resource
                  </div>

                  <h3>Alarm Bot Manual</h3>

                  <p>
                    Step-by-step student guide with assembly instructions,
                    diagrams, safety information, and workshop support material.
                  </p>
                </div>

                <div className="student-code-actions">
                  <a
                    href="/alarm-bot-workshop/Alarm Bot Workshop Manual - Project Beacon.pdf"
                    className="student-code-download-btn resource-download-btn"
                    download
                  >
                    <DownloadIcon />
                    Download PDF
                  </a>
                </div>
              </div>

              <div className="resource-preview-block">
                <div className="resource-preview-icon">
                  <MenuBookIcon />
                </div>

                <div>
                  <p className="resource-preview-label">Student Build Manual</p>

                  <h4>Use this during the session</h4>

                  <p>
                    Follow the build process, understand each component, and
                    complete the robotics activity with the manual open beside you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="student-code-grid">
            <div className="student-code-card resource-download-card">
              <div className="student-code-card-topbar">
                <div>
                  <div className="student-code-card-label">
                    PDF Resource
                  </div>

                  <h3>Diagnosing Connection Issues with the Arduino Nano</h3>

                  <p>
                    Instructions on how to solve/debug any Arduino Nano connection issues with your computer.
                  </p>
                </div>

                <div className="student-code-actions">
                  <a
                    href="alarm-bot-workshop/Diagnosing Connection Issues with the Arduino Nano - Project Beacon.pdf"
                    className="student-code-download-btn resource-download-btn"
                    download
                  >
                    <DownloadIcon />
                    Download PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="student-code-section">
          <div className="student-code-header">
            <p className="student-code-label">Arduino Templates</p>

            <h2>Student Code Blocks</h2>

            <p>
              Use these Arduino code templates during the Alarm Bot robotics
              incursion. Open the code block when needed, then copy or download it
              as an Arduino .ino file.
            </p>
          </div>

          <div className="student-code-grid">
            {templates.map((template, index) => (
              <div className="student-code-card" key={index}>
                <div className="student-code-card-topbar">
                  <div>
                    <div className="student-code-card-label">
                      Arduino Template
                    </div>

                    <h3>{template.title}</h3>

                    <p>{template.description}</p>
                  </div>

                  <div className="student-code-actions">
                    <button
                      className="student-code-toggle-btn"
                      onClick={() => handleToggleCode(index)}
                    >
                      {expandedCodeIndex === index ? 'Hide Code' : 'Open Code'}
                    </button>

                    <button
                      className={`student-code-copy-btn ${copiedIndex === index ? 'copied' : ''}`}
                      onClick={() => handleCopy(template.code, index)}
                    >
                      {copiedIndex === index ? <CheckIcon /> : <ContentCopyIcon />}
                      {copiedIndex === index ? 'Copied' : 'Copy'}
                    </button>

                    <a
                      href={template.fileURL}
                      download
                      // download={template.fileName}
                      className="student-code-download-btn"
                    >
                      <DownloadIcon />
                      Download
                    </a>
                  </div>
                </div>

                {expandedCodeIndex === index && (
                  <div className="student-code-block">
                    <SyntaxHighlighter
                      language="cpp"
                      style={oneDark}
                      showLineNumbers={true}
                      wrapLongLines={false}
                      customStyle={{
                        margin: 0,
                        padding: '28px',
                        background: 'transparent',
                        fontSize: '13.5px',
                        lineHeight: '1.65',
                        fontFamily:
                          '"Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace'
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily:
                            '"Fira Code", "SFMono-Regular", Consolas, "Liberation Mono", monospace'
                        }
                      }}
                    >
                      {template.code}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <AlternativeFooter />
    </>
  )
}

export default Resources