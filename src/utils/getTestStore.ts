import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';
import { AppDispatch } from '../state/store';

const getTestStore = <State = {}>(initialState: State) =>
  configureStore<State, AppDispatch>(
    getDefaultMiddleware({
      immutableCheck: false,
    }),
  )(initialState);

export default getTestStore;
