const body = document.querySelector("body");
const firstNumText = document.querySelector("#first-num");
const operatorText = document.querySelector("#operator");
const secondNumText = document.querySelector("#second-num");
const btns = document.querySelectorAll(".btn");
const incrLevelBtn = document.querySelector("#increment");
const decrLevelBtn = document.querySelector("#decrement");
const scoreText = document.querySelector("#score");
const hiscoreText = document.querySelector("#hiscore");
const levelText = document.querySelector("#level");
let hiscore = 0;
let score = 0;
let level = 10;
const operators = ["+", "-", "x"];
let correctAns = setQuestion();
initialize();
function initialize() {
  btns.forEach((btn) => {
    btn.addEventListener("click", btnClicked);
  });
  incrLevelBtn.addEventListener("click", incrLevel);
  decrLevelBtn.addEventListener("click", decrLevel);
}
function incrLevel() {
  const currLevel = parseInt(levelText.textContent);
  if (currLevel < 3) {
    level = level * 10;
    levelText.textContent = currLevel + 1;
    restart();
  }
}
function decrLevel() {
  const currLevel = parseInt(levelText.textContent);
  if (currLevel > 1) {
    level = Math.floor(level / 10);
    levelText.textContent = currLevel - 1;
    restart();
  }
}
function setQuestion() {
  let firstNum = Math.floor(Math.random() * level);
  let secondNum = Math.floor(Math.random() * level);
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const wrongAnswers = new Set();
  let correctAns = null;
  if (operator === "+") {
    correctAns = firstNum + secondNum;
    while (wrongAnswers.size < 4) {
      const wrongAns =
        Math.floor(Math.random() * level) + Math.floor(Math.random() * level);
      if (wrongAns !== correctAns) {
        wrongAnswers.add(wrongAns);
      }
    }
  } else if (operator === "-") {
    secondNum = Math.floor(Math.random() * firstNum);
    correctAns = firstNum - secondNum;
    while (wrongAnswers.size < 4) {
      const wrongAns =
        Math.floor(Math.random() * level) + Math.floor(Math.random() * level);
      if (wrongAns !== correctAns) {
        wrongAnswers.add(wrongAns);
      }
    }
  } else if (operator === "x") {
    if (level > 100) {
      firstNum = Math.floor(Math.random() * 100);
      secondNum = Math.floor(Math.random() * 100);
      while (wrongAnswers.size < 4) {
        const wrongAns =
          Math.floor(Math.random() * 21) * Math.floor(Math.random() * 10);
        if (wrongAns !== correctAns) {
          wrongAnswers.add(wrongAns);
        }
      }
    } else if (level > 10) {
      firstNum = Math.floor(Math.random() * 21);
      secondNum = Math.floor(Math.random() * 10);
      while (wrongAnswers.size < 4) {
        const wrongAns =
          Math.floor(Math.random() * 21) * Math.floor(Math.random() * 10);
        if (wrongAns !== correctAns) {
          wrongAnswers.add(wrongAns);
        }
      }
    }
    while (wrongAnswers.size < 4) {
      const wrongAns =
        Math.floor(Math.random() * 21) * Math.floor(Math.random() * 10);
      if (wrongAns !== correctAns) {
        wrongAnswers.add(wrongAns);
      }
    }
    correctAns = firstNum * secondNum;
  }
  operatorText.textContent = operator.toString();
  firstNumText.textContent = firstNum.toString();
  secondNumText.textContent = secondNum.toString();

  const correctbtn = Math.floor(Math.random() * 4);

  for (let i = 0; i < btns.length; i++) {
    if (i === correctbtn) {
      btns[i].textContent = correctAns;
    } else {
      btns[i].textContent = Array.from(wrongAnswers)[i];
    }
  }
  return correctAns;
}
function btnClicked() {
  checkAnswer(this);
  update();
}

function checkAnswer(btn) {
  if (btn.textContent == correctAns) {
    const currLevel = parseInt(levelText.textContent);
    score += currLevel;
    if (score > hiscore) {
      hiscore = score;
    }
  } else {
    score = 0;
  }
}

function update() {
  scoreText.textContent = score;
  hiscoreText.textContent = hiscore;
  correctAns = setQuestion();
}

function restart() {
  hiscore = 0;
  score = 0;
  update();
}
