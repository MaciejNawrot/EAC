import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from "./state";
import { selectIsLogged } from "./selectors";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loggedIn = false;
  user;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
  }

  authenticate(data?) {
    // console.log(data);

    return this.http.get('https://newsapi.org/v1/articles?source=buzzfeed&apiKey=48cce0efed514accb86d6765f31a3fcc').pipe(
      map(() => {
        if (data && data.name === 'test') {
          return {
            uid: 1,
            name: 'testuser1',
            password: '12345678',
            sneakers: [
              {id: 1, model: 'Air Max 720', brand: 'Nike', cost: 699},
              {id: 2, model: 'Air Jordan 1 Mid SE', brand: 'Nike', cost: 499},
              {id: 3, model: 'Jordan Proto-Max 720', brand: 'Nike', cost: 749},
              {id: 4, model: 'Air Max2 Light', brand: 'Nike', cost: 399},
              {id: 5, model: 'Yung-96', brand: 'Adidas', cost: 249},
            ]
          };
        }
        return {
          uid: 0,
          name: 'GUEST',
          password: '',
        };
      })
    );
  }

  isAuthenticated() {
    return this.store.pipe(
      take(1),
      // select(Selec),
      tap((state) => {
        // console.log(state);
      }),
      select(selectIsLogged),
      // map(state => !!state.user),
      tap((data) => {
        // console.log(data);
      }),
      mergeMap(v => of(v)),
    );

    // return new Promise<boolean>(
    //   (resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(this.loggedIn);
    //     }, 1000);
    //   }
    // );
  }

  isLogged() {
    return true;
  }

  getFacebookStatus() {
    return this.http.get('https://swapi.co/api/people/1/');
  }

}

export interface SneakersPair {
  id: number;
  model: string;
  brand: string;
  cost: number;
}
