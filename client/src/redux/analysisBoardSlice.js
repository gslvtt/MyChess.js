import { createSlice } from '@reduxjs/toolkit';
const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const initialState = {
  gameHistory: { fenHistory: [STARTING_FEN], pointer: 0 },
  pgnComments: {}
};

export const analysisBoardSlice = createSlice({
  name: 'analysisBoard',
  initialState,
  reducers: {
    moveMade : (state, action) => {
      const historyLength = state.gameHistory.fenHistory.length;

      if(action.payload !== state.gameHistory.fenHistory[historyLength]) {
        return {
          ...state,
          gameHistory : {
            pointer: historyLength,
            fenHistory : [
              ...state.gameHistory.fenHistory,
              action.payload
            ]
          }
        }
      }
      return state;
    },

    moveUndone : (state) => {
      const historyLength = state.gameHistory.fenHistory.length;

      if (historyLength > 1) {
        return {
          ...state,
          gameHistory: {
            pointer: historyLength - 2,
            fenHistory: state.gameHistory.fenHistory.slice(0, historyLength - 1)
          }
        }
      }
    },

    gameUpdated : (state, action) => {
      return {
        ...state,
        gameHistory : action.payload
      }
    },

    pgnCommentsUpdated : (state, action) => {
      return {
        ...state,
        pgnComments: action.payload
      }
    },

    pointedToPrevious : (state) => {
      const currentPointer = state.gameHistory.pointer;
      if (currentPointer > 0) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: currentPointer - 1
          }
        }
      }
      return state
    },

    pointedToNext: (state) => {
      const currentPointer = state.gameHistory.pointer;
      const historyLength = state.gameHistory.fenHistory.length;

      if (currentPointer < historyLength - 1) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: currentPointer + 1
          }
        }
      }
      return state
    },

    pointedToBeginning: (state) => {
      const currentPointer = state.gameHistory.pointer;

      if (currentPointer > 0 ) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: 0
          }
        }
      }
      return state
    },

    pointedToLast: (state) => {
      const currentPointer = state.gameHistory.pointer;
      const historyLength = state.gameHistory.fenHistory.length;

      if (currentPointer < historyLength - 1) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: historyLength - 1
          }
        }
      }
      return state
    },
  }
})

export default analysisBoardSlice.reducer;

export const { moveMade, moveUndone, gameUpdated, pointedToBeginning, pointedToPrevious, pointedToNext, pointedToLast, pgnCommentsUpdated } = analysisBoardSlice.actions;
