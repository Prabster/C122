x = 0;
y = 0;
draw_apple = "";
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
screen_width = 0;
screen_height = 0;
apple = "";
speak_data = "";
to_number = "";

function preload() {
  apple = loadImage("apple.png");
}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;

  canvas = createCanvas(1000, 600);
  canvas.position(475, 200);
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    for (let i = 1; i < to_number; i++) {
      x = Math.floor(Math.random() * 1000);
      y = Math.floor(Math.random() * 600);
      image(apple, x, y, 50, 50);
    }
  }
}

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {
  console.log(event);
  content = event.results[0][0].transcript;
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    draw_apple = "set";
  }
  else {
    // text = "The speech has not recognized a number";
    document.getElementById("status").innerHTML = "The speech has not recognized a number"
  }
}

function speak() {
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = "";
}
