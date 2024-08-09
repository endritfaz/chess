class BoardController {
    boardView;
    boardModel;

    dragged;
    dragMoves;

    constructor(boardView, boardModel) {
        this.boardView = boardView;
        this.boardModel = boardModel;
    }

    calculatePieceMoves(square) {
        const piece = this.boardModel.board[parseInt(square)];
        console.log(square)
        console.log(piece)
        // Only calculate moves if it is players' turn
        if (!(piece.isWhite && this.boardModel.whiteActive) || (!piece.isWhite && !this.boardModel.whiteActive)) {
            return;
        }

        piece.calculateMoves();
    }

    // TODO: Move drag.js to here
}