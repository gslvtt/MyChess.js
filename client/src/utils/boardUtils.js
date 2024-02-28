import { parse } from 'pgn-parser';

// EXPORT UTILS
// Initial standard starting position
export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Loads pgn into game the passed as argument
export async function gameFromPgn(pgn, game) {
  game.reset()

  try {
    const parsedPgn = parse(pgn);
    const gameData = extractGameFromPgn(parsedPgn, game);
    if (gameData.valid) {
      addInfoHeadersToComments(parsedPgn, gameData.comments);
      console.log(gameData)
      return gameData;
    }
    else {
      throw new Error('Pgn Not valid')
    }
  } catch (error) {
    game.reset();
    alert('Invalid  or Incompatible Pgn');
    console.log(error);
    return { game, comments: {}, valid: false }
  }
}

// HELPER FUNCTIONS
function extractGameFromPgn(parsedPgn, game) {
  const gameData = {
    game,
    comments: {},
    valid: false
  }
  gameData.valid = parsedPgn[0].moves.every(move => {
    const gameProgress = gameData.game.move(move.move);
    if (gameProgress !== null) {
      // Will have to check if key is already present and push when integrating multiple sources in a single object
      const currentFen = gameData.game.fen();
      gameData.comments[currentFen] = move.comments.filter(comment => comment.text).map(comment => {
        return { title: '', text: comment.text, source: 'Pgn', tags: [], fen: currentFen }
      });
      return true;
    } else {
      return false;
    }
  });
  return gameData;
}

function addInfoHeadersToComments(parsedPgn, comments) {
  const headers = parsedPgn[0].headers.slice(1).reduce((str, header) => `${str}\n${header.name}: ${header.value}`, '');
  comments[STARTING_FEN] = [{ title: '', text: headers, source: 'Pgn', tags: [], fen: STARTING_FEN }];
}