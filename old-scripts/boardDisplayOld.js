const WHITE_PAWN = "&#x2659;";
const WHITE_PIECES = ["&#x2656;", "&#x2658;", "&#x2657;", "&#x2655;", "&#x2654;", "&#x2657;", "&#x2658;", "&#x2656;"]

const BLACK_PAWN = "&#x265F;";
const BLACK_PIECES = ["&#x265C;", "&#x265E;", "&#x265D;", "&#x265B;", "&#x265A;", "&#x265D;", "&#x265E;", "&#x265C;"]

// TODO: User playing as white by default. There will be a switch to toggle this, which will negate this value, and replace the pieces. 
const isPlayingWhite = true; 

function createPiece(pieceCode) {
    let piece = document.createElement("div");
    piece.draggable = true;
    piece.innerHTML = pieceCode;
    piece.classList.add("piece");
    piece.classList.add("grabbable");
    return piece;
}

// TODO: Replace this function with a function that loads an arbitrary position from a string
function placePieces() {
    // Assumes the player is playing white as this will likely be the case
    let playerPawns = WHITE_PAWN;
    let playerPieces = WHITE_PIECES;
    let opponentPawns = BLACK_PAWN;
    let opponentPieces = BLACK_PIECES;

    if (!(isPlayingWhite)) {
        playerPawns = BLACK_PAWN;
        playerPieces = BLACK_PIECES;

        opponentPawns = WHITE_PAWN
        opponentPieces = WHITE_PIECES
    }

    const allSquares = Array.from(boardView.childNodes);
  
    let opponentPawnRow = allSquares.filter((square) => (square.id[1] == '7'));
    let playerPawnRow = allSquares.filter((square) => (square.id[1] == '2'));

    let opponentPieceRow = allSquares.filter((square) => (square.id[1] == '8'));
    let playerPieceRow = allSquares.filter((square) => (square.id[1] == '1'));

    // playerPawnRow/playerPieceRow and opponentPawnRow/opponentPieceRow should all have length 8 
    for (let i = 0; i < opponentPawnRow.length; i++) {
        let opponentPawn = createPiece(opponentPawns);
        opponentPawnRow[i].appendChild(opponentPawn);
        
        let playerPawn = createPiece(playerPawns);
        playerPawnRow[i].appendChild(playerPawn);

        let opponentPiece = createPiece(opponentPieces[i]);
        opponentPieceRow[i].appendChild(opponentPiece);

        let playerPiece = createPiece(playerPieces[i]);
        playerPieceRow[i].appendChild(playerPiece);
    }
}

function colorSquare(square) {
    const GREEN = "#739552";
    const WHITE = "#ebecd0";

    let column = parseInt(square.id[0]);
    let row = parseInt(square.id[1]);
    let positionSum = row + column;

    square.style.backgroundColor = (positionSum % 2 == 0) ? GREEN : WHITE;
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

function placePieces(FEN) {
    let piecePosition = 0;
    for (let i = 0; i < FEN.length; i++) {
        if (FEN[i] == '/') {
            continue;
        }

        if (isNaN(FEN[i])) {
            let pieceCode = getPieceCode(FEN[i]);
            let piece = createPiece(pieceCode);
            const square = document.querySelector(`#${CSS.escape(`${piecePosition}`)}`);
            square.appendChild(piece);
            piecePosition += 1;
        }

        else {
            piecePosition += parseInt(FEN[i]);
        }
    }
}

function getPieceCode(FENToken) {
    switch (FENToken) {
        // White pieces
        case 'P':
            return "&#x2659;";
        case 'N':
            return "&#x2658;";
        case 'B':
            return "&#x2657;";
        case 'R':
            return "&#x2656;";
        case 'Q':
            return "&#x2655;";
        case 'K':
            return "&#x2654;";

        // Black pieces
        case 'p':
            return "&#x265F;";
        case 'n':
            return "&#x265E;";
        case 'b':
            return "&#x265D;";
        case 'r':
            return "&#x265C;";
        case 'q':
            return "&#x265B;";
        case 'k':
            return "&#x265A;";
    }
}

const boardView = document.querySelector("#board");

for (let row = 8; row > 0; row--) {
    for (let column = 1; column < 9; column++) {
        let square = document.createElement("div");
        square.classList.add("square");
        square.classList.add("prevent-select");
        square.id = `${column}${row}`;
        colorSquare(square);
        
        
        boardView.appendChild(square);
    }
}

roundCorners();
placePieces();



