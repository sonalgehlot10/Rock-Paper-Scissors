let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if(score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isautoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isautoPlaying){
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
    isautoPlaying = true;
  } else {
    clearInterval(intervalId);
    isautoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper')
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p'){
    playGame('paper');
  } else if(event.key === 's'){
    playGame('scissors');
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'scissors'){
      if (computerMove === 'rock') {
        result = 'you lose';
      } else if (computerMove === 'paper') {
        result = 'you won';
      } else if (computerMove === 'scissors') {
        result = 'It is a tie';
      }
  } else if (playerMove === 'paper'){
      if (computerMove === 'rock') {
        result = 'you won';
      } else if (computerMove === 'paper') {
        result = 'It is a tie';
      } else if (computerMove === 'scissors') {
        result = 'you lose';
      }
  } else if (playerMove === 'rock'){
      if (computerMove === 'rock') {
        result = 'It is a tie';
      } else if (computerMove === 'paper') {
        result = 'you lose';
      } else if (computerMove === 'scissors') {
        result = 'you won';
      }
  }

  if(result === 'you won'){
    score.wins += 1;
  } else if (result === 'you lose'){
    score.losses += 1;
  } else if (result === 'It is a tie'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').
  innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You 
    <img class="move-icon" src="${playerMove}-emoji.png">
    <img class="move-icon" src="${computerMove}-emoji.png">
    Computer`;

}


  document.querySelector('.js-result').
    innerHTML = result;


function updateScoreElement(){
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = ''; 

  if(randomNumber >=0 && randomNumber < 1/3 ){
    computerMove = 'rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove = 'paper';
  } 
  else if (randomNumber >=2/3 && randomNumber < 1){
    computerMove = 'scissors';
  }
  return computerMove;
}