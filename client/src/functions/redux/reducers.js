import { combineReducers } from 'redux';
import { Chess } from 'chess.js';

const currentGame = (game = new Chess(), action) => {
  switch (action.type) {
    case 'MOVE':
      return game;
    case 'UNMOVE':
      return game;
    default:
      return game;
  }
};

const currentBoardView = (fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', action) {
  switch (key) {
    case 'SHOW':
      return fen;
      break;
  
    default:
      break;
  }
}

let nextId = 0;
const todos = (/* Something is missing …*/
  // REMOVE-START
  state = [],
  action
  // REMOVE-END
) => {
  // Remember to increase nextId every time you create a new action
  // REMOVE-START
  switch (action.type) {
    case 'ADD_TODO': {
      const id = nextId;
      nextId++;
      const { text } = action;
      return [{ id, text, completed: false }].concat(state);
    }
    case 'COMPLETED_TODO': {
      const { id } = action;
      return state.map((todo) => (
        {
          ...todo,
          completed: todo.id === id
            ? !todo.completed
            : todo.completed
        }));
    }
    default:
      return state;
  }
  // REMOVE-END
};

// Combining both reducers
const reducers = combineReducers({
  counter,
  todos,
});

export default reducers;