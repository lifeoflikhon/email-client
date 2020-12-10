import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType = 'text';
  @Input() inputControl: 'input' | 'textarea' = 'input';

  constructor() { }

  ngOnInit(): void {
  }

  showError(): ValidationErrors {
    const {dirty, touched, errors} = this.control;
    return (dirty && touched && errors);
  }
}
