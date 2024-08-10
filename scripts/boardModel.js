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

    updateBoard(sourceSquare, targetSquare) {
        // Update pawn two rank move privileges 
        if (this.board[sourceSquare] instanceof Pawn) {
            this.getPiece(sourceSquare).moved = true;
        }

        this.board[targetSquare] = this.getPiece(sourceSquare);
        this.board[sourceSquare] = EMPTY;
        console.log(this.board);
    }

    updateActiveTurn() {
        this.whiteActive = !this.whiteActive;
    }

    placePieces(piecePlacement) {
        for (let i = 0; i < piecePlacement.length; i++) {
            let token = piecePlacement[i];
            // Ignore row tokens 
            if (token == '/') {
                continue;
            }

            if (isNaN(token)) {
                // Pawn directionality 
                let multiplier;
                if (this.board.length >= 8 && this.board.length <= 15) {
                    multiplier = 1; 
                }
                else {
                    multiplier = -1;
                }

                let piece = this.decodeFENToken(token, multiplier);
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

    decodeFENToken(token, multiplier) {
        const white = (token == token.toUpperCase()) ? true : false;
        
        switch(token.toLowerCase()) {
            case 'p':
                return new Pawn(this, white, multiplier);
            case 'n':
                return new Knight(this, white);
            case 'b':
                return new Bishop(this, white);
            case 'r':
                return new Rook(this, white);
            case 'q':
                return new Queen(this, white);
            case 'k':
                return new King(this, white);
        }
    }

    isEmpty(square) {
        return (square >= 0 && square < 64 && this.board[square] == EMPTY);
    }

    getPiece(square) {
        return this.board[square];
    }

    getSquare(piece) {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == piece) {
                return i; 
            }
        }
    }

    getRank(square) {
        return (9 - (Math.floor(square/8) + 1));
    }

    getFile(square) {
        return ((square % 8) + 1);
    }
}

