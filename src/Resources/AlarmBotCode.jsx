import React, { useState } from "react";
import "./AlarmBotCode.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import AlternativeFooter from "../Footer/AlternativeFooter";
import SEO from "../SEO/SEO";

const templates = [
  {
    title: "Movement Code",
    fileURL: "/alarm-bot-workshop-code/movement_code.ino",
    description: "Basic Movement Code Template",
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <Servo.h>

void beginMoveSequence();
void endMoveSequence();
void moveLeftMotorCmd(int speed);
void moveRightMotorCmd(int speed);
void moveWaitCmd(unsigned long durationMs);


#define leftMotor(x)  moveLeftMotorCmd(x)
#define rightMotor(x) moveRightMotorCmd(x)
#define wait(sec)     moveWaitCmd((unsigned long)((sec) * 1000))

void studentMotorTest() {
  beginMoveSequence();

  /* =========================================================
     ========= STUDENT MOVEMENT CODE (START HERE) ============
     ========================================================= */


  // type movement code here


  /* =========================================================
     ========= STUDENT MOVEMENT CODE (END HERE) ==============
     ========================================================= */

  endMoveSequence();
}

#undef leftMotor
#undef rightMotor
#undef wait

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

#define ENCODER_BTN 7
#define SERVO_L_PIN 9
#define SERVO_R_PIN 10

#define L_STOP 0
#define R_STOP 0

Servo leftMotorServo;
Servo rightMotorServo;

bool testRunning = false;

int moveCurrentStep = 0;
int moveLineCounter = 0;
bool moveWaiting = false;
unsigned long moveWaitStartMs = 0;

bool lastBtn = HIGH;
bool btnArmed = true;
unsigned long lastBtnChangeMs = 0;


void setLeftMotor(int speed) {
  speed = constrain(speed, -90, 90);
  leftMotorServo.write(90 + speed);
}

void setRightMotor(int speed) {
  speed = constrain(speed, -90, 90);
  rightMotorServo.write(90 - speed);
}

void stopMotors() {
  setLeftMotor(L_STOP);
  setRightMotor(R_STOP);
}

void resetMoveSequence() {
  moveCurrentStep = 0;
  moveLineCounter = 0;
  moveWaiting = false;
  moveWaitStartMs = 0;
}

void beginMoveSequence() {
  moveLineCounter = 0;
}

void endMoveSequence() {
  if (moveLineCounter <= moveCurrentStep) {
    moveCurrentStep = 0;
    moveWaiting = false;
    stopMotors();
  }
}

void moveLeftMotorCmd(int speed) {
  if (moveLineCounter == moveCurrentStep) {
    setLeftMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveRightMotorCmd(int speed) {
  if (moveLineCounter == moveCurrentStep) {
    setRightMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveWaitCmd(unsigned long durationMs) {
  if (moveLineCounter == moveCurrentStep) {
    if (!moveWaiting) {
      moveWaitStartMs = millis();
      moveWaiting = true;
    } else if (millis() - moveWaitStartMs >= durationMs) {
      moveWaiting = false;
      moveCurrentStep++;
    }
  }
  moveLineCounter++;
}

void drawCenteredText(const char *line1, const char *line2 = "") {
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setTextSize(1);

  int16_t x1, y1;
  uint16_t w, h;

  display.getTextBounds(line1, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - (int)w) / 2, 20);
  display.print(line1);

  if (line2[0] != 0) {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 40);
    display.print(line2);
  }

  display.display();
}

void drawUI() {
  if (testRunning) {
    drawCenteredText("Motor Test Running", "Press to stop");
  } else {
    drawCenteredText("Press knob to start");
  }
}

void handleButton() {
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn) {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > 30) {
    if (btn == LOW && btnArmed) {
      if (!testRunning) {
        resetMoveSequence();
        testRunning = true;
      } else {
        testRunning = false;
        resetMoveSequence();
        stopMotors();
      }
      btnArmed = false;
    }

    if (btn == HIGH) {
      btnArmed = true;
    }
  }
}

void setup() {
  pinMode(ENCODER_BTN, INPUT_PULLUP);

  leftMotorServo.attach(SERVO_L_PIN);
  rightMotorServo.attach(SERVO_R_PIN);
  stopMotors();

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
}

void loop() {
  handleButton();

  if (testRunning) {
    studentMotorTest();
  }

  drawUI();
}`
  },
  {
    title: "Alarm Code",
    fileURL: "/alarm-bot-workshop-code/alarm_code.ino",
    description: "Basic Alarm Code Template",
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

void beginSoundSequence();
void endSoundSequence();
void soundWaitCmd(unsigned long durationMs);
void soundPlayToneCmd(int pitch, unsigned long durationMs);

#define playTone(p, sec) soundPlayToneCmd(p, (unsigned long)((sec) * 1000))
#define wait(sec)        soundWaitCmd((unsigned long)((sec) * 1000))

void studentAlarmSound() {
  beginSoundSequence();

  /* =========================================================
     ========= STUDENT ALARM CODE (START HERE) =================
     ========================================================= */


  // type alarm code here


  /* =========================================================
     ========= STUDENT ALARM CODE (END HERE) ===================
     ========================================================= */

  endSoundSequence();
}

#undef playTone
#undef wait

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

#define ENCODER_BTN 7
#define BUZZER_PIN 8

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

void resetSoundSequence() {
  soundCurrentStep = 0;
  soundLineCounter = 0;
  soundWaiting = false;
  soundWaitStartMs = 0;
  toneActive = false;
  toneStartMs = 0;
  noTone(BUZZER_PIN);
}

void beginSoundSequence() {
  soundLineCounter = 0;
}

void endSoundSequence() {
  if (soundLineCounter <= soundCurrentStep) {
    soundCurrentStep = 0;
    soundWaiting = false;
    toneActive = false;
    noTone(BUZZER_PIN);
  }
}

void soundWaitCmd(unsigned long durationMs) {
  if (soundLineCounter == soundCurrentStep) {
    if (!soundWaiting) {
      noTone(BUZZER_PIN);
      soundWaitStartMs = millis();
      soundWaiting = true;
    } else if (millis() - soundWaitStartMs >= durationMs) {
      soundWaiting = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

void soundPlayToneCmd(int pitch, unsigned long durationMs) {
  if (soundLineCounter == soundCurrentStep) {
    if (!toneActive) {
      tone(BUZZER_PIN, pitch);
      toneStartMs = millis();
      toneActive = true;
    } else if (millis() - toneStartMs >= durationMs) {
      noTone(BUZZER_PIN);
      toneActive = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

void drawCenteredText(const char *line1, const char *line2 = "", const char *line3 = "") {
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  display.setTextSize(1);

  int16_t x1, y1;
  uint16_t w, h;

  display.getTextBounds(line1, 0, 0, &x1, &y1, &w, &h);
  display.setCursor((SCREEN_WIDTH - (int)w) / 2, 1npmr unb uild
  display.print(line1);

  if (line2[0] != 0) {
    display.getTextBounds(line2, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 32);
    display.print(line2);
  }

  if (line3[0] != 0) {
    display.getTextBounds(line3, 0, 0, &x1, &y1, &w, &h);
    display.setCursor((SCREEN_WIDTH - (int)w) / 2, 48);
    display.print(line3);
  }

  display.display();
}

void drawUI() {
  if (testRunning) {
    drawCenteredText("Alarm Test Running", "Press knob to stop");
  } else {
    drawCenteredText("Press knob to start", "alarm sound test");
  }
}

void handleButton() {
  bool btn = digitalRead(ENCODER_BTN);
  unsigned long now = millis();

  if (btn != lastBtn) {
    lastBtnChangeMs = now;
    lastBtn = btn;
  }

  if ((now - lastBtnChangeMs) > debounceMs) {
    if (btn == LOW && btnArmed) {
      if (!testRunning) {
        resetSoundSequence();
        testRunning = true;
      } else {
        testRunning = false;
        resetSoundSequence();
      }
      btnArmed = false;
    }

    if (btn == HIGH) {
      btnArmed = true;
    }
  }
}

void setup() {
  pinMode(ENCODER_BTN, INPUT_PULLUP);
  pinMode(BUZZER_PIN, OUTPUT);
  noTone(BUZZER_PIN);

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();
}

void loop() {
  handleButton();

  if (testRunning) {
    studentAlarmSound();
  }

  drawUI();
}`
  },
  {
    title: "Overall Code",
    fileURL: "/alarm-bot-workshop-code/overall_code.ino",
    description: "Overall Code Template",
    code: `#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include <RTClib.h>
#include <Fonts/FreeSansBold12pt7b.h>
#include <Servo.h>

void beginMoveSequence();
void endMoveSequence();
void moveLeftMotorCmd(int speed);
void moveRightMotorCmd(int speed);
void moveWaitCmd(unsigned long durationMs);

void beginSoundSequence();
void endSoundSequence();
void soundWaitCmd(unsigned long durationMs);
void soundPlayToneCmd(int pitch, unsigned long durationMs);

#define leftMotor(x)  moveLeftMotorCmd(x)
#define rightMotor(x) moveRightMotorCmd(x)
#define wait(sec)     moveWaitCmd((unsigned long)((sec) * 1000))

void alarmMove() {
  beginMoveSequence();

  /* =========================================================
     ========= STUDENT MOVEMENT CODE (START HERE) ============
     ========================================================= */


    // paste movement code here



  /* =========================================================
     ========= STUDENT MOVEMENT CODE (END HERE) ==============
     ========================================================= */

  endMoveSequence();
}

#undef leftMotor
#undef rightMotor
#undef wait
#define playTone(p, sec) soundPlayToneCmd(p, (unsigned long)((sec) * 1000))
#define wait(sec)        soundWaitCmd((unsigned long)((sec) * 1000))

void alarmSound() {
  beginSoundSequence();

  /* =========================================================
     ========= STUDENT ALARM CODE (START HERE) ===============
     ========================================================= */
    

    // paste alarm code here


  /* =========================================================
     ========= STUDENT ALARM CODE (END HERE) =================
     ========================================================= */

  endSoundSequence();
}

#undef playTone
#undef wait

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
Adafruit_SH1106G display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

#define RTC_CE  4
#define RTC_SCK 2
#define RTC_IO  3
DS1302 rtc(RTC_CE, RTC_SCK, RTC_IO);

#define ENCODER_A   5
#define ENCODER_B   6
#define ENCODER_BTN 7

#define BUZZER_PIN 8
#define SERVO_L_PIN 9
#define SERVO_R_PIN 10

Servo leftMotorServo;
Servo rightMotorServo;

#define L_STOP 0
#define R_STOP 0

bool alarmEnabled = false;
bool alarmEnabledPending = false;

int alarmH = 7;
int alarmM = 0;

bool alarmRinging = false;
bool alarmLatchedThisMinute = false;

unsigned long lastUiMs = 0;
const unsigned long uiPeriodMs = 120;

bool lastBtn = HIGH;
unsigned long lastBtnChangeMs = 0;
const unsigned long debounceMs = 30;
bool btnArmed = true;
const int8_t QDEC[16] = {
  0,-1,1,0,
  1,0,0,-1,
 -1,0,0,1,
  0,1,-1,0
};

uint8_t oldAB = 0;
int accum = 0;
const int STEPS_PER_DETENT = 4;

const float BAT_V_FULL = 5.60;
const float BAT_V_EMPTY = 4.40;
float vccFilt = 5.0f;

enum Mode { MODE_TIME, MODE_ALARM_TOGGLE, MODE_ALARM_H, MODE_ALARM_M };
Mode mode = MODE_TIME;

int moveCurrentStep = 0;
int moveLineCounter = 0;
bool moveWaiting = false;
unsigned long moveWaitStartMs = 0;

int soundCurrentStep = 0;
int soundLineCounter = 0;
bool soundWaiting = false;
unsigned long soundWaitStartMs = 0;

bool toneActive = false;
unsigned long toneStartMs = 0;

void setLeftMotor(int speed) {
  speed = constrain(speed, -90, 90);
  leftMotorServo.write(90 + speed);
}

void setRightMotor(int speed) {
  speed = constrain(speed, -90, 90);
  rightMotorServo.write(90 - speed);
}

void stopMotors() {
  setLeftMotor(0);
  setRightMotor(0);
}

void beginMoveSequence() {
  moveLineCounter = 0;
}

void endMoveSequence() {
  if (moveLineCounter <= moveCurrentStep) {
    moveCurrentStep = 0;
    moveWaiting = false;
    stopMotors();
  }
}

void moveLeftMotorCmd(int speed) {
  if (moveLineCounter == moveCurrentStep) {
    setLeftMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveRightMotorCmd(int speed) {
  if (moveLineCounter == moveCurrentStep) {
    setRightMotor(speed);
    moveCurrentStep++;
  }
  moveLineCounter++;
}

void moveWaitCmd(unsigned long durationMs) {
  if (moveLineCounter == moveCurrentStep) {
    if (!moveWaiting) {
      moveWaitStartMs = millis();
      moveWaiting = true;
    } else if (millis() - moveWaitStartMs >= durationMs) {
      moveWaiting = false;
      moveCurrentStep++;
    }
  }
  moveLineCounter++;
}

void beginSoundSequence() {
  soundLineCounter = 0;
}

void endSoundSequence() {
  if (soundLineCounter <= soundCurrentStep) {
    soundCurrentStep = 0;
    soundWaiting = false;
    toneActive = false;
    noTone(BUZZER_PIN);
  }
}

void soundWaitCmd(unsigned long durationMs) {
  if (soundLineCounter == soundCurrentStep) {
    if (!soundWaiting) {
      noTone(BUZZER_PIN);
      soundWaitStartMs = millis();
      soundWaiting = true;
    } else if (millis() - soundWaitStartMs >= durationMs) {
      soundWaiting = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

void soundPlayToneCmd(int pitch, unsigned long durationMs) {
  if (soundLineCounter == soundCurrentStep) {
    if (!toneActive) {
      tone(BUZZER_PIN, pitch);
      toneStartMs = millis();
      toneActive = true;
    } else if (millis() - toneStartMs >= durationMs) {
      noTone(BUZZER_PIN);
      toneActive = false;
      soundCurrentStep++;
    }
  }
  soundLineCounter++;
}

int wrap(int v, int lo, int hi) {
  int r = hi - lo + 1;
  while (v < lo) v += r;
  while (v > hi) v -= r;
  return v;
}

int clampi(int v, int lo, int hi) {
  return v < lo ? lo : (v > hi ? hi : v);
}

void setup() {
  pinMode(ENCODER_A, INPUT_PULLUP);
  pinMode(ENCODER_B, INPUT_PULLUP);
  pinMode(ENCODER_BTN, INPUT_PULLUP);

  pinMode(BUZZER_PIN, OUTPUT);
  noTone(BUZZER_PIN);

  leftMotorServo.attach(SERVO_L_PIN);
  rightMotorServo.attach(SERVO_R_PIN);
  stopMotors();

  display.begin(0x3C, true);
  display.clearDisplay();
  display.display();

  rtc.begin();

  oldAB = (digitalRead(ENCODER_A) << 1) | digitalRead(ENCODER_B);
}

void loop() {
  readEncoder();
  handleButton();

  DateTime now = rtc.now();
  updateAlarmState(now);

  if (alarmRinging) {
    alarmMove();
    alarmSound();
  }

  if (millis() - lastUiMs >= uiPeriodMs) {
    drawUI(now);
    lastUiMs = millis();
  }
}`
  }
];

function AlarmBotCode() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = (code, title) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;

    // clean filename
    const fileName = title.replace(/\s+/g, "-").toLowerCase();
    a.download = `${fileName}.ino`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };


  return (
    <>
      {/* CHANGE THIS CODY */}
      <SEO
        title="Code Templates | Project Beacon"
        description="Download and explore Project Beacon’s Arduino code templates for the Alarm Bot workshop, including movement, sound, and full system integration."
      />

      <div className="code-page">
        <div className="code-header">
          {/* H1 is correct for page */}
          <h1>Code Templates</h1>
        </div>

        <div className="code-grid">
          {templates.map((template, index) => (
            <div className="code-card" key={index}>
              <div className="code-card-header">
                <div>
                  {/* keep H2 for each template section (correct SEO structure) */}
                  <h2>{template.title}</h2>

                  <p>{template.description}</p>
                </div>

                <div className="code-actions">
                  <button
                    className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
                    onClick={() => handleCopy(template.code, index)}
                  >
                    {copiedIndex === index ? <CheckIcon /> : <ContentCopyIcon />}
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </button>

                  <button
                    className="download-btn"
                    onClick={() => handleDownload(template.code, template.title)}
                  >
                    Download
                  </button>
                </div>
              </div>

              <pre className="code-block">
                <code>{template.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      <AlternativeFooter />
    </>
  );
}

export default AlarmBotCode
