import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameHistory: { fenHistory: [], pointer: 0 },
};

export const analysisBoardSlice = createSlice({
  name: 'analysisBoard',
  initialState,
  reducers: {
    moveMade : (state, action) => {
      return {
        ...state,
        gameHistory : action.payload
      }
    },
    pointedToPrevious : (state) => {
      if (state.gameHistory.pointer > 0) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: state.gameHistory.pointer - 1
          }
        }
      }
      return state
    },
    pointedToNext: (state) => {
      if (state.gameHistory.pointer < state.gameHistory.fenHistory.length - 1) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: state.gameHistory.pointer + 1
          }
        }
      }
      return state
    },
    pointedToBeginning: (state) => {
      if (state.gameHistory.pointer > 0 ) {
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
      if (state.gameHistory.pointer < state.gameHistory.fenHistory.length - 1) {
        return {
          ...state,
          gameHistory: {
            ...state.gameHistory,
            pointer: state.gameHistory.fenHistory.length - 1
          }
        }
      }
      return state
    },
  }
})

export default analysisBoardSlice.reducer;

export const { moveMade, pointedToBeginning, pointedToPrevious, pointedToNext, pointedToLast } = analysisBoardSlice.actions;
