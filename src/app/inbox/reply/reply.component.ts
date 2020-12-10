import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Email } from '../models/email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnChanges {
  showModal: boolean;
  @Input() email: Email;

  constructor(private emailService: EmailService) { }

  ngOnChanges(): void {
    let text;
    if ( this.email.text ) {
      text = this.email.text.replace(/\n/gi, '\n> ');
    } else {
      text = this.email.html;
    }
    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n\n------ ${this.email.from} wrote:\n\t> ${text}`
    };
  }

  onSubmit( email: Email ): void {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
