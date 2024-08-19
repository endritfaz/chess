class BoardView {
    board;

    constructor() {
        this.createBoard();
        this.roundCorners();
    }

    updateBoard(sourceSquareID, targetSquareID) {
        let sourceSquare = this.board.querySelector(`#${CSS.escape(`${sourceSquareID}`)}`);
        let targetSquare = this.board.querySelector(`#${CSS.escape(`${targetSquareID}`)}`);

        const targetPiece = targetSquare.querySelector(".piece");
        // Remove piece from target square - relies on piece being direct child of square
        if (targetPiece != null) {
            targetSquare.removeChild(targetPiece);
        }
        
        const sourcePiece = sourceSquare.removeChild(sourceSquare.querySelector(".piece"));

        targetSquare.appendChild(sourcePiece);
    }

    createBoard() {
        this.board = document.createElement("div");
        this.board.classList.add("board");

        for (let i = 0; i < 64; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("prevent-select");
            square.id = i;
            this.colorSquare(square);

            this.board.appendChild(square);
        }
    }

    placePieces(FEN) {
        let piecePosition = 0;
        for (let i = 0; i < FEN.length; i++) {
            if (FEN[i] == '/') {
                continue;
            }

            if (isNaN(FEN[i])) {
                let pieceCode = this.getPieceCode(FEN[i]);
                let piece = this.createPiece(pieceCode);
                const square = this.board.querySelector(`#${CSS.escape(`${piecePosition}`)}`);
         
                square.appendChild(piece);
                piecePosition += 1;
            }

            else {
                piecePosition += parseInt(FEN[i]);
            }
        }
    }

    getPieceCode(FENToken) {
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

    createPiece(pieceCode) {
        let piece = document.createElement("div");
        piece.draggable = true;
        piece.innerHTML = pieceCode;
        piece.classList.add("piece");
        piece.classList.add("grabbable");
        return piece;
    }

    colorSquare(square) {
        const GREEN = "#739552";
        const WHITE = "#ebecd0";
        
        let column = parseInt(square.id) % 8;
        let row = Math.floor(parseInt(square.id) / 8);
        let positionSum = column + row;
    
        square.style.backgroundColor = (positionSum % 2 == 0) ? WHITE : GREEN;
    }

    roundCorners() {
        const topLeftCorner = this.board.querySelector(`#${CSS.escape("0")}`);
        const topRightCorner = this.board.querySelector(`#${CSS.escape("7")}`);
        const bottomLeftCorner = this.board.querySelector(`#${CSS.escape("56")}`);
        const bottomRightCorner = this.board.querySelector(`#${CSS.escape("63")}`);
    
        topLeftCorner.classList.add("top-left-corner");
        topRightCorner.classList.add("top-right-corner");
        bottomLeftCorner.classList.add("bottom-left-corner");
        bottomRightCorner.classList.add("bottom-right-corner");
    }
}


