class BoardModel {
    board = [];
    whitePlayer;
    whiteActive;
    castling;
    enPassantTargets;
    halfMoveClock;
    fullMoveCount;

    whitePieces = [];
    blackPieces = [];

    constructor(FEN) {
        const boardInformation = FEN.split(" ");
        const piecePlacement = boardInformation[0];
        const activeColor = boardInformation[1];
        this.castling = boardInformation[2];
        this.enPassantTargets = boardInformation[3];
        this.halfMoveClock = boardInformation[4];
        this.fullMoveCount = boardInformation[5];

        this.placePieces(piecePlacement);

        this.whiteActive = activeColor == 'w' ? true : false;
        
        // TODO: Add to constructor and allow user to switch by button. Will probably need a "game manager" class that changes both the model and the display
        this.whitePlayer = true;
    }

    placePieces(piecePlacement) {
        for (let i = 0; i < piecePlacement.length; i++) {
            let token = piecePlacement[i];
            // Ignore row tokens 
            if (token == '/') {
                continue;
            }

            if (isNaN(token)) {
                let piece = this.decodeFENToken(token);
                this.board.push(piece);

                if (token == token.toUpperCase()) {
                    this.whitePieces.push(piece);
                }
                else {
                    this.blackPieces.push(piece);
                }

            }
            else {
                for (let j = 0; j < parseInt(token); j++) {
                    this.board.push(EMPTY);
                }
            }
        }
    }

    decodeFENToken(token) {
        const white = (token == token.toUpperCase()) ? true : false;
        
        switch(token.toLowerCase()) {
            case 'p':
                return new Pawn(white);
            case 'n':
                return new Knight(white);
            case 'b':
                return new Bishop(white);
            case 'r':
                return new Rook(white);
            case 'q':
                return new Queen(white);
            case 'k':
                return new King(white);
        }
    }
}

