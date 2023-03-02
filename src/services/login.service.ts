import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap} from 'rxjs';
import { environment } from '.secure_files/environment';
import { User } from '../models/user.model';

const { apiUser, apiKey } = environment;

@Injectable({
  providedIn: 'root',
})

// Handles log in and creation of new user account
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  public login(username: string): Observable<User> {
    return this.checkUsername(username).pipe(
      switchMap((user: User | undefined) => {
        if (user === undefined) {
          return this.createUser(username);
        }
        return of(user);
      })
    );
  }

  // Check  if user exists
  private checkUsername(username: string): Observable<User | undefined> {
    return this.http
      .get<User[]>(`${apiUser}?username=${username}`)
      .pipe(map((response: User[]) => response.pop()));
  }

  private createUser(username: string): Observable<User> {
    const user = {
      username,
      pokemon: [],
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    });
    return this.http.post<User>(apiUser, user, {
      headers,
    });
  }
}
