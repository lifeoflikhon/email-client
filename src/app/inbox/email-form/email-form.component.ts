import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Email } from '../models/email';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  @Input() email: Email;
  @Output() submittedEmail = new EventEmitter();
  emailForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    const {subject, to, from, text} = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }

  onSubmit(): void {
    if ( this.emailForm.invalid ) {
      return;
    } else {
      this.submittedEmail.emit(this.emailForm.value);
    }
  }
}
