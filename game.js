initGame();

function initGame() {
    initLeftClick();
    initCrossHair();
    // Your game can start here, but define separate functions, don't write everything in here :)

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
}

function leftClick(event) {
    let clickTime = Date.now(),
        cell = event.currentTarget;
    if (cell.classList.contains("target")) {
        let roundCurrent = "Round" + event.currentTarget.dataset.round.toString(),
            showTime = sessionStorage.getItem("showTime");
        localStorage.setItem(roundCurrent, clickTime - showTime);
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
    startGame();
}

function clickOnAgain() {
    animationAgainButtonMoveOut();
    animationResultsMoveOut();
    setTimeout(() => {
        animationGameMoveIn();
        animationStartButtonMoveIn();
    }, 1000);
}

function gameOver() {
    animationGameMoveOut();
    setTimeout(() => {
        animationResultsMoveIn();
        animationAgainButtonMoveIn();
    }, 1000)
    setResults();

}

function animationAgainButtonMoveIn() {
    let againButton = document.querySelector(".again-button"),
        startButton = document.querySelector(".start-button");
    startButton.style.display = "none";
    againButton.classList.remove("hide");
    againButton.classList.remove("animate__fadeOutDownBig");
    againButton.classList.add("animate__fadeInUpBig");
    againButton.style.display = "inline-block";
}

function animationAgainButtonMoveOut() {
    let againButton = document.querySelector(".again-button");
    againButton.classList.remove("animate__fadeInUpBig");
    againButton.classList.add("animate__fadeOutDownBig");
}

function animationStartButtonMoveIn() {
    let startButton = document.querySelector(".start-button"),
        againButton = document.querySelector(".again-button");
    againButton.style.display = "none";
    startButton.classList.remove("animate__fadeOutDownBig");
    startButton.classList.add("animate__fadeInUpBig");
    startButton.style.display = "inline-block";
}

function animationStartButtonMoveOut() {
    let startButton = document.querySelector(".start-button");
    startButton.classList.remove("animate__fadeInUpBig");
    startButton.classList.add("animate__fadeOutDownBig");

}

function animationGameMoveOut() {
    let container = document.querySelector(".container");
    container.classList.remove("animate__fadeInLeftBig");
    container.classList.add("animate__fadeOutLeftBig");
}

function animationResultsMoveIn() {
    let container2 = document.querySelector(".container2"),
        container = document.querySelector(".container");
    container2.style.display = "block";
    container.style.display = "none";
    container2.classList.remove("animate__fadeOutRightBig");
    container2.classList.add("animate__fadeInRightBig");
}

function animationResultsMoveOut() {
    let container2 = document.querySelector(".container2");
    container2.classList.remove("animate__fadeInRightBig");
    container2.classList.add("animate__fadeOutRightBig");
}

function animationGameMoveIn() {
    let container = document.querySelector(".container"),
        container2 = document.querySelector(".container2");
    container2.style.display = "none";
    container.style.display = "grid";
    container.classList.remove("animate__fadeOutLeftBig");
    container.classList.add("animate__fadeInLeftBig");
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

function setResults() {
    let results = allResults(),
        points = 0;
    for (const [index, result] of results.entries()) {
        let actualRow = document.querySelector(`tbody tr:nth-child(${index + 1})`),
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
        thirdCell.innerHTML = "<td>" + actualPoint.toString() + "</td>";
    }
    let lastRow = document.querySelector(`tbody tr:last-child`),
        firstCell = lastRow.querySelector('td:nth-child(1)'),
        lastCell = lastRow.querySelector('td:nth-child(3)');
    firstCell.innerHTML = "<td>Points</td>";
    lastCell.innerHTML = "<td>" + points.toFixed(3).toString() + "</td>";

}

function startGame() {
    let cells = document.getElementsByClassName("col"),
        round = 0;
    localStorage.clear();
    sessionStorage.clear();
    const interval = setInterval(function () {
        if (round === 9) {
            clearInterval(interval);
            setTimeout(() => {
                gameOver();
            }, 1500)

        }
        setRound(round);
        const targetCell = document.querySelector(".target");
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
    }, 1500)
}

function allResults() {
    let results = [],
        counter = 0;
    for (let index = 0; index < 10; index++) {
        let key = "Round" + index.toString(),
            tempArray = [];
        if (localStorage.hasOwnProperty(key)) {
            tempArray.push(counter + 1, "Hit", localStorage.getItem(key))
        } else {
            tempArray.push(counter + 1, "Miss", "3")
        }
        counter += 1;
        results.push(tempArray);
    }
    return results;
}