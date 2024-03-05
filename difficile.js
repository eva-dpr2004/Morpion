// Loader ♥
window.addEventListener("load",() => {
    const loader = document.querySelector(".loader");
    //Remove ♥
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend" , () =>{
        document.body.removeChild("loader");
    })
})

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
// combinaisons gagnantes ♥
const winConditions = [
    //lignes
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    //colonne
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    //diagonale
    [0, 5, 10, 15],
    [12, 9, 6, 3],
];

let options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

verif();
function verif(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer} tour`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
// Changement de joueur ♥
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer} tour`;
}
// Vérif du gagnant ♥ 
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    const cellD = options[condition[3]];

    if(cellA == "" || cellB == "" || cellC == "" || cellD == ""){
    continue;
    }
    if(cellA == cellB && cellB == cellC && cellC == cellD){
    roundWon = true;
    break;
    }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} Gagne `;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Egalité!`;
        running = false;
    }
    else{
        changePlayer();
    }
}
// Bouton pour recommencer ♥ 
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} tour`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}