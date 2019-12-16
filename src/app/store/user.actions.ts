import { Action } from '@ngrx/store';
import { SneakersPair } from './user.service';

export const GET_USER = '[Auth] Get user';
export const AUTHENTICATED = '[Auth] Authenticated';
export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export const LOGOUT = '[Auth] Logout';
export const ERROR = '[Auth] Error';
export const ADD_SNEAKERS_PAIR = '[Sneakers] Add Pair';
export const REMOVE_SNEAKERS_PAIR = '[Sneakers] Remove Pair';
export const CALCULATE_SNEAKERS_PAIR = '[Sneakers] Calculate Value';

export class GetUser implements Action {
  readonly type = GET_USER;

  constructor(public payload?: any) {
  }
}

export class Authenticated implements Action {
  readonly type = AUTHENTICATED;

  constructor(public payload?: any) {
  }
}

export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;

  constructor(public payload?: any) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;

  constructor(public payload?: any) {
  }
}

export class AuthError implements Action {
  readonly type = ERROR;

  constructor(public payload?: any) {
  }
}

export class AddSneakersPair implements Action {
  readonly type = ADD_SNEAKERS_PAIR;

  constructor(public payload: SneakersPair) {
  }
}

export class RemoveSneakersPair implements Action {
  readonly type = REMOVE_SNEAKERS_PAIR;

  constructor(public payload: any) {
  }
}

export class CalculateSneakersValue {
  readonly type = CALCULATE_SNEAKERS_PAIR;

  constructor(public payload?: any) {
  }
}

export type All =
  GetUser |
  Authenticated |
  NotAuthenticated |
  Logout |
  AuthError |
  AddSneakersPair |
  RemoveSneakersPair |
  CalculateSneakersValue
  ;
