/**
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


  /* Example: Mission Impossible (remove the slashes // underneath) */
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
