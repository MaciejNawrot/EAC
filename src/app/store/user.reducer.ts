import * as userActions from './user.actions';
import { User } from './user';
import { SneakersPair } from './user.service';

export type Action = userActions.All;

const defaultUser: User = {
  isLogged: false,
  name: 'GUEST',
  password: ' t',
  uid: 2342,
  sneakers: [],
};

export function userReducer(state: User = defaultUser, action: Action) {

  switch (action.type) {
    case userActions.GET_USER:
      return {...state, loading: true};

    case userActions.AUTHENTICATED:
      return {...state, ...action.payload, loading: false, isLogged: true};

    case userActions.NOT_AUTHENTICATED:
      return {...state, ...defaultUser, loading: false};

    case userActions.ERROR:
      return {...state, ...action.payload, loading: false};

    case userActions.LOGOUT:
      return {...state, loading: true};

    case userActions.ADD_SNEAKERS_PAIR:
      return {...state, sneakers: [...state.sneakers, action.payload]};

    case userActions.REMOVE_SNEAKERS_PAIR:
      return {...state, sneakers: [...state.sneakers.filter(x => x.id !== action.payload.id)]};

    case userActions.CALCULATE_SNEAKERS_PAIR:
      return {
        ...state,
        totalCost: state.sneakers.length ?
          state.sneakers.reduce((a, b) => ({cost: a.cost + b.cost} as SneakersPair)).cost :
          0
      };

    default:
      return state;
  }
}
