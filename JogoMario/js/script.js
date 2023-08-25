const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const backgroundMusic = document.getElementById('background-music');
const deathMusic = document.getElementById('death-music');
const scoreElement = document.getElementById('score');

let isJumping = false;
let gameOver = false;
let score = 0;
let canScore = true;

const jump = (event) => {
  if (event.key === ' ' && !isJumping && !gameOver) {
    isJumping = true;
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
      isJumping = false;
    }, 500);
  }
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './images/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    // Tocar a música de morte
    backgroundMusic.pause();
    deathMusic.play();

    gameOver = true;
    clearInterval(loop);
  } else if (pipePosition <= 0 && !gameOver && canScore) {
    // O Mario passou pelo cano com sucesso
    score++;
    scoreElement.textContent = score;
    canScore = false; // Impede que a pontuação seja incrementada novamente no mesmo pulo
  } else if (pipePosition > 0 && !canScore) {
    canScore = true; // Permite que a pontuação seja incrementada novamente
  }
}, 10);

document.addEventListener('keydown', jump);




startButton.addEventListener('click', () => {
  startButton.style.display = 'none';
  backgroundMusic.play();
});
