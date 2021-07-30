const footer = document.querySelector("footer");
const a = document.getElementById("a");
const b = document.getElementById("b");
const btnPlay = document.querySelector(".btn-play");
const btnMusic = document.querySelector(".btn-music");
const menu = document.querySelector(".menu");
let score = 0;
let speed = 1;
let iterasi = 0.25;
let isPlaying = false;
let speedUP;

localStorage.setItem(
  "highScore",
  localStorage.getItem("highScore") ? localStorage.getItem("highScore") : ""
);
const slide = new Audio("Audio/slide.mp3");
const soundBg = document.querySelector("#soundBg");
let count = 1;
function playSoundBg() {
  if (count == 0) {
    soundBg.src = "Audio/Bg.mp3";
    count = 1;
    btnMusic.innerHTML = `<i class="fa fa-music" aria-hidden="true">`;
  } else {
    soundBg.src = "";
    count = 0;
    btnMusic.innerHTML = `<img src="img/music-slash.svg" alt="" width="25">`;
  }
}

btnPlay.addEventListener("click", function () {
  isPlaying = true;
  menu.style.display = "none";
  soundBg.play();
  myMove();
});
function myMove() {
  var id = null;
  let pos = 0;
  b.style.top = pos + "px";
  var random = Math.floor(Math.random() * 3);
  var Left = random * 100;
  console.log(pos);
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    if (score % 5 == 0 && score > 0) {
      if (speed <= 4.5) {
        if (score > 30 && score <= 40) {
          iterasi = 0;
        } else {
          iterasi = 0.25;
        }
        speed += iterasi;
        score++;
        console.log(`update speed : ${speed}
                    score : ${score}
                    `);
      }
    }
    if (pos == 500 || pos >= 500) {
      pos = 0;
      random = Math.floor(Math.random() * 3);
      Left = random * 100;
      score++;
      console.log(`selesai random : ${Left}
                speed : ${speed}
                `);
    } else {
      pos += speed;
      b.style.top = b.style.top = pos + "px";
      b.style.left = Left + "px";
      console.log(
        `mulai speed : ${speed} score : ${score}, currentTime : ${soundBg.currentTime}`
      );
    }

    var bLeft = parseInt(getComputedStyle(b).getPropertyValue("left"));
    var bTop = parseInt(getComputedStyle(b).getPropertyValue("top"));
    var aLeft = parseInt(getComputedStyle(a).getPropertyValue("left"));
    if (aLeft == bLeft && bTop > 300 && bTop < 400) {
      soundBg.pause();
      soundBg.currentTime = 0;
      b.style.animation = "";
      isPlaying = false;
      pos = 0;
      console.log(pos);
      clearInterval(id);
      const highScore = localStorage.getItem("highScore");
      localStorage.setItem("highScore", score > highScore ? score : highScore);
      const newhighScore = localStorage.getItem("highScore");
      alert(`game over!
                Score : ${score}
                Hight Score : ${newhighScore}`);
      score = 0;
      speed = 1;
      menu.style.display = "inherit";
    }
  }
}

var l = 0;
var u = 0;
function turnLeft() {
  if (l > 0) {
    l -= 100;
    a.style.left = l + "px";
    slide.play();
  }
  // console.log("left : "+l);
}
function turnRight() {
  if (l < 200) {
    l += 100;
    a.style.left = l + "px";
    slide.play();
  }
  // console.log("Right : "+l);
}
document.body.addEventListener("keydown", myFunction);
function myFunction(el) {
  switch (el.key) {
    case "ArrowLeft":
      turnLeft();
      break;

    case "ArrowRight":
      turnRight();
      break;
  }
}
