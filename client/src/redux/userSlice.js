import { createSlice } from '@reduxjs/toolkit';

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
    login: (state, action) => {
      return {
        ...state,
        isAuthenticated : true,
        firstName: action.firstName,
        lastName: action.lastName
      }
    },
    logout: (state) => {
      return {
        ...state,
        isAuthenticated : false,
        firstName: '',
        lastName: ''
      }
    },
    commentAdded: (state, action) => {
      return {
        ...state,
        myCollection: {
          ...state.myCollection,
          [action.fen] : [
            ...state.myCollection[action.fen],
            action
          ]
        }
      }
    } 
  }
})

