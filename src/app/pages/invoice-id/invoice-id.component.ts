import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

export interface InvoiceDataTypes {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

@Component({
  selector: 'app-invoice-id',
  imports: [MatListModule, MatIconModule, MatDividerModule, MatButtonModule, MatSidenavModule, CommonModule, MatGridListModule, MatTableModule],
  templateUrl: './invoice-id.component.html',
  styleUrl: './invoice-id.component.scss'
})
export class InvoiceIdComponent implements OnInit {
   breakpointObserver = inject(BreakpointObserver);

   //Signal to hold the invoice :id
   invoiceId = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {
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

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.invoiceId.set(id);
    });
  }

  invoiceData: InvoiceDataTypes[] = [
    {
      description: 'Website Development Website Development Website Development Website Development Website Development',
      quantity: 1,
      unitPrice: 800,
      amount: 800
    },
    {
      description: 'Logo Design',
      quantity: 2,
      unitPrice: 50,
      amount: 100
    },
    {
      description: 'Hosting Setup',
      quantity: 1,
      unitPrice: 100,
      amount: 100
    }
  ];

  //breakpoint observer
  isMobile = signal<boolean>(false);
  
  //table
  displayedColumns: string[] = ['description', 'quantity', 'unitPrice', 'amount'];
  dataSource = this.invoiceData;

  //sidebar
  sideNavMode = computed(() => this.isMobile() ? 'over' : 'side');
  columnSpan = computed(() => this.isMobile() ? 2 : 1);
}
