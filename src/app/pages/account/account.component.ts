import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal.service';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-account',
  imports: [MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatSidenavModule, CommonModule],
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

  signalService = inject(SignalService);
  sideNavMenuCollapsed = this.signalService.collapsedSideMenu;
  sideNavWidth = computed(() => this.sideNavMenuCollapsed() ? '65px' : '250px');
  avatarSize = computed(() => this.sideNavMenuCollapsed() ? 'small-avatar' : 'large-avatar');
  selectedInvoice = signal<number>(0);

  
  sideNavWidthTest = computed(() => this.sideNavMenuCollapsed() ? '65px' : '250px');
}