import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { SignalService } from '../../services/signal.service';
import { LoginService } from '../../services/login.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import { jwtDecode } from "jwt-decode";
import { InvoicesService } from '../../services/invoices.service';

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

  invoiceArray: any = signal([]);

  constructor(private router: Router, private invoiceService: InvoicesService) {
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

  toggleOnMobile(sidenav: any) {
    if(this.isMobile()) {
      sidenav.toggle();
    }
  }

  decodedJwtObject: any = {};

  ngOnInit() {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedJwtObject = jwtDecode(token);
    }
    this.invoiceService.getAllInvoices(this.decodedJwtObject.id).subscribe((invoices: any) => {
      this.invoiceArray.set(invoices.payload);
    });
  }
  
}
