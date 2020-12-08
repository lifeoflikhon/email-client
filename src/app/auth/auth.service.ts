import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface UsernameAvailableResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rootUrl = 'https://api.angular-email.com';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient ) {
  }

  usernameAvailable( username: string ): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`, { username });
  }

  signup( credentials: SignupCredentials ): Observable<SignupCredentials> {
    return this.http.post<SignupCredentials>(`${this.rootUrl}/auth/signup`, credentials).pipe(tap(() => {
      this.loggedIn.next(true);
    }));
  }
}