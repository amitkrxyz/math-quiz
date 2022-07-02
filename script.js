const firstNumText = document.querySelector("#first-num");
const operator = document.querySelector("#operator");
const secondNumText = document.querySelector("#second-num");
const btns = document.querySelectorAll(".btn");
const incrLevel = document.querySelector("#increment");
const decrLevel = document.querySelector("#decrement");
const scoreText = document.querySelector("#score");
const hiscoreText = document.querySelector("#hiscore");
const levelText = document.querySelector("#level");
let hiscore = 0;
let score = 0;
let level = 10;

const setEverything = () => {
  const firstNum = Math.floor(Math.random() * level);
  const secondNum = Math.floor(Math.random() * level);
  firstNumText.textContent = firstNum.toString();
  secondNumText.textContent = secondNum.toString();
  operator.textContent = "+";

  const correctAns = firstNum + secondNum;
  const correctbtn = Math.floor(Math.random() * 4);
  const wrongAnswers = new Set();
  while (wrongAnswers.size < 4) {
    const wrongAns =
      Math.floor(Math.random() * level) + Math.floor(Math.random() * level);
    if (wrongAns !== correctAns) {
      wrongAnswers.add(wrongAns);
    }
  }

  for (let i = 0; i < btns.length; i++) {
    if (i === correctbtn) {
      btns[i].textContent = correctAns;
    } else {
      btns[i].textContent = Array.from(wrongAnswers)[i];
    }
  }
  return correctAns;
};

let correctAns = setEverything();
btns.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.textContent == correctAns) {
      const currLevel = parseInt(levelText.textContent);
      score += currLevel;
      if (score > hiscore) {
        hiscore = score;
      }
    } else {
      score = 0;
    }
    scoreText.textContent = score;
    hiscoreText.textContent = hiscore;
    correctAns = setEverything();
  });
});

incrLevel.addEventListener("click", () => {
  const currLevel = parseInt(levelText.textContent);
  if (currLevel < 3) {
    level = level * 10;
    correctAns = setEverything();
    levelText.textContent = currLevel + 1;
  }
});
decrLevel.addEventListener("click", () => {
  const currLevel = parseInt(levelText.textContent);
  if (currLevel > 1) {
    level = Math.floor(level / 10);
    correctAns = setEverything();
    levelText.textContent = currLevel - 1;
  }
});
