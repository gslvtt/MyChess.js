import { useState, useMemo } from 'react'
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { validateFen } from 'chess.js';
import { useSelector, useDispatch } from 'react-redux'
import { gameFromPgn } from '../../utils/boardUtils';

import './Board.css'
import { gameUpdated, moveMade, moveUndone, pgnCommentsUpdated } from '../../redux/analysisBoardSlice';
import BoardNavigationButtons from '../BoardNavigationButtons/BoardNavigationButtons';

function Board() {
  const currentGame = useMemo(() => new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'), []);
  const [fenInput, setFenInput] = useState('');
  const [pgnInput, setPgnInput] = useState('');

  const gameHistory = useSelector(state => state.analysisBoard.gameHistory);
  const dispatch = useDispatch();

  // GAME TO VIEW FUNCTIONS
  function updateGame (game, gameComments) {
    const fenHistory = getFenHistory(game);
    dispatch(gameUpdated({ fenHistory, pointer: fenHistory.length - 1 }))
    dispatch(pgnCommentsUpdated(gameComments || {}));
  }

  // Load Game from Fen
  function gameStartFromFen(fen, game) {
    game.load(fen)
    updateGame(game);
    setFenInput('');
  }

  // Load Game from Fen
  function loadGame(gameData) {
    updateGame(gameData.game, gameData.comments);
  }


  // Make a Move (triggered on piece drop)
  function makeAMove(move, game) {
    if (game.isGameOver()) return false;
    const result = game.move(move);
    dispatch(moveMade(game.fen()))
    // THIS RESULT ONLY CONTROLS PREMOVE LOGIC!
    return result; // null if the move was illegal, the move object if the move was legal
  }

  // HELPER FUNCTIONS

  function getFenHistory(game) {
    const gameHistory = game.history({ verbose: true });
    return gameHistory.length ? [gameHistory[0].before].concat(gameHistory.map(move => move.after)) : [currentGame.fen()];
  }

  // BOARD TO GAME FUNCTIONS

  // Make a Move
  function onPieceDropHandler(sourceSquare, targetSquare, piece) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q"
    }, currentGame);
    // illegal move

    if (move === null || currentGame.isGameOver()) return false;
    return true;
  }

  // Reset Game
  function onResetHandler() {
    currentGame.reset();
    updateGame(currentGame)
    dispatch(pgnCommentsUpdated({}));
  }

  // Undo last Move
  function onUndoHandler() {
    currentGame.undo();
    dispatch(moveUndone())
  }

  // BUTTON AND FORM FUNCTIONS
  // Load a new game from custom position or 
  function onFenInputChange(e) {
    setFenInput(e.target.value)
  }

  function onPgnInputChange(e) {
    setPgnInput(e.target.value)
  }

  function onFenSubmitHandler(event) {
    event.preventDefault();
    if (validateFen(fenInput).ok) {
      gameStartFromFen(fenInput, currentGame);
    } else { alert('Invalid Fen') }
  }

  async function onPgnSubmitHandler(event) {
    event.preventDefault();
    const importedGame = await gameFromPgn(pgnInput, currentGame);
    loadGame(importedGame);

    if (importedGame.valid) {
      setPgnInput('');
    }
  }

  return (
    <>
      <div className='board-wrapper' >
        <Chessboard id="BasicBoard" position={gameHistory.fenHistory[gameHistory.pointer]} onPieceDrop={onPieceDropHandler} arePiecesDraggable={gameHistory.pointer === gameHistory.fenHistory.length - 1} />
      </div>
      <div className='game-navigation-buttons'>
        <button className='navigation-button' onClick={onResetHandler}>Reset</button>
        <button className='navigation-button' onClick={onUndoHandler}>Undo</button>
      </div>
      <BoardNavigationButtons/>
      <div className='game-load-inputs'>
        <form onSubmit={onFenSubmitHandler}>
          <input className='game-loader-input' type='text' placeholder='Paste Fen here' value={fenInput} onChange={onFenInputChange} ></input>
          <input className='game-loader-button' type='submit' value='Load Fen' onChange={onPgnInputChange}></input>
        </form>
        <form onSubmit={onPgnSubmitHandler}>
          <input className='game-loader-input' type='text' placeholder='Paste Pgn here' value={pgnInput} onChange={onPgnInputChange} ></input>
          <input className='game-loader-button' type='submit' value='Load Pgn'></input>
        </form>
      </div>
    </>
  )
}

export default Board;
