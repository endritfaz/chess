function perftCaller(FENCode, depth) {
    const board = new BoardModel(FENCode)
}
function perft(board, depth) {
    if (depth == 0) {
        return 1;
    }

    totalNodes = 0; 
    legalMoves = board.calculateLegalMoves(); 

    for (let i = 0; i < legalMoves.length; i++) {
        board.makeMove(legalMoves[i]);
        totalNodes += perft(board, depth - 1);
        board.unmakeMove(legalMoves[i]);
    }

    return totalNodes;
}