import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import analysisBoardSliceReducer from './analysisBoardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    analysisBoard: analysisBoardSliceReducer
  },
})
