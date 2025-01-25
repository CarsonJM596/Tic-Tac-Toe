const cell = document.querySelectorAll(".cell");
const status = document.querySelector("#status");
const restart = document.querySelector("#restart");
const winCon = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
] //All pssible win conditions in tic tac toe
let options = ["", "", "", "", "", "", "", "", "",]
let currPlayer = "X";
let running = false;

startGame();
function startGame(){
    cell.forEach(cell => cell.addEventListener("click", cellClicked));
    restart.addEventListener("click", restartGame);
    status.textContent = `${currPlayer}'s turn`;
    running = true;
};
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != [""] || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWin();
}
function updateCell(cell, index){
    options[index] = currPlayer;
    cell.textContent = currPlayer;
}
function changePlayer(){
    currPlayer = (currPlayer == "X") ? "O" : "X"; //Sets player to O if player was equal to X
    status.textContent = `${currPlayer}'s turn`;
}
function checkWin(){
    let roundWon = false;

    for(let i = 0;  i < winCon.length; i++){
        const con = winCon[i];
        const cellA = options[con[0]];
        const cellB = options[con[1]];
        const cellC = options[con[2]];

        if (cellA == "" || cellB == "" || cellC == ""){ //If surrounding cells are empty, continue
            continue;
        }
        if (cellA == cellB && cellB == cellC){ //If surrounding cells are equal round has been won
            roundWon = true;
            break;
        }
    }

    if (roundWon){ //If round won then current player has won 
        status.textContent = `${currPlayer} wins!`;
        running = false;
        restartGame();
    }
    else if(!options.includes("")){ //If there are no empty spaces then it's a draw
        status.textContent = `It's a draw!`;
        running = false;
    }
    else { //Otherwse its next players turn 
        changePlayer();
    }
}
function restartGame(){
    currPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "",]
    status.textContent = `${currPlayer}'s turn`;
    cell.forEach(cell => cell.textContent = "");
    running = true;
}