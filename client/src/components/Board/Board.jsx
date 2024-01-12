import { useState, useMemo, useEffect, useRef } from 'react'
import './Board.css'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { validateFen } from 'chess.js';
// import validateFEN from 'fen-validator';

function Board () {
  const newGame = useMemo(() => new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), []);
  const [game, setGame] = useState(newGame);
  const [boardPosition, setBoardPosition] = useState(game.fen());
  const [fenHistory, setFenHistory] = useState([]);
  const [fenInput, setFenInput] = useState('');
  const [piecesAreMovable, setPiecesAreMovable] = useState(true);

  useEffect(() => {
    const history = getFenHistory(game);
    setFenHistory(history);
  }, [game])

  console.log(fenHistory);

  // GAME TO VIEW FUNCTIONS
  function gameStartFromFen (fen) {
    setGame(new Chess(fen));
  }

  function makeAMove(move) {
    const gameCopy = copyGame(game);
    const result = game.move(move);
    setGame(gameCopy);
    setBoardPosition(gameCopy.fen());
    console.log(gameCopy.isThreefoldRepetition());
    return result; // null if the move was illegal, the move object if the move was legal
  }


  // HELPER FUNCTIONS
  function copyGame (game) {
    const prototype = Object.getPrototypeOf(game);
    const gameCopy = Object.assign(Object.create(prototype), game);
    return gameCopy;
  }


  function getFenHistory(game) {
    const gameHistory = game.history({verbose:true});
    return gameHistory.length ? [gameHistory[0].before].concat(gameHistory.map(move => move.after)) : gameHistory;
  }

  // BOARD TO GAME FUNCTIONS

  function onPieceDropHandler(sourceSquare, targetSquare, piece) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q"
    });
    // illegal move
    
    if (move === null) {
      return false;
    }
    console.log(game);
    if (game.isGameOver()) { 
      return false; 
    }
    return true;
  }

  function onResetHandler() {

    setGame((game) => {
      const gameCopy = copyGame(game);
      gameCopy.reset();
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
  }

  function onUndoHandler () {
    setGame((game) => {
      const gameCopy = copyGame(game);
      gameCopy.undo();
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
  }

  function onPreviousHandler() {
    setGame((game) => {
      const gameCopy = copyGame(game);
      gameCopy.load('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
  }


  function onFenSubmitHandler(event) {
    event.preventDefault();
    validateFen(fenInput).ok ? gameStartFromFen(fenInput) : alert('Invalid Fen');
  }


  return (
    <>
        <div className='board-wrapper'>
          <Chessboard id="BasicBoard" position={boardPosition} onPieceDrop={onPieceDropHandler} arePiecesDraggable={piecesAreMovable}/>
        </div>

        <button onClick={onResetHandler}>Reset</button>
        <button onClick={onUndoHandler}>Undo</button>
      <button onClick={onPreviousHandler}>Previous</button>
        <form onSubmit={onFenSubmitHandler}>
        <input type='text' placeholder='Paste Fen here' onInput={e => setFenInput(e.target.value)} ></input>
          <input type='submit' value='Load Fen'></input>
        </form>
    </>
  )
}

export default Board;
