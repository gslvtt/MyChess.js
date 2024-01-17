import { createSlice } from '@reduxjs/toolkit';
// loggedIn reducer not being used for now

const initialState = { 
  firstName : '',
  lastName : '',
  isAuthenticated : false,
  myCollection: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers : {
    loggedIn: (state, action) => {
      return {
        ...state,
        isAuthenticated : true,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      }
    },
    loggedOut: () => {
      return {
        isAuthenticated : false,
        firstName: '',
        lastName: '',
        myCollection : {}
      }
    },
    reloaded: (state, action) => {
      return {
        ...state,
        isAuthenticated : action.payload.isAuthenticated,
        firstName : action.payload.firstName,
        lastName : action.payload.lastName,
        myCollection : action.payload.myCollection
      }
    },  
    commentAdded: (state, action) => {
      return {
        ...state,
        myCollection: {
          ...state.myCollection,
          [action.payload.fen]: {
            ...state.myCollection[action.payload.fen],
            [action.payload.id] : action.payload
          }
        }
      }
    },
    commentEdited: (state, action) => {
      return {
        ...state,
        myCollection: {
          ...state.myCollection,
          [action.payload.fen]: {
            ...state.myCollection[action.payload.fen],
            [action.payload.id]: action.payload
          }
        }
      }
    },
    commentDeleted: (state, action) => {
      const copyState = {
        ...state,
        myCollection: {
          ...state.myCollection,
          [action.payload.fen]: {
            ...state.myCollection[action.payload.fen],
            [action.payload.id]: action.payload
          }
        }
      }
      delete copyState.myCollection[action.payload.fen][action.payload.id];
      return copyState;
    } 
  }
})

export default userSlice.reducer;

export const { loggedIn, loggedOut, reloaded, commentAdded, commentEdited, commentDeleted} = userSlice.actions;
