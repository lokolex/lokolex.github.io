'use strict';
window.addEventListener('DOMContentLoaded', function() {
    const btnRoll = document.querySelector('.btn--roll'),
    btnHold = document.querySelector('.btn--hold'),
    btnNew = document.querySelector('.btn--new'),
    dice = document.querySelector('.dice'),
    player1 = document.querySelector('.player--0'),
    player2 = document.querySelector('.player--1'),
    current1 = document.querySelector('#current--0'),
    current2 = document.querySelector('#current--1'),
    score1 = document.querySelector('#score--0'),
    score2 = document.querySelector('#score--1');

    score1.textContent = 0;
    score2.textContent = 0;

    let sum = 0;
    let total = 0;
    let total2 = 0;
    let total1 = 0;


    function rollDice(atr) {
        let rand = Math.trunc(Math.random() * 6) + 1;
        sum += rand;
        switch(rand) {
            case 1:
                sum = 0;
                dice.src = 'dice1.png';
                if (player1.classList.contains('player--active')) {
                    player1.classList.remove('player--active');
                    player2.classList.add('player--active');
                    savePoints(current1); 
                    score1.textContent = total1;
                } else {
                    player2.classList.remove('player--active');
                    player1.classList.add('player--active');
                    savePoints(current2); 
                    score2.textContent = total2;     
                }
                break;
            case 2:
                dice.src = 'dice2.png';
                break;
            case 3:
                dice.src = 'dice3.png';
                break;
            case 4:
                dice.src = 'dice4.png';
                break;
            case 5:
                dice.src = 'dice5.png';
                break;
            case 6:
                dice.src = 'dice6.png';
                break;
        }
        atr.textContent = sum;
        dice.classList.remove('hidden');
    }

    function savePoints(cur) {
        total += sum;
        total1 = total - total1;
        total2 = total - total2;
        sum = 0;
        cur.textContent = sum;
    }

    const deleteRoll = () => {
        if (total1 >= 100 || total2 >= 100) {
            btnRoll.removeEventListener('click', deleteRoll);
        } else {
            if (player1.classList.contains('player--active')) {
                rollDice(current1);
            } else {
                rollDice(current2);
            }
        }
    };

    btnRoll.addEventListener('click', deleteRoll);

    const deleteHold = () => {
        if (total1 >= 100 || total2 >= 100) {
            btnHold.removeEventListener('click', deleteHold);
        } else {
            if (player1.classList.contains('player--active')) {
                savePoints(current1); 
                score1.textContent = total1;
                if (total1 >= 100) {
                    player1.classList.add('player--winner');
                } else {
                    player1.classList.remove('player--active');
                    player2.classList.add('player--active');
                }
                
            } else {
                savePoints(current2); 
                score2.textContent = total2; 
                if (total2 >= 100) {
                    player2.classList.add('player--winner');   
                } else {
                    player2.classList.remove('player--active');
                    player1.classList.add('player--active');
                }
            }
        }
    };

    btnHold.addEventListener('click', deleteHold);

    function clearGame() {
        total = 0;
        total1 = 0;
        total2 = 0;
        sum = 0;
        current1.textContent = sum;
        current2.textContent = sum;
        score1.textContent = total1;
        score2.textContent = total2;
        player1.classList.remove('player--winner');
        player2.classList.remove('player--winner');
        dice.classList.add('hidden');
        if (player2.classList.contains('player--active')) {
            player2.classList.remove('player--active');
            player1.classList.add('player--active');
        }
        btnRoll.addEventListener('click', deleteRoll);
        btnHold.addEventListener('click', deleteHold);
    }

    btnNew.addEventListener('click', clearGame);
});