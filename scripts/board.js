class Board {
    board = [];
    activeColor;
    castling;
    enPassantTargets;
    halfMoveClock;
    fullMoveCount;

    constructor(FEN) {
        const boardInformation = FEN.split(" ");
        const piecePlacement = boardInformation[0];
        this.activeColor = boardInformation[1];
        this.castling = boardInformation[2];
        this.enPassantTargets = boardInformation[3];
        this.halfMoveClock = boardInformation[4];
        this.fullMoveCount = boardInformation[5];

        

    }
}
