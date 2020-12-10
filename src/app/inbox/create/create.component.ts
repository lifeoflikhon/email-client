import { Component, OnInit } from '@angular/core';
import { Email } from '../models/email';
import { AuthService } from '../../auth/auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  showModal: boolean;
  email: Email;
  private username: string;

  constructor(private authService: AuthService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.username = this.authService.username;
    this.email = {
      id: '',
      subject: '',
      from: `${this.username}@angular-email.com`,
      to: '',
      text: '',
      html: ''
    };
  }

  onSubmit( email: Email ): void {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
