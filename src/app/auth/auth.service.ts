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

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SigninResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rootUrl = 'https://api.angular-email.com';
  loggedIn = new BehaviorSubject<boolean>(null);
  username: string;

  constructor( private http: HttpClient ) {
  }

  usernameAvailable( username: string ): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(`${ this.rootUrl }/auth/username`, { username });
  }

  signup( credentials: SignupCredentials ): Observable<SignupCredentials> {
    return this.http.post<SignupCredentials>(`${ this.rootUrl }/auth/signup`, credentials, {
      withCredentials: true
    }).pipe(tap(( { username } ) => {
      this.loggedIn.next(true);
      this.username = username;
    }));
  }

  checkAuth(): Observable<any> {
    return this.http.get<SignedInResponse>(`${ this.rootUrl }/auth/signedin`, {
      withCredentials: true
    }).pipe(tap(( { authenticated, username } ) => {
      this.loggedIn.next(authenticated);
      this.username = username;
    }));
  }

  signout(): Observable<{}> {
    return this.http.post(`${ this.rootUrl }/auth/signout`, {}).pipe(tap(() => {
      this.loggedIn.next(false);
    }));
  }

  signin( credentials: SigninCredentials ): Observable<SigninResponse> {
    return this.http.post<SigninResponse>(`${ this.rootUrl }/auth/signin`, credentials)
      .pipe(
        tap(( { username } ) => {
            this.loggedIn.next(true);
            this.username = username;
          }
        )
      );
  }
}
