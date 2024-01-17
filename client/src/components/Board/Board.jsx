import { useState, useMemo, useEffect } from 'react'
import './Board.css'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { validateFen } from 'chess.js';
import { parse } from 'pgn-parser';

function Board ({setPgnComments, setBoardPosition, boardPosition}) {
  const newGame = useMemo(() => new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), []);
  const [game, setGame] = useState(newGame);
  const [fenHistory, setFenHistory] = useState({fens:[], pointer:0});
  const [fenInput, setFenInput] = useState('');
  const [pgnInput, setPgnInput] = useState('');
  
  useEffect(() => {
    const newHistory = getFenHistory(game);
    setFenHistory(() => { return { fens: newHistory, pointer: newHistory.length - 1 }});
  }, [game])

  const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  // ALTERNATIVE REFERENCE TO AVOID RERENDERS ON INPUT CHANGE
  // const inputRef = useRef < HTMLInputElement > ();
  // <input
  //   ref={inputRef}
  //   style={{ ...inputStyle, width: "90%" }}
  //   onChange={handleFenInputChange}
  //   placeholder="Paste FEN to start analysing custom position"
  // />
  
  // GAME TO VIEW FUNCTIONS

  // Load Game from Fen
  function gameStartFromFen (fen) {
    setGame(() => {
      setBoardPosition(fen)
      return new Chess(fen);
    })
  }

  async function gameFromPgn(pgn) {
    try {
      const parsedPgn = parse(pgn);
      setGame((game) => {
        console.log({parsedPgn});
        const importingGame = new Chess();
        const comments = {};
        const valid = parsedPgn[0].moves.every(move => {
          const gameProgress = importingGame.move(move.move);
          if (gameProgress !== null) {
            // Will have to check if key is already present and push when integrating multiple sources in a single object
            const currentFen = importingGame.fen();
            comments[currentFen] = move.comments.map(comment=> {
              return {title: '', text: comment.text, source: 'Pgn', tags:[], fen: currentFen }
            });
            return true;
          } else {
            return false;
          }
        });
        if (valid) {
          const headers = parsedPgn[0].headers.slice(1).reduce((str, header) => `${str}\n${header.name}: ${header.value}`, '');
          console.log(parsedPgn[0]);
          console.log(headers[0]);
          comments[STARTING_FEN] = [{title: '', text : headers, source:'Pgn', tags: [], fen: STARTING_FEN}];
          console.log(headers);
          setBoardPosition(importingGame.fen());
          setPgnComments(comments);
          setPgnInput('');
          return importingGame;
        } else {
          alert('Invalid  or Incompatible Pgn');
          return game;
        }
      });
    } catch (error) {
      alert('Invalid  or Incompatible Pgn');
      console.log(error);
    }
  }

  // Make a Move (triggered on piece drop)
  function makeAMove(move) {
    if (game.isGameOver()) return false;
    const gameCopy = copyGame(game);
    const result = gameCopy.move(move);
    setGame(() => {
      setBoardPosition(gameCopy.fen());
      return gameCopy;
    });
    // THIS RESULT ONLY CONTROLS PREMOVE LOGIC!
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
      setPgnComments({});
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

  // BUTTON AND FORM FUNCTIONS
  // Load a new game from custom position
  function onFenInputChange (e) {
    setFenInput(e.target.value)
  }

  function onPgnInputChange(e) {
    setPgnInput(e.target.value)
  }

  function onFenSubmitHandler(event) {
    event.preventDefault();
    validateFen(fenInput).ok ? gameStartFromFen(fenInput) : alert('Invalid Fen');
    setFenInput('');
  }

  function onPgnSubmitHandler(event) {
    event.preventDefault();
    gameFromPgn(pgnInput);
    setPgnInput('');
  }


  return (
    <>
        <div className='board-wrapper' >
        <Chessboard id="BasicBoard" position={boardPosition} onPieceDrop={onPieceDropHandler} arePiecesDraggable={fenHistory.pointer === fenHistory.fens.length-1}/>
        </div>
        <div className='game-navigation-buttons'>
        <button className='navigation-button' onClick={onResetHandler}>Reset</button>
        <button className='navigation-button' onClick={onUndoHandler}>Undo</button>
        <button className='navigation-button' onClick={onBeginningHandler}>Beginning</button>
        <button className='navigation-button' onClick={onPreviousHandler}>Previous</button>
        <button className='navigation-button' onClick={onNextHandler}>Next</button>
        <button className='navigation-button' onClick={onLastHandler}>Last</button>
        </div>
        <div className='game-load-inputs'>
          <form onSubmit={onFenSubmitHandler}>
            <input className='game-loader-input' type='text' placeholder='Paste Fen here' value={fenInput} onChange={onFenInputChange} ></input>
            <input className='game-loader-button' type='submit' value='Load Fen' onChange={onPgnInputChange}></input>
          </form>
          <form onSubmit={onPgnSubmitHandler}>
            <input className = 'game-loader-input' type='text' placeholder='Paste Pgn here' value={pgnInput} onChange={onPgnInputChange} ></input>
            <input className='game-loader-button'type='submit' value='Load Pgn'></input>
          </form>
        </div>
    </>
  )
}

export default Board;
