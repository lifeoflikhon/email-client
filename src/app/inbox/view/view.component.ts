import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../models/email';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  email: Email;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(({email}) => {
      this.email = email;
    });
  }

  ngOnInit(): void {}

}
