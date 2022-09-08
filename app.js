const resetBtn = document.querySelector('#reset-button')
const score = document.querySelector('#score')
const names = document.querySelector('#p-names')
const pNamesInput = document.querySelectorAll('input[type="text"]')
const winScoreInput = document.querySelector('input[name="winScoreInput"]')
const players = {
    p1: {
        score: 0,
        btn: document.querySelector('#p1-button'),
        displayScore: score.children[0],
        displayName: names.children[0]
    },
    p2: {
        score: 0,
        btn: document.querySelector('#p2-button'),
        displayScore: score.children[1],
        displayName: names.children[1]
    }
}

let isOver = false
let winScore = 5

function updateScore(player) {
    if (!player) {
        for (let i of [players.p1, players.p2]) {
            i.displayScore.innerText = 0
        }
    } else {
        player.displayScore.innerText = player.score
    }
}

function addScore(player) {
    if (!isOver) {
        player.score++
        updateScore(player)

        if (player.score === winScore) {
            isOver = true
            player.displayScore.classList.toggle('winner')
            player.displayScore.classList.toggle('loser')
            for (let i of [players.p1, players.p2]) {
                i.btn.classList.toggle('disabled')
                i.btn.disabled = true
            }
        }
    }
}

players.p1.btn.addEventListener('click', () => addScore(players.p1))
players.p2.btn.addEventListener('click', () => addScore(players.p2))
resetBtn.addEventListener('click', () => {
    for (let i of [players.p1, players.p2]) {
        i.score = 0
        i.btn.classList.remove('disabled')
        i.displayScore.classList.remove('winner', 'loser')
        i.btn.disabled = false
    }
    isOver = false
    updateScore()
})

for (let i = 0; i < 2; i++) { // Names Input
    pNamesInput[i].addEventListener('input', () => {
        if (i === 0) {
            players.p1.displayName.innerText = pNamesInput[i].value
        } else {
            players.p2.displayName.innerText = pNamesInput[i].value
        }
    })
}

winScoreInput.addEventListener('input', event => { // Maximum Score Input
    if (winScoreInput.value > 0) {
        winScore = parseInt(winScoreInput.value)
    } else {
        winScoreInput.value = ''
    }
})