initGame();
let scoreBoard = [];
let roundsResult = {};

function initGame() {
    // Your game can start here, but define separate functions, don't write everything in here :)
    initLeftClick();
    initCrossHair();
    setTimeout(() => {
        animationGameTitleIn();
    }, 150);
}

function initLeftClick() {
    let cells = document.querySelectorAll(".col");
    for (let cell of cells) {
        cell.addEventListener("click", leftClick);
    }
    let startButton = document.querySelector(".start-button");
    startButton.addEventListener("click", clickOnStart);
    let againButton = document.querySelector(".again-button");
    againButton.addEventListener("click", clickOnAgain);
    let scoreButton = document.querySelector(".score-button");
    scoreButton.addEventListener("click", clickOnScoreBoard);
    let backButton = document.querySelector(".back-button");
    backButton.addEventListener("click", clickOnBack);
}

function animationGameTitleIn() {
    let title = document.querySelector(".title");
    title.classList.add("animate__fadeInDownBig");
}

function leftClick(event) {
    let clickTime = Date.now(),
        cell = event.currentTarget;
    if (cell.classList.contains("target")) {
        let roundCurrent = "Round" + event.currentTarget.dataset.round.toString(),
            showTime = sessionStorage.getItem("showTime");
        roundsResult [roundCurrent] = clickTime - showTime;
        cell.classList.add("hit-bg");
        setTimeout(() => {
            cell.classList.remove("hit-bg");
        }, 150);
    } else {
        cell.classList.add("miss-bg");
        setTimeout(() => {
            cell.classList.remove("miss-bg");
        }, 150);
    }
}

function clickOnStart() {
    animationStartButtonMoveOut();
    animationScoreButtonMoveOut();
    startGame();
}

function clickOnAgain() {
    animationAgainButtonMoveOut();
    animationResultsMoveOut();
    setTimeout(() => {
        animationBoardMoveIn();
        animationStartButtonMoveIn();
        animationScoreButtonMoveIn();
    }, 250);
}

function clickOnScoreBoard() {
    animationStartButtonMoveOut();
    animationScoreButtonMoveOut();
    animationBoardMoveOut();
    setTimeout(() => {
        animationBackButtonMoveIn();
        animationScoreBoardMoveIn();
        setScoreBoard();
    }, 250);
}

function clickOnBack() {
    animationScoreBoardMoveOut();
    animationBackButtonMoveOut();
    setTimeout(() => {
        animationScoreButtonMoveIn();
        animationBoardMoveIn();
        animationStartButtonMoveIn();
    }, 250);
}

function gameOver() {
    getPlayerName()
        .then(setResults)
        .then(animationBoardMoveOut);
    setTimeout(() => {
        animationResultsMoveIn();
        animationAgainButtonMoveIn();
    })
}

function animationBackButtonMoveIn() {
    let backButton = $(".back-button");
    backButton.style.display = "inline-block";
    backButton.classList.remove("animate__fadeOutDownBig");
    backButton.classList.add("animate__fadeInUpBig");
}

function animationBackButtonMoveOut() {
    let backButton = $(".back-button");
    backButton.classList.remove("animate__fadeInUpBig");
    backButton.classList.add("animate__fadeOutDownBig");
    setTimeout(() => {
        backButton.style.display = "none";
    }, 250);
}


function animationScoreButtonMoveIn() {
    let scoreButton = $(".score-button");
    scoreButton.classList.remove("animate__fadeOutUpBig");
    scoreButton.classList.add("animate__fadeInDownBig");
}

function animationScoreButtonMoveOut() {
    let scoreButton = $(".score-button");
    scoreButton.classList.remove("animate__fadeInDownBig");
    scoreButton.classList.add("animate__fadeOutUpBig");
}

function animationAgainButtonMoveIn() {
    let againButton = $(".again-button");
    againButton.style.display = "inline-block";
    againButton.classList.remove("animate__fadeOutDownBig");
    againButton.classList.add("animate__fadeInUpBig");
}

function animationAgainButtonMoveOut() {
    let againButton = $(".again-button");
    againButton.classList.remove("animate__fadeInUpBig");
    againButton.classList.add("animate__fadeOutDownBig");
    setTimeout(() => {
        againButton.style.display = "none";
    }, 250);
}

function animationStartButtonMoveIn() {
    let startButton = $(".start-button");
    startButton.style.display = "inline-block";
    startButton.classList.remove("animate__fadeOutDownBig");
    startButton.classList.add("animate__fadeInUpBig");
}

function animationStartButtonMoveOut() {
    let startButton = $(".start-button");
    startButton.classList.remove("animate__fadeInUpBig");
    startButton.classList.add("animate__fadeOutDownBig");
    setTimeout(() => {
        startButton.style.display = "none";
    }, 250);
}

function animationBoardMoveIn() {
    let board = $("#board");
    board.classList.remove("animate__fadeOutLeftBig");
    board.style.display = "grid";
    board.classList.add("animate__fadeInLeftBig");
}

function animationBoardMoveOut() {
    let container = $("#board");
    container.classList.remove("animate__fadeInLeftBig");
    container.classList.add("animate__fadeOutLeftBig");
    setTimeout(() => {
        container.style.display = "none";
    }, 250);
}

function animationResultsMoveIn() {
    let results = $("#results");
    results.style.display = "block";
    results.classList.remove("animate__fadeOutRightBig");
    results.classList.add("animate__fadeInRightBig");
}

function animationResultsMoveOut() {
    let results = $("#results");
    results.classList.remove("animate__fadeInRightBig");
    results.classList.add("animate__fadeOutRightBig");
    setTimeout(() => {
        results.style.display = "none";
    }, 250);
}

function animationScoreBoardMoveIn() {
    let scoreBoard = $("#score-board");
    scoreBoard.style.display = "block";
    scoreBoard.classList.remove("animate__fadeOutRightBig");
    scoreBoard.classList.add("animate__fadeInRightBig");
}

function animationScoreBoardMoveOut() {
    let scoreBoard = $("#score-board");
    scoreBoard.classList.remove("animate__fadeInRightBig");
    scoreBoard.classList.add("animate__fadeOutRightBig");
    setTimeout(() => {
        scoreBoard.style.display = "none";
    }, 250);
}

function setScoreBoard() {
    let tbody = $(".container3 tbody");
    // first clear scoreboard
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild);
    }
    for (const [index, score] of scoreBoard.slice(0, 10).entries()) {
        let tr = document.createElement("tr");
        tr.insertAdjacentHTML(
            'beforeend',
            `<td>${index + 1}</td>
                  <td>${score[0]}</td>
                  <td>${parseFloat(score[1]).toFixed(3).toString()}</td>`
        );
        tbody.appendChild(tr);
    }
}

function initCrossHair() {
    let main = $(".main");
    main.style.cursor = "cell";
}

function setRound(round) {
    let cells = document.querySelectorAll(".col");
    for (let cell of cells) {
        cell.dataset.round = round;
    }
}

function setResults(playerName) {
    let results = allResults(),
        points = 0;
    for (const [index, result] of results.entries()) {
        let actualRow = $(`.container2 tbody tr:nth-child(${index + 1})`),
            firstCell = actualRow.querySelector('td:nth-child(1)'),
            actualPoint = parseInt(result[2]);
        if (actualPoint !== 3) {
            actualPoint /= 1000;
            points += actualPoint;
        } else {
            points += actualPoint
        }
        firstCell.innerHTML = "<td>" + (result[0]) + "</td>";
        let secondCell = actualRow.querySelector('td:nth-child(2)');
        secondCell.innerHTML = "<td>" + (result[1]) + "</td>";
        let thirdCell = actualRow.querySelector('td:nth-child(3)');
        thirdCell.innerHTML = "<td>" + actualPoint.toFixed(3).toString() + "</td>";
    }
    let lastRow = $(`tbody tr:last-child`),
        firstCell = lastRow.querySelector('td:nth-child(1)'),
        lastCell = lastRow.querySelector('td:nth-child(3)');
    firstCell.innerHTML = "<td>Points</td>";
    lastCell.innerHTML = "<td>" + points.toFixed(3).toString() + "</td>";
    // let playerName = prompt("Please enter your name");
    if (playerName != null) {
        let tempScore = [playerName, points.toFixed(3)];
        refreshScoreBoard(tempScore);
    }
    return Promise.resolve();
}

function getPlayerName() {
    return new Promise((resolve) => {
        let playerName = prompt("Please enter your name");
        resolve(playerName);
    });
}

function refreshScoreBoard(newScore) {
    scoreBoard.push(newScore);
    scoreBoard.sort(function (a, b) {
        return a[1] - b[1];
    })
}

function startGame() {
    let cells = document.getElementsByClassName("col"),
        round = 0;
    roundsResult = {};
    sessionStorage.clear();
    const interval = setInterval(function () {
        if (round === 9) {
            clearInterval(interval);
            setTimeout(() => {
                gameOver();
            }, 1500)
        }
        setRound(round);
        const targetCell = $(".target");
        if (targetCell !== null && targetCell.classList.contains("target")) {
            targetCell.classList.remove("target");
        }
        let randomNum = (Math.random() * cells.length) | 0;
        cells[randomNum].classList.add("target-bg", "target");
        // start timer
        let showTime = Date.now();
        sessionStorage.setItem("showTime", showTime);
        setTimeout(() => {
            cells[randomNum].classList.remove("target-bg");
        }, 250)
        round += 1;
    }, 500)
}

function allResults() {
    let results = [],
        counter = 0;
    for (let index = 0; index < 10; index++) {
        let key = "Round" + index.toString(),
            tempArray = [];
        if (key in roundsResult) {
            tempArray.push(counter + 1, "Hit", roundsResult[key])
        } else {
            tempArray.push(counter + 1, "Miss", "3")
        }
        counter += 1;
        results.push(tempArray);
    }
    return results;
}

function $(selector) {
    return document.querySelector(selector);
}