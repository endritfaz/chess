(document.documentElement).className = "dark";

function colorSquare(square) {
    let column = parseInt(square.id[0]);
    let row = parseInt(square.id[1]);
    let positionSum = row + column;

    if (positionSum % 2 == 0) {
        square.style.backgroundColor = "#739552";
    }

    else {
        square.style.backgroundColor = "#ebecd0";
    }

}

const board = document.querySelector("#board");

for (let row = 8; row > 0; row--) {
    for (let column = 1; column < 9; column++) {
        let square = document.createElement("div");
        square.id = `${column}${row}`;
        colorSquare(square);
        
        
        board.appendChild(square);


    }
}