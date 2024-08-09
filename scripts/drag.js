let dragged;
let dragMoves;

// TODO: Will work with board representation to calculate where the piece being dragged is able to move (add dragover and drop event handlers)
function setDropZones(targetSquare) {
    console.log("drag")
    dragMoves = boardController.calculatePieceMoves(targetSquare.id);

    for (let i = 0; i < dragMoves.length; i++) {
        square = document.querySelector(`#${CSS.escape(dragMoves[i])}`)
        square.addEventListener("dragover", dragoverHandler);
        square.addEventListener("drop", dropHandler);

        square.classList.add("drop-zone")
    }
}

function removeDropZones() {
    for (let i = 0; i < dragMoves.length; i++) {
        square = document.querySelector(`#${CSS.escape(dragMoves[i])}`)
        square.removeEventListener("dragover", dragoverHandler);
        square.removeEventListener("drop", dropHandler);

        square.classList.remove("drop-zone");
    }   
}


// For an element to be draggable it needs both the draggable tag and the dragstart event handler
function dragstartHandler(ev) {
    dragged = ev.target;
    setDropZones(dragged.parentNode);
}

// For an element to be a drop zone, it must listen to both dragover and drop events
function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    
    let targetSquare = ev.target.firstChild != null ? ev.target.parentNode : ev.target;

    updateBoardModel(dragged.parentNode.id, targetSquare.id);

    dragged.parentNode.removeChild(dragged);
    
    // Non empty target is the innermost div
    if (ev.target.firstChild != null) {
        ev.target.parentNode.removeChild(ev.target);
    }

    targetSquare.appendChild(dragged);
}

function dragendHandler(ev) {
    removeDropZones();
}

const piecesView = document.querySelectorAll(".piece");
for (let i = 0; i < piecesView.length; i++) {
    piecesView[i].addEventListener("dragstart", dragstartHandler);
    piecesView[i].addEventListener("dragend", dragendHandler);
}
