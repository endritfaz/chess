class BoardController {
    boardView;
    boardModel;

    isPlayingWhite; 

    dragged;
    dragMoves;

    constructor(boardView, boardModel, isPlayingWhite) {
        this.boardView = boardView;
        this.boardModel = boardModel;
        this.isPlayingWhite = isPlayingWhite;

        // Drag functionality
        const pieces = boardView.board.querySelectorAll(".piece");
        for (let i = 0; i < pieces.length; i++) {
            // Arrow function required so context is not lost
            pieces[i].addEventListener("dragstart", (e) => this.dragstartHandler(e));
            pieces[i].addEventListener("dragend", (e) => this.dragendHandler(e));
        }
    }

    updateBoard(sourceSquare, targetSquare) {
        this.boardModel.updateBoard(sourceSquare, targetSquare);
        this.boardView.updateBoard(sourceSquare, targetSquare);
    }

    // Need to be able to remove listener and to not lose context
    dragoverCallback = (e) => this.dragoverHandler(e);
    dropCallback = (e) => this.dropHandler(e);
    
    setDropZones(targetSquare) {
        this.dragMoves = (boardModel.getPiece(targetSquare.id).getMoves()).map(move => move.targetSquare);
        
        for (let i = 0; i < this.dragMoves.length; i++) {
            let square = document.querySelector(`#${CSS.escape(this.dragMoves[i])}`)
            square.addEventListener("dragover", this.dragoverCallback);
            square.addEventListener("drop", this.dropCallback);
    
            square.classList.add("drop-zone")
        }
    }

    removeDropZones() {
        for (let i = 0; i < this.dragMoves.length; i++) {
            let square = document.querySelector(`#${CSS.escape(this.dragMoves[i])}`)
            square.removeEventListener("dragover", this.dragoverCallback);
            square.removeEventListener("drop", this.dropCallback);
    
            square.classList.remove("drop-zone");
        }
        this.dragMoves = [];
    }

    dragstartHandler(ev) {
        this.dragged = ev.target;
     
        const square = parseInt(this.dragged.parentNode.id)
        const piece = this.boardModel.board[square];
      
        // Only calculate moves if it is players' turn
        if (!((piece.isWhite() && this.boardModel.whiteActive) || (!piece.isWhite() && !this.boardModel.whiteActive))) {
            return;
        }

        this.setDropZones(this.dragged.parentNode);
    }

    dragendHandler(ev) {
        this.removeDropZones();
    }

    // For an element to be a drop zone, it must listen to both dragover and drop events
    dragoverHandler(ev) {
        ev.preventDefault();
    }

    dropHandler(ev) {
        ev.preventDefault();
       
        let sourceSquare = parseInt(this.dragged.parentNode.id);
        let targetSquare = parseInt((ev.target.firstChild != null ? ev.target.parentNode : ev.target).id);
        
        this.updateBoard(sourceSquare, targetSquare);
    }
}

