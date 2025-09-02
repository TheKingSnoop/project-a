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
  id: number;
  name: string;
  updated: Date;
  folder: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatSidenavModule, CommonModule, MatGridListModule, MatTableModule, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  breakpointObserver = inject(BreakpointObserver);
  isSidebarOpened = signal<boolean>(true);

  //breakpoint observer
  isMobile = signal<boolean>(false);

  //sidebar
  sideNavMode = computed(() => this.isMobile() ? 'over' : 'side');
  navigateToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  constructor(private router: Router) {
    this.breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe((result: BreakpointState) => {
      if(result.matches) {
        this.isMobile.set(true);
        this.isSidebarOpened.set(false);
      } else {
        this.isMobile.set(false);
      }
    });
  }

  invoices: InvDataTypes[] = [
      {
        id: 1,
        name: 'Car wash',
        updated: new Date('1/1/16'),
        folder: "work"
      },
      {
        id: 2,
        name: 'Fixing washing machine',
        updated: new Date('1/17/22'),
        folder: "home"
      },
      {
        id: 3,
        name: 'Cleaning',
        updated: new Date('1/28/23'),
        folder: "work"
      },
      {
        id: 4,
        name: 'Pest Control',
        updated: new Date('2/1/18'),
        folder: "work"
      },
      {
        id: 5,
        name: 'Internet',
        updated: new Date('2/17/16'),
        folder: "home"
      },
      {
        id: 6,
        name: 'Tv Subscription',
        updated: new Date('5/28/24'),
        folder: "other"
      },
    ];

  toggleOnMobile(sidenav: any) {
    if(this.isMobile()) {
      sidenav.toggle();
    }
  }
}
