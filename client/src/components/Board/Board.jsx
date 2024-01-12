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
  const [fenHistory, setFenHistory] = useState({fens:[], pointer:0});
  const [fenInput, setFenInput] = useState('');
  const [piecesAreMovable, setPiecesAreMovable] = useState(true);
  // const [historyPointer, setHistoryPointer] = useState({index: 0, inPast:false})

  console.log(fenHistory);
  console.log(game.isThreefoldRepetition());
  console.log(game.ascii());

  useEffect(() => {
      const newHistory = getFenHistory(game);
    setFenHistory(() => { return { fens: newHistory, pointer: newHistory.length - 1 }});
  }, [game])

  // GAME TO VIEW FUNCTIONS
  function gameStartFromFen (fen) {
    setGame(() => {
      setBoardPosition(fen)
      return new Chess(fen);
    })
  }

  function makeAMove(move) {
    if (game.isGameOver()) return false;
    const gameCopy = copyGame(game);
    const result = gameCopy.move(move);
    console.log(gameCopy);
    setGame(() => {
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
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
    return gameHistory.length ? [gameHistory[0].before].concat(gameHistory.map(move => move.after)) : ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];
  }

  // BOARD TO GAME FUNCTIONS

  function onPieceDropHandler(sourceSquare, targetSquare, piece) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q"
    });
    // illegal move
    
    if (move === null) return false;
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
    if (fenHistory.pointer > 0) {
      setBoardPosition(() => {
        const newPointer = fenHistory.pointer -1;
        setFenHistory((history) => {
          return {fens: history.fens, pointer: newPointer}
        })      
        return fenHistory.fens[`${newPointer}`]
      });
    }
  }

  function onNextHandler() {
    if (fenHistory.pointer < fenHistory.fens.length -1) {
      setBoardPosition(() => {
        const newPointer = fenHistory.pointer +1;
        setFenHistory((history) => {
          return { fens: history.fens, pointer: newPointer }
        })
        return fenHistory.fens[`${newPointer}`]
      });
    }
  }

  // window.addEventListener("keydown", onPreviousHandler);
  // window.addEventListener("keyup", onNextHandler);
  // onKeyDown = { onPreviousHandler } onKeyUp = { onNextHandler }

  function onFenSubmitHandler(event) {
    event.preventDefault();
    validateFen(fenInput).ok ? gameStartFromFen(fenInput) : alert('Invalid Fen');
  }


  return (
    <>
        <div className='board-wrapper' >
        <Chessboard id="BasicBoard" position={boardPosition} onPieceDrop={onPieceDropHandler} arePiecesDraggable={fenHistory.pointer === fenHistory.fens.length-1}/>
        </div>

        <button onClick={onResetHandler}>Reset</button>
        <button onClick={onUndoHandler}>Undo</button>
        <button onClick={onPreviousHandler}>Previous</button>
        <button onClick={onNextHandler}>Next</button>
        <form onSubmit={onFenSubmitHandler}>
        <input type='text' placeholder='Paste Fen here' onChange={e => setFenInput(e.target.value)} ></input>
          <input type='submit' value='Load Fen'></input>
        </form>
    </>
  )
}

export default Board;
