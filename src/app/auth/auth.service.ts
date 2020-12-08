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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rootUrl = 'https://api.angular-email.com';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor( private http: HttpClient ) {
  }

  usernameAvailable( username: string ): Observable<UsernameAvailableResponse> {
    return this.http.post<UsernameAvailableResponse>(`${ this.rootUrl }/auth/username`, { username });
  }

  signup( credentials: SignupCredentials ): Observable<SignupCredentials> {
    return this.http.post<SignupCredentials>(`${ this.rootUrl }/auth/signup`, credentials, {
      withCredentials: true
    }).pipe(tap(() => {
      this.loggedIn.next(true);
    }));
  }

  checkAuth(): Observable<any> {
    return this.http.get<SignedInResponse>(`${ this.rootUrl }/auth/signedin`, {
      withCredentials: true
    }).pipe(tap(( { authenticated } ) => {
      this.loggedIn.next(authenticated);
    }));
  }

  signout(): Observable<{}> {
    return this.http.post(`${ this.rootUrl }/auth/signout`, {}).pipe(tap(() => {
      this.loggedIn.next(false);
    }));
  }

  signin( credentials: SigninCredentials ): Observable<any> {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials).pipe(tap(() => {
      this.loggedIn.next(true);
    }));
  }
}
