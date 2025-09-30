import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { InvoiceIdComponent } from './pages/invoice-id/invoice-id.component';
import { InvoiceCreatedComponent } from './pages/invoice-created/invoice-created.component';
import { EditInvoiceComponent } from './pages/edit-invoice/edit-invoice.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'account', component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      {path: '', component: AccountComponent },
      { path: 'create-invoice', component: CreateInvoiceComponent },
      { path: ':userId/:invoiceId', component: InvoiceIdComponent },
      { path: 'create-invoice/invoice-created/:userId/:invoiceId/success', component: InvoiceCreatedComponent },
      { path: 'edit-invoice/:userId/:invoiceId', component: EditInvoiceComponent },
    ],
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }, // Fallback route for unknown paths
];
