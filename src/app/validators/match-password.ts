import { FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validators {
  validate( formGroup: FormGroup ): any {
    const {password, passwordConfirmation} = formGroup.value;
    if ( password === passwordConfirmation ) {
      return null;
    } else {
      return { passwordDontMatch: true };
    }
  }
}
