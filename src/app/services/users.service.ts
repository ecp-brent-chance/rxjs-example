import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject, merge } from 'rxjs';
import { map, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { dummyUsers } from './users.dummy';
import { User, LookupUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  private _users$ = new BehaviorSubject<User[]>(dummyUsers);
  private users$ = this._users$.asObservable();

  public lookupUsers$ = this.users$.pipe(
    map(users =>
      users.map(x => {
        const { id, first, last } = x;
        const result: LookupUser = { id, first, last };
        return result;
      })
    ),
    distinctUntilChanged(),
  )

  private _loggedInId$ = new BehaviorSubject<Number>(0);
  private loggedInId$ = this._loggedInId$.asObservable().pipe(
    distinctUntilChanged(),
  );
  public loggedIn$ = combineLatest(
    this.users$,
    this.loggedInId$
  ).pipe(
    map(([users, id]) =>
      users.find(x => x.id === id)
    ),
    shareReplay(1),
  );

  private _activeId$ = new ReplaySubject<Number>();
  private activeId$ = merge(
    this.loggedInId$,
    this._activeId$.asObservable(),
  ).pipe(
    distinctUntilChanged(),
  );
  public active$ = combineLatest(
    this.users$,
    this.activeId$
  ).pipe(
    map(([users, id]) =>
      users.find(x => x.id === id)
    ),
    shareReplay(1),
  );

  public selectActiveUserById(id: number) {
    this._activeId$.next(id);
  }
}
