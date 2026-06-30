/**
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
