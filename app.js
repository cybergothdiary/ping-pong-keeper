const resetBtn = document.querySelector('#reset-button')
const score = document.querySelector('#score')
const names = document.querySelector('#p-names')
const pNamesInput = document.querySelectorAll('input[type="text"]')
const winScoreInput = document.querySelector('input[name="winScoreInput"]')
const players = {
    p1: {
        name: 'Player 1',
        score: 0,
        btn: document.querySelector('#p1-button'),
        displayScore: score.children[0],
        displayName: names.children[0]
    },
    p2: {
        name: 'Player 2',
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

function updateTable(winner) {
    const table = document.querySelector('.score-table')
    const newRow = document.createElement('tr')
    const newNameP1 = Object.assign(document.createElement('td'), {innerText: `${players.p1.name}`})
    const newNameP2 = Object.assign(document.createElement('td'), {innerText: `${players.p2.name}`})
    const newScore = Object.assign(document.createElement('td'), {innerText: `${players.p1.score}:${players.p2.score}`})
    const newWinner = Object.assign(document.createElement('td'), {innerText: `${winner.name}`})
    newRow.append(newNameP1, newNameP2, newScore, newWinner)
    table.append(newRow)
}

function addScore(winner, loser) {
    if (!isOver) {
        winner.score++
        updateScore(winner)

        if (winner.score === winScore) {
            isOver = true
            updateTable(winner)
            winner.displayScore.classList.toggle('winner')
            loser.displayScore.classList.toggle('loser')
            for (let i of [players.p1, players.p2]) {
                i.btn.classList.toggle('disabled')
                i.btn.disabled = true
            }
        }
    }
}

players.p1.btn.addEventListener('click', () => addScore(players.p1, players.p2))
players.p2.btn.addEventListener('click', () => addScore(players.p2, players.p1))
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
        if (!pNamesInput[i].value) {
            if (i === 0) {
                players.p1.displayName.innerText = 'Player 1'
                players.p1.name = 'Player 1'
            } else if (i === 1) {
                players.p2.displayName.innerText = 'Player 2'
                players.p2.name = 'Player 2'
            } else {
                players.p1.displayName.innerText = 'Player 1'
                players.p2.displayName.innerText = 'Player 2'
                players.p1.name = 'Player 1'
                players.p2.name = 'Player 2'
            }
            
            
        } else if (i === 0) {
            players.p1.displayName.innerText = pNamesInput[i].value
            players.p1.name = pNamesInput[i].value
        } else {
            players.p2.displayName.innerText = pNamesInput[i].value
            players.p2.name = pNamesInput[i].value
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