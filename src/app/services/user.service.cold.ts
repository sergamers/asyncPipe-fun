import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class UserColdService {
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<IUser[]> {
    return this.http.get(`${environment.apiUrl}/users`) as Observable<IUser[]>;
  }

  public getUser(id: string): Observable<IUser> {
    return this.http.get(`${environment.apiUrl}/users/${id}`) as Observable<IUser>;
  }
}
