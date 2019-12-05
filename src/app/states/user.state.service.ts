import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserColdService } from '@services/user.service.cold';
import { cloneDeep } from 'lodash';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  /** Список пользователей */
  private users$$ = new BehaviorSubject<IUser[]>([]);

  /** Запрашиваются ли сейчас данные */
  private isSubmited = {
    getUsers: false
  };

  constructor(private userColdService: UserColdService) { }

  /** Получить список пользователей
   * @param  isForce - Насильное обновление
   */
  public getUsers(isForce = false): Observable<IUser[]> {
    if (!isForce && (this.users$$.value.length || this.isSubmited.getUsers)) {
      return this.users$$.asObservable();
    }

    this.isSubmited.getUsers = true;

    this.userColdService.getUsers().subscribe((data) => {
      this.users$$.next(data);

      this.isSubmited.getUsers = false;
    });

    return this.users$$.asObservable();
  }

  /** Получить пользователя */
  public getUser(id: string): Observable<IUser> {
    /** Есть ли в нашем кеше */
    if (this.users$$.value.length) {
      const findData = this.users$$.value.find(data => data.id === id);

      if (findData) {
        return of(cloneDeep(findData));
      }
    }

    return this.userColdService.getUser(id)
      .pipe(
        tap((data) => { // Если хотим сохранить в кеш
          const cash = cloneDeep(this.users$$.value);

          cash.push(data);

          this.users$$.next(cash);
        })
      );
  }
}
