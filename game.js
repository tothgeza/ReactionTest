initGame();

function initGame() {
    initLeftClick();
    initCrossHair();
    // startGame();
    // Your game can start here, but define separate functions, don't write everything in here :)

}

function initLeftClick() {
    let cells = document.querySelectorAll(".col");
    for (let cell of cells) {
        cell.addEventListener("click", leftClick);
    }
    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", startClick);
}

function leftClick(event) {
    if (event.currentTarget.classList.contains("target")) {
        console.log("True");
        score.round1.score= event.currentTarget.dataset.round;
    } else {
        console.log("False");
    }
}

function startClick() {
    startGame()
}

function gameOver() {
    animationMoveOut();
    setTimeout(() => {
        animationMoveIn();
    }, 1000)
}

function animationMoveOut() {
    let main = document.querySelector(".main"),
        startButton = document.querySelector(".start-button");
    main.classList.remove("animate__fadeInLeftBig");
    main.classList.add("animate__fadeOutLeftBig");
    startButton.classList.remove("animate__fadeInUpBig");
    startButton.classList.add("animate__fadeOutUpBig");
}

function animationMoveIn() {
    let main2 = document.querySelector(".main2");
    main2.style.display = "block";
    main2.classList.add("animate__fadeInRightBig");
}

function initCrossHair() {
    let main = document.querySelector(".main");
    main.style.cursor = "cell";
}

function setRound(round) {
    let cells = document.querySelectorAll(".col");
    for (let cell of cells) {
        cell.dataset.round = round;
    }
}

function startGame() {
    let cells = document.getElementsByClassName("col"),
        round = 0,
        points = 0;
    const interval = setInterval(function () {
        if (round === 1) {
            clearInterval(interval);
            gameOver();
        }
        setRound(round);
        const targetCell = document.querySelector(".target");
        if (targetCell !== null && targetCell.classList.contains("target")) {
            targetCell.classList.remove("target");
        }
        let randomNum = (Math.random() * cells.length) | 0;
        cells[randomNum].classList.add("target-bg", "target");
        // start timer
        setTimeout(() => {
            cells[randomNum].classList.remove("target-bg");
        }, 500)
        round += 1;
    }, 3500)
}

let score = {
    round1: {
        score: 0,
        time: 3
    },
    round2: {
        score: 0,
        time: 3
    },
    round3: {
        score: 0,
        time: 3
    },
    round4: {
        score: 0,
        time: 3
    },
    round5: {
        score: 0,
        time: 3
    },
    round6: {
        score: 0,
        time: 3
    },
    round7: {
        score: 0,
        time: 3
    },
    round8: {
        score: 0,
        time: 3
    },
    round9: {
        score: 0,
        time: 3
    },
    round10: {
        score: 0,
        time: 3
    },

}