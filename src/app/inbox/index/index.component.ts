import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  emails = [];
  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }

}
