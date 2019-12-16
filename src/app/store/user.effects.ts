import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as userActions from './user.actions';
import { UserService } from './user.service';
import { Router } from '@angular/router';

type Action = userActions.All;

@Injectable()
export class UserEffects {

  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router,
  ) {
  }

  @Effect()
  getUser: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.GET_USER),
      mergeMap((action: userActions.GetUser) => {
        return this.userService.authenticate(action.payload);
      }),
      map(
        (data: any) => {
          if (data && data.name === 'testuser1') {
            return new userActions.Authenticated(data);
          } else {
            return new userActions.NotAuthenticated();
          }
        }
      ),
    );

  @Effect({dispatch: false})
  authenticated: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.AUTHENTICATED),
      // mergeMap((data) => { return of(data); } ),
    );

  @Effect({dispatch: false}) notAuthenticated = this.actions
    .pipe(
      ofType(userActions.NOT_AUTHENTICATED),
      tap(() => {
        this.router.navigate(['/']);
      })
    );

  @Effect()
  logout: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.LOGOUT),
      map((action: userActions.Logout) => {
        return action.payload;
      }),
      map(() => {
        return new userActions.NotAuthenticated();
      }),
      // catchError( err => Observable<Action>of(null))
    );

  @Effect() calculateCost: Observable<Action> = this.actions
    .pipe(
      ofType(userActions.ADD_SNEAKERS_PAIR, userActions.REMOVE_SNEAKERS_PAIR),
      map(() => {
        return new userActions.CalculateSneakersValue();
      })
    );

}
