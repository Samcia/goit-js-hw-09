const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let changeColor = 0;

document.getElementById;

const getRandomHexColor = () =>
  (document.body.style.backgroundColor = `#${Math.floor(
    Math.random() * 16777215
  ).toString(16)}`);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  changeColor = setInterval(() => getRandomHexColor(), 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(changeColor);
});
