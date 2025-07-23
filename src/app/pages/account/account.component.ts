import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-account',
  imports: [MatListModule, MatIconModule, MatDividerModule, DatePipe, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})


export class AccountComponent {
 constructor(private router: Router) {}

 invoices: Section[] = [
    {
      name: 'Invoice 1',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Invoice 2',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Invoice 3',
      updated: new Date('1/28/16'),
    },
  ];

}
