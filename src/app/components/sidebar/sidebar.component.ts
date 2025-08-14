import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

export interface InvDataTypes {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-sidebar',
  imports: [MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatSidenavModule, CommonModule, MatGridListModule, MatTableModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  breakpointObserver = inject(BreakpointObserver);

  constructor(private router: Router) {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe((result: BreakpointState) => {
      if(result.matches) {
        this.isMobile.set(true);
      } else {
        this.isMobile.set(false);
      }
    });
  }

 invoices: InvDataTypes[] = [
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
    {
      name: 'Invoice 4',
      updated: new Date('2/1/16'),
    },
    {
      name: 'Invoice 5',
      updated: new Date('2/17/16'),
    },
    {
      name: 'Invoice 6',
      updated: new Date('5/28/16'),
    },
  ];

  //breakpoint observer
  isMobile = signal<boolean>(false);

  //sidebar
  sideNavMode = computed(() => this.isMobile() ? 'over' : 'side');
  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
