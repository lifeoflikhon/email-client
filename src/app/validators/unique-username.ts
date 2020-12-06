import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor( private http: HttpClient ) {
  }

  validate = ( control: FormControl ): Observable<ValidationErrors | null> => {
    const { value } = control;
    return this.http.post<any>('https://api.angular-email.com/auth/username', {
      username: value
    }).pipe(
      map(response => {
        if ( response.available ) {
          return null;
        }
      }),
      catchError(err => {
        if ( err.status === 422 ) {
          return of({unique: false});
        } else {
          return of({connection: false});
        }
      })
    );
  };
}
