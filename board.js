const WHITE_PAWN = "&#x2659;";
const WHITE_PIECES = ["&#x2656;", "&#x2658;", "&#x2657;", "&#x2655;", "&#x2654;", "&#x2657;", "&#x2658;", "&#x2656;"]

const BLACK_PAWN = "&#x265F;";
const BLACK_PIECES = ["&#x265C;", "&#x265E;", "&#x265D;", "&#x265B;", "&#x265A;", "&#x265D;", "&#x265E;", "&#x265C;"]

// TODO: User playing as white by default. There will be a switch to toggle this, which will negate this value, and replace the pieces. 
const isPlayingWhite = true; 

function placePieces() {
    // Assumes the player is playing white as this will likely usually be the case
    let playerPawn = WHITE_PAWN;
    let playerPieces = WHITE_PIECES;
    let opponentPawn = BLACK_PAWN;
    let opponentPieces = BLACK_PIECES;

    if (!(isPlayingWhite)) {
        playerPawn = BLACK_PAWN;
        playerPieces = BLACK_PIECES;

        opponentPawn = WHITE_PAWN
        opponentPieces = WHITE_PIECES
    }

    const allSquares = Array.from(board.childNodes);
  
    let opponentPawnRow = allSquares.filter((square) => (square.id[1] == '7'));
    let playerPawnRow = allSquares.filter((square) => (square.id[1] == '2'));

    let opponentPieceRow = allSquares.filter((square) => (square.id[1] == '8'));
    let playerPieceRow = allSquares.filter((square) => (square.id[1] == '1'));

    // playerPawnRow/playerPieceRow and opponentPawnRow/opponentPieceRow should allhave length 8 
    for (let i = 0; i < opponentPawnRow.length; i++) {
        opponentPawnRow[i].innerHTML = opponentPawn;
        playerPawnRow[i].innerHTML = playerPawn;

        opponentPieceRow[i].innerHTML = opponentPieces[i];
        playerPieceRow[i].innerHTML = playerPieces[i];
    }
}

function colorSquare(square) {
    const GREEN = "#739552";
    const WHITE = "#ebecd0";

    let column = parseInt(square.id[0]);
    let row = parseInt(square.id[1]);
    let positionSum = row + column;

    if (positionSum % 2 == 0) {
        square.style.backgroundColor = GREEN;
    }

    else {
        square.style.backgroundColor = WHITE;
    }

}

function roundCorners() {
    const topLeftCorner = document.querySelector(`#${CSS.escape("18")}`);
    const topRightCorner = document.querySelector(`#${CSS.escape("88")}`);
    const bottomLeftCorner = document.querySelector(`#${CSS.escape("11")}`);
    const bottomRightCorner = document.querySelector(`#${CSS.escape("81")}`);

    topLeftCorner.classList.add("top-left-corner");
    topRightCorner.classList.add("top-right-corner");
    bottomLeftCorner.classList.add("bottom-left-corner");
    bottomRightCorner.classList.add("bottom-right-corner");
}


const board = document.querySelector("#board");

for (let row = 8; row > 0; row--) {
    for (let column = 1; column < 9; column++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.id = `${column}${row}`;
        colorSquare(square);
        
        
        board.appendChild(square);
    }
}

roundCorners();
placePieces();



