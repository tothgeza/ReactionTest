initGame();

function initGame() {
    startGame();
    // Your game can start here, but define separate functions, don't write everything in here :)

}
function initLeftClick() {
    let cells = document.querySelectorAll("col");
    for (let cell of cells) {
        cell.addEventListener('click', leftClick(event))
    }
}
function leftClick(event) {
    if (event.currentTarget.classList.contains("target-bg")) {
        console.log("Találat");
    }
}

function startGame(){
    let cells = document.getElementsByClassName("col");
    console.log(cells)
    const interval = setInterval(function(){
        let randomNum = (Math.random() * cells.length) | 0;
        console.log(randomNum);
        cells[randomNum].classList.toggle("target-bg");
        // start timer
        setTimeout(() => {cells[randomNum].classList.toggle("target-bg"); }, 500)
    },3500 )
}