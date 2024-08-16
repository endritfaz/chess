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

        // Initialise the moveset for the active player
        
        let activePieces = this.whiteActive ? this.whitePieces : this.blackPieces;

        this.calculateMoves(activePieces, true);

    }

    // Calculates all moves for a set of pieces. Legal controls whether the moves calcualated are legal or pseudolegal
    calculateMoves(pieces, legal) {
        let moves = [];
        for (let i = 0; i < pieces.length; i++) {
            pieces[i].calculateMoves(this.getSquare(pieces[i]));
            
            if (legal) {
                pieces[i].legaliseMoves()
            }

            moves = moves.concat(pieces[i].getMoves());
        }
        return moves;
    }

    // Updates after a move is made
    updateBoard(sourceSquare, targetSquare) {
        // Update pawn two rank move privileges 
        if (this.board[sourceSquare] instanceof Pawn) {
            this.getPiece(sourceSquare).moved = true;
        }

        this.makeMove(sourceSquare, targetSquare);

        // TODO: Check for checkmate and stalemate
        // Calculate the moves for the next player given the latest move from the active player
        this.updateActiveTurn();

        let activePieces = this.whiteActive ? this.whitePieces : this.blackPieces;
        
        let moves = this.calculateMoves(activePieces, true);
        
        // Check for checkmate or stalemate
        if (moves.length == 0) {
            this.checkForEnding();
        }
    }

    checkForEnding() {
        let activeKingSquare = this.getSquare(this.getActiveKing());
        const inactivePieces = this.whiteActive ? this.blackPieces : this.whitePieces;
        const inactivePlayerMoves = this.calculateMoves(inactivePieces, false);

        for (let i = 0; i < inactivePlayerMoves.length; i++) {
            if (inactivePlayerMoves[i] == activeKingSquare) {
                console.log("checkmate");
                return;
            }
        }
        console.log("stalemate");
    }

    makeMove(sourceSquare, targetSquare) {
        let targetPiece = this.board[targetSquare];
        this.board[targetSquare] = this.getPiece(sourceSquare);
        this.board[sourceSquare] = EMPTY;

        if (targetPiece != EMPTY) {
            let pieceSet = targetPiece.white ? this.whitePieces : this.blackPieces;
            let targetPieceIndex = pieceSet.indexOf(targetPiece);
            pieceSet.splice(targetPieceIndex, 1);
        }
    }

    unmakeMove(sourceSquare, targetSquare, targetPiece) {
        this.board[sourceSquare] = this.board[targetSquare];
        this.board[targetSquare] = targetPiece;

        if (targetPiece != EMPTY) {
            let pieceSet = targetPiece.white ? this.whitePieces : this.blackPieces;
            pieceSet.push(targetPiece);
        }
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
        return this.board[square] == EMPTY;
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

    static inRange(square) {
        return square >= 0 && square < 64;
    }

    static getRank(square) {
        return (9 - (Math.floor(square/8) + 1));
    }

    static getFile(square) {
        return ((square % 8) + 1);
    }

    // Takes two squares in 1D, converts to 2D and finds manhatten distance between them
    static manhattenDistance(squareOne, squareTwo) {
        const squareOne2D = [BoardModel.getRank(squareOne), BoardModel.getFile(squareOne)];
        const squareTwo2D = [BoardModel.getRank(squareTwo), BoardModel.getFile(squareTwo)];

        const manhattenDistance = Math.abs(squareOne2D[0] - squareTwo2D[0]) + Math.abs(squareOne2D[1] - squareTwo2D[1]);

        return manhattenDistance;
    }

    getActiveKing() {
        let activePieces = this.whiteActive ? this.whitePieces : this.blackPieces;

        for (let i = 0; i < activePieces.length; i++) {
            if (activePieces[i] instanceof King) {
                return activePieces[i];
            }
        }
    }

    // Simulate the move to see if it would put the player's king in check
    // TODO: Possibly optimise this so not all of the inacive player moves need to be recalculated
    // Bugged
    isLegalMove(sourceSquare, targetSquare) {    
        let legalMove = true;
        const targetPiece = this.board[targetSquare];
        const inactivePieces = this.whiteActive ? this.blackPieces : this.whitePieces;
  
        this.makeMove(sourceSquare, targetSquare);
 
        const activeKingSquare = this.getSquare(this.getActiveKing());
        
        const inactivePlayerMoves = this.calculateMoves(inactivePieces, false);
       
        
        // Check if king is being attacked (king square is in inactive player's moves)
        // TODO: Seperate normal moves from attacks and only search attacks 
        for (let i = 0; i < inactivePlayerMoves.length; i++) {
            if (inactivePlayerMoves[i] == activeKingSquare) {
                legalMove = false;
            }
        }

        this.unmakeMove(sourceSquare, targetSquare, targetPiece)

        return legalMove;
    }
}


