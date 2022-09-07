const resetBtn = document.querySelector('#reset-button')
const score = document.querySelector('#score')
const players = {
    p1: {
        score: 0,
        btn: document.querySelector('#p1-button'),
        displayScore: score.children[0]
    },
    p2: {
        score: 0,
        btn: document.querySelector('#p2-button'),
        displayScore: score.children[1]
    }
}

let isOver = false;
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

players.p1.btn.addEventListener('click', () => {
    if (!isOver) {
        players.p1.score++
        updateScore(players.p1)

        if (players.p1.score === winScore) {
            isOver = true
            players.p1.displayScore.classList.toggle('winner')
            players.p2.displayScore.classList.toggle('loser')
            for (let i of [players.p1, players.p2]) {
                i.btn.classList.toggle('disabled')
                i.btn.disabled = true
            }
        }
    }
})

players.p2.btn.addEventListener('click', () => {
    if (!isOver) {
        players.p2.score++
        updateScore(players.p2)

        if (players.p2.score === winScore) {
            isOver = true
            players.p1.displayScore.classList.toggle('loser')
            players.p2.displayScore.classList.toggle('winner')
            for (let i of [players.p1, players.p2]) {
                i.btn.classList.toggle('disabled')
                i.btn.disabled = true
            }
        }
    }
})

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