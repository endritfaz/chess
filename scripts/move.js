class Move {
    sourceSquare;
    targetSquare;
    sourcePiece;
    targetPiece;
    
    oldEnPassantTarget;
    newEnPassantTarget; 

    constructor(sourceSquare, targetSquare, sourcePiece, targetPiece) {
        this.sourceSquare = sourceSquare;
        this.targetSquare = targetSquare;
        this.sourcePiece = sourcePiece;
        this.targetPiece = targetPiece;
    }

    newEnPassantTargetAvailable() {
        return this.newEnPassantTarget != undefined; 
    }
}

class EnPassantMove extends Move {
    constructor(sourceSquare, targetSquare, sourcePiece, targetPiece) {
        super(sourceSquare, targetSquare, sourcePiece, targetPiece)
    }
}