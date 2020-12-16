// clear everything
function ClearAll () {
    basic.clearScreen()
    strip.clear()
    strip.show()
}
// when A is pressed, set APressed to the opposite
input.onButtonPressed(Button.A, function () {
    if (APressed == true) {
        APressed = false
        ClearAll()
    } else {
        APressed = true
    }
})
// show the colorPicked with fade in and fade out
function breathingLight () {
    // fade in
    for (let a = 0; a <= 100; a++) {
        strip.setBrightness(a)
        strip.showColor(colorPicked)
        basic.pause(10)
    }
    // fade out
    for (let b = 0; b <= 100; b++) {
        strip.setBrightness(100 - b)
        strip.showColor(colorPicked)
        basic.pause(10)
    }
}
// when button B is pressed, set colorPicked to a new color with random RGB values,
// call breathingLight function
input.onButtonPressed(Button.B, function () {
    if (APressed == true) {
        APressed = false
        ClearAll()
    }
    colorPicked = neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255))
    breathingLight()
})
input.onGesture(Gesture.Shake, function () {
    MovingRainbow()
    basic.showIcon(IconNames.SmallHeart)
    basic.showIcon(IconNames.Happy)
    basic.clearScreen()
})
// plot the LEDs ring matching the voice level
function SoundMeter () {
    // read sound level from microphone at pin 1
    pins.analogSetPitchPin(AnalogPin.P1)
    // set the SoundThreshold
    pins.analogPitch(400, 0)
    // map the voice level to match 24 LEDs
    mic = Math.map(pins.analogReadPin(AnalogPin.P1), 0, 30, 0, 24)
    while (num < mic) {
        strip.setPixelColor(num, colorPicked)
        strip.setBrightness((40 - num) / 2)
        strip.show()
        num = num + 1
    }
    num = 0
    basic.pause(100)
    strip.clear()
}
// rainbow light that rotates for a full circle and fades out
function MovingRainbow () {
    strip.setBrightness(50)
    strip.showRainbow(1, 360)
    strip.show()
    for (let index = 0; index < 24; index++) {
        strip.rotate(1)
        strip.setBrightness(50)
        strip.show()
        basic.pause(100)
    }
    d = 0
    for (let c = 0; c <= 50; c++) {
        strip.setBrightness(50 - c)
        strip.showRainbow(1, 360)
        basic.pause(10)
    }
    strip.clear()
    strip.show()
}
let sr = ""
let d = 0
let num = 0
let mic = 0
let APressed = false
let colorPicked = 0
let strip: neopixel.Strip = null
let temp = 0
serial.setBaudRate(BaudRate.BaudRate9600)
pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
pins.setPull(DigitalPin.P1, PinPullMode.PullNone)
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
colorPicked = neopixel.rgb(randint(0, 255), randint(0, 255), randint(0, 255))
MovingRainbow()
// if A is pressed, start plotting graph on microbit board, call moveWithTone
basic.forever(function () {
    if (APressed == true) {
        led.plotBarGraph(
        pins.analogReadPin(AnalogPin.P1),
        500
        )
        SoundMeter()
    }
})
basic.forever(function () {
    // read from protopie broadcast
    sr = serial.readUntil(serial.delimiters(Delimiters.Dollar))
    if (sr.compare("CALL") == 0) {
        basic.showString("Incoming Call")
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(100)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(100)
        strip.clear()
        strip.show()
    }
    if (sr.compare("HEART") == 0) {
        basic.showIcon(IconNames.Heart)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SMILE") == 0) {
        basic.showIcon(IconNames.Happy)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("BORING") == 0) {
        basic.showIcon(IconNames.Asleep)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("GIRAFFE") == 0) {
        basic.showIcon(IconNames.Giraffe)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("GHOST") == 0) {
        basic.showIcon(IconNames.Ghost)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SKULL") == 0) {
        basic.showIcon(IconNames.Skull)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SURPRISE") == 0) {
        basic.showIcon(IconNames.Surprised)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SKATE") == 0) {
        basic.showIcon(IconNames.Rollerskate)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SQUARE") == 0) {
        basic.showIcon(IconNames.Square)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("CUBE") == 0) {
        basic.showIcon(IconNames.SmallSquare)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("MUSIC") == 0) {
        basic.showIcon(IconNames.EigthNote)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("YES") == 0) {
        basic.showIcon(IconNames.Yes)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("NO") == 0) {
        basic.showIcon(IconNames.No)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("EMM") == 0) {
        basic.showIcon(IconNames.Meh)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SAD") == 0) {
        basic.showIcon(IconNames.Sad)
        basic.pause(5000)
        basic.clearScreen()
    }
    if (sr.compare("SHIRT") == 0) {
        basic.showIcon(IconNames.TShirt)
        basic.pause(5000)
        basic.clearScreen()
    }
})
