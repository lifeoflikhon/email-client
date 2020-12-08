import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {
  }

  validate = ( control: FormControl ): Observable<ValidationErrors | null> => {
    const { value } = control;
    return this.authService.usernameAvailable(value).pipe(
      map(response => {
        if ( response.available ) {
          return null;
        }
      }),
      catchError(err => {
        if ( err.status === 422 ) {
          return of({noUnique: true});
        } else {
          return of({noConnection: true});
        }
      })
    );
  };
}
