/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var activePlayer;
activePlayer = 0;

var roundScore = 0;


//console.log(dice);

//find html element by id and set its text content
//document.querySelector('#current-' +  activePlayer).textContent = dice;

//document.querySelector('#current-' +  activePlayer).textContent = '<em>' + dice + '<em>';
//document.querySelector('#current-' +  activePlayer).innerHTML = '<em>' + dice + '<em>';

document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function () {
    var dice;
    dice = Math.floor(Math.random() * 6) + 1;
    var imageDom = document.querySelector('.dice'); //
    imageDom.src = 'dice-' + dice + '.png';   //

    if (dice == 1) {
        roundScore = 0;  //set roundScore to Zero and reflect in UI as below
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        // To change active player
        // if(activePlayer === 1){
        //     activePlayer = 0;
        //    // roundScore = 0;
        // } else {
        //     activePlayer = 1;
        //     // roundScore = 0;
        // }   
        activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
        // roundScore = 0;
       // roundScore = roundScore + dice;
        
        console.log(roundScore);
    } else {
        roundScore = roundScore + dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
        console.log(roundScore);
    }
});
