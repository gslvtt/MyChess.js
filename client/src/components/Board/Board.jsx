import { useState, useMemo, useEffect } from 'react'
import './Board.css'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { validateFen } from 'chess.js';
import { parse } from 'pgn-parser';

function Board ({setPgnComments, setBoardPosition, boardPosition}) {
  const newGame = useMemo(() => new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), []);
  const [game, setGame] = useState(newGame);
  //todo const [boardPosition, setBoardPosition] = useState(game.fen());
  const [fenHistory, setFenHistory] = useState({fens:[], pointer:0});
  const [fenInput, setFenInput] = useState('');
  const [pgnInput, setPgnInput] = useState('');
  //todo const [pgnComments, setPgnComments] = useState({});

  
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

  // console.log(fenHistory);
  // console.log(game.isThreefoldRepetition());
  // console.log(game.ascii());
  console.log({game});
  // const pgnTest = parse("1. e4 e5 2. Bc4 { C23 Bishop's Opening } Nc6 3. Qh5?! { (0.21 → -0.42) Inaccuracy. d3 was best. } (3. d3 Bc5 4. Nf3 Nf6 5. c3 a5 6. O-O d6 7. Re1 O-O) 3... g6 4. Qf3 Bg7?? { (-0.24 → Mate in 1) Checkmate is now unavoidable. Nf6 was best. } (4... Nf6 5. Ne2 d6 6. Nbc3 Bg7 7. d3 O-O 8. a3 Nd4 9. Nxd4) 5. Qb3?? { (Mate in 1 → -2.11) Lost forced checkmate sequence. Qxf7# was best. } (5. Qxf7#) 5... Qe7? { (-2.11 → -0.75) Mistake. Nd4 was best. } (5... Nd4) 6. Nf3 Nf6 7. d3 O-O 8. a3 a6 9. c3?! { (-0.72 → -1.59) Inaccuracy. Bg5 was best. } (9. Bg5 h6 10. Bxf6 Qxf6 11. a4 d6 12. O-O Na5 13. Qb4 Nxc4 14. Qxc4 Be6 15. Qb4 Rab8) 9... b5 10. Bd5 Bb7 11. Qc2?! { (-0.77 → -1.78) Inaccuracy. Bg5 was best. } (11. Bg5 Na5) 11... Rab8? { (-1.78 → -0.19) Mistake. Nxd5 was best. } (11... Nxd5 12. exd5) 12. c4? { (-0.19 → -1.45) Mistake. Bg5 was best. } (12. Bg5) 12... Na5? { (-1.45 → -0.04) Mistake. bxc4 was best. } (12... bxc4 13. Bxc4 d5 14. exd5 Nd4 15. Nxd4 exd4+ 16. Qe2 Qxe2+ 17. Kxe2 Rfe8+ 18. Kd1 Ng4 19. Rf1) 13. Bxb7 Nxb7 14. cxb5 axb5 15. Qxc7?? { (-0.40 → -4.58) Blunder. O-O was best. } (15. O-O c6) 15... Rfc8 16. Qxe5?! { (-4.76 → -6.18) Inaccuracy. Qxc8+ was best. } (16. Qxc8+ Rxc8 17. O-O Nc5 18. Bg5 Nxd3 19. Nc3 Qe6 20. Bxf6 Bxf6 21. Nd5 Bd8 22. Rfd1 Nxb2) 16... Qxe5 17. Nxe5?! { (-5.69 → -7.65) Inaccuracy. O-O was best. } (17. O-O Qe8 18. Nc3 Nc5 19. Bf4 Ra8 20. Rad1 Nh5 21. Nd5 Nxf4 22. Nxf4 Bxb2 23. e5 Rxa3) 17... Rxc1+ 18. Ke2 Rxh1 19. Nxd7 Nxd7 { White resigns. } 0-1")
  // console.log({pgnTest});
  console.log(game.moves({verbose: true}));
  console.log(game.pgn());
  // console.log({pgnComments});

  
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
            comments[importingGame.fen()] = move.comments.map(comment=> {
              return {title: '', text: comment.text, source: 'Pgn', tags:[] }
            });
            return true;
          } else {
            return false;
          }
          // return gameProgress !== null ? true : false
        });
        if (valid) {
          const headers = parsedPgn[0].headers.reduce((str, header) => `${str}\n${header.name}: ${header.value}`, '');
          comments[STARTING_FEN] = [{title: '', text : headers, source:'Pgn', tags: []}];
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
