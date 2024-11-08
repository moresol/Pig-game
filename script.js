'use strict';

/* ------------------------------------------------------------------ Selectors*/
// Image of a dice roll cube in the middle of the screen
const imageDice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player = document.querySelectorAll('.player');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');

const score = document.querySelectorAll('.score');
const scoreEl0 = document.getElementById('score--0');
const scoreEl1 = document.getElementById('score--1');

const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
/* ------------------------------------------------------------------ Selectors*/
let scoreArr = [0, 0];
let scoreCurrent = 0;

const init = function () {
  score.forEach(el => (el.textContent = 0));
  currentEl0.textContent = scoreCurrent;
  currentEl1.textContent = scoreCurrent;
  imageDice.classList.add('hidden');
};
init();

btnRoll.addEventListener('click', () => {
  const randomDice = Math.trunc(Math.random() * 6 + 1);
  imageDice.src = `dice-${randomDice}.png`;
  imageDice.classList.remove('hidden');

  if (randomDice !== 1) {
    scoreCurrent += randomDice;
    if (playerEl0.classList.contains('player--active')) {
      currentEl0.textContent = scoreCurrent;
    } else {
      currentEl1.textContent = scoreCurrent;
    }
  } else {
    scoreCurrent = 0;
    currentEl0.textContent = scoreCurrent;
    currentEl1.textContent = scoreCurrent;
    player.forEach(el => el.classList.toggle('player--active'));
  }
});

btnHold.addEventListener('mouseup', () => {
  if (playerEl0.classList.contains('player--active')) {
    scoreArr[0] += scoreCurrent;
    scoreEl0.textContent = scoreArr[0];
    scoreCurrent = 0;
    currentEl0.textContent = scoreCurrent;
    if (scoreEl0.textContent >= 100) {
      playerEl0.classList.add('player--winner');
      imageDice.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
    } else {
      playerEl0.classList.remove('player--active');
      playerEl1.classList.add('player--active');
    }
  } else if (playerEl1.classList.contains('player--active')) {
    scoreArr[1] += scoreCurrent;
    scoreEl1.textContent = scoreArr[1];
    scoreCurrent = 0;
    currentEl1.textContent = scoreCurrent;
    if (scoreEl1.textContent >= 100) {
      playerEl1.classList.add('player--winner');
      imageDice.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
    } else {
      playerEl1.classList.remove('player--active');
      playerEl0.classList.add('player--active');
    }
  }
});

btnNew.addEventListener('click', () => {
  scoreArr = [0, 0];
  scoreCurrent = 0;
  imageDice.classList.add('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
  player.forEach(el => el.classList.remove('player--winner'));
  score.forEach(el => (el.textContent = 0));
  playerEl0.classList.add('player--active');
  playerEl1.classList.remove('player--active');
  init;
  console.log(scoreArr, scoreCurrent);
});
