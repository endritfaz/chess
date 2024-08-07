function calculatePawnMoves(square, piece) {
    let moves = [];
    // Player move
    if ((isWhite(piece) && isPlayingWhite) || (!isWhite(piece) && !isPlayingWhite)) {
        // Push pawn by one square
        if (isEmpty(square + 8)) {
            moves.push(square + 8)
        }
        // Push pawn by two squares from starting square
        if (square >= 8 && square <= 15 && isEmpty(square + 2*8)) {
            moves.push(square + 2*8)
        }
        // Attack left diagonal 
        if (!isEmpty(square + 7) && getColor(piece) != getColor(board[square + 7])) {
            moves.push(square + 7);
        }
        // Attack right diagonal
        if (!isEmpty(square + 9) && getColor(piece) != getColor(board[square + 9])) {
            moves.push(square + 9);
        }
    
        return moves;
    }

    // Computer move 
    else {}

}