import { FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validators {
  validate( formGroup: FormGroup ): any {
    const {password, confirmPassword} = formGroup.value;
    if ( password === confirmPassword ) {
      return null;
    } else {
      return { passwordDontMatch: true };
    }
  }
}
