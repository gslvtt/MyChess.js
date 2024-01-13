import { useState, useMemo, useEffect, useRef } from 'react'
import './Board.css'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { validateFen } from 'chess.js';

function Board () {
  const newGame = useMemo(() => new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), []);
  const [game, setGame] = useState(newGame);
  const [boardPosition, setBoardPosition] = useState(game.fen());
  const [fenHistory, setFenHistory] = useState({fens:[], pointer:0});
  const [fenInput, setFenInput] = useState('');

  // ALTERNATIVE REFERENCE TO AVOID RERENDERS ON INPUT CHANGE
  // const inputRef = useRef < HTMLInputElement > ();
  // <input
  //   ref={inputRef}
  //   style={{ ...inputStyle, width: "90%" }}
  //   onChange={handleFenInputChange}
  //   placeholder="Paste FEN to start analysing custom position"
  // />

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

  function moveFenHistoryPointer (newPointer) {
    setFenHistory((history) => {
      return { fens: history.fens, pointer: newPointer };
    });
  }


  function getFenHistory(game) {
    const gameHistory = game.history({verbose:true});
    return gameHistory.length ? [gameHistory[0].before].concat(gameHistory.map(move => move.after)) : [game.fen()];
  }
    // return gameHistory.length ? [gameHistory[0].before].concat(gameHistory.map(move => move.after)) : ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'];


  // BOARD TO GAME FUNCTIONS

  // Make a Move
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

  // Reset Game
  function onResetHandler() {

    setGame((game) => {
      const gameCopy = copyGame(game);
      gameCopy.reset();
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
  }

  // Undo last Move
  function onUndoHandler () {
    setGame((game) => {
      const gameCopy = copyGame(game);
      gameCopy.undo();
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
  }

  // View Initial Position
  function onBeginningHandler () {
    setBoardPosition(() => {
      const newPointer = 0;
      moveFenHistoryPointer(newPointer);
      return fenHistory.fens[`${newPointer}`];
    });
  }

  // View Previous Position
  function onPreviousHandler() {
    if (fenHistory.pointer > 0) {
      setBoardPosition(() => {
        const newPointer = fenHistory.pointer -1;
        moveFenHistoryPointer(newPointer);
        return fenHistory.fens[`${newPointer}`]
      });
    }
  }

  // View Next Position
  function onNextHandler() {
    if (fenHistory.pointer < fenHistory.fens.length -1) {
      setBoardPosition(() => {
        const newPointer = fenHistory.pointer +1;
        moveFenHistoryPointer(newPointer);
        return fenHistory.fens[`${newPointer}`]
      });
    }
  }

  // View Last Position
  function onLastHandler() {
    setBoardPosition(() => {
      const newPointer = fenHistory.fens.length - 1;
      moveFenHistoryPointer(newPointer);
      return fenHistory.fens[`${newPointer}`];
    });
  }

  // Load a new game from custom position
  function onFenInputChange (e) {
    setFenInput(e.target.value)
  }

  function onFenSubmitHandler(event) {
    event.preventDefault();
    validateFen(fenInput).ok ? gameStartFromFen(fenInput) : alert('Invalid Fen');
    setFenInput('');
  }


  return (
    <>
        <div className='board-wrapper' >
        <Chessboard id="BasicBoard" position={boardPosition} onPieceDrop={onPieceDropHandler} arePiecesDraggable={fenHistory.pointer === fenHistory.fens.length-1}/>
        </div>
        <div className='game-navigation-buttons'>
        <button onClick={onResetHandler}>Reset</button>
        <button onClick={onUndoHandler}>Undo</button>
        <button onClick={onBeginningHandler}>Beginning</button>
        <button onClick={onPreviousHandler}>Previous</button>
        <button onClick={onNextHandler}>Next</button>
        <button onClick={onLastHandler}>Last</button>
        </div>
        <div className='game-load-inputs'>
          <form onSubmit={onFenSubmitHandler}>
            <input type='text' placeholder='Paste Fen here' value={fenInput} onChange={onFenInputChange} ></input>
            <input type='submit' value='Load Fen'></input>
          </form>
        <form onSubmit={() => { }}>
            <input type='text' placeholder='Paste Pgn here' onChange={() => {}} ></input>
            <input type='submit' value='Load Pgn'></input>
          </form>
        </div>
    </>
  )
}

export default Board;
