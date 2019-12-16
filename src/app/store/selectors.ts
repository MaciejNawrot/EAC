import { createSelector } from '@ngrx/store';
import { AppState } from './state';
import { User } from './user';

export const selectState = (state: AppState) => state.user;

export const selectIsLogged = createSelector(
  selectState,
  (state: User) => {
    console.log(state);
    return state.isLogged;
  }
);
