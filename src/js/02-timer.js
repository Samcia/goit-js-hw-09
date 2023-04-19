import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dataPicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

let countDown = null;
let pickedDate = 0;
let millisecondsLeft = 0;
let timeLeft = {};
startBtn.disabled = true;

const convertsMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  if (value < 10) return value.toString().padStart(2, '0');
  return value;
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    pickedDate = selectedDates[0].getTime();
    millisecondsLeft = pickedDate - new Date().getTime();
    if (millisecondsLeft < 0)
      return Notiflix.Report.failure('Please choose a date in the future!');
    startBtn.disabled = false;
  },
};

flatpickr(dataPicker, options);
startBtn.addEventListener('click', () => {
  millisecondsLeft = pickedDate - new Date().getTime();
  clearInterval(countDown);
  countDown = setInterval(() => updateTimeLeft(), 1000);
  starBtn.disabled = true;
});
const endCountdown = () => {
  clearInterval(countDown);
  daysLeft.textContent = '00';
  hoursLeft.textContent = '00';
  minutesLeft.textContent = '00';
  secondsLeft.textContent = '00';
};
const updateTimeLeft = () => {
  timeLeft = convertsMs(millisecondsLeft);
  daysLeft.textContent = addLeadingZero(timeLeft.days);
  hoursLeft.textContent = addLeadingZero(timeLeft.hours);
  minutesLeft.textContent = addLeadingZero(timeLeft.minutes);
  secondsLeft.textContent = addLeadingZero(timeLeft.seconds);
  millisecondsLeft -= 1000;
  if (millisecondsLeft < 0) {
    endCountdown();
    Notiflix.Report.success('The countdown has ended!', 'Thank you!');
  }
};
