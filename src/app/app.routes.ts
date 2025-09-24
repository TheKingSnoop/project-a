import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateInvoiceComponent } from './pages/create-invoice/create-invoice.component';
import { InvoiceIdComponent } from './pages/invoice-id/invoice-id.component';
import { InvoiceCreatedComponent } from './pages/invoice-created/invoice-created.component';
import { EditInvoiceComponent } from './pages/edit-invoice/edit-invoice.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account/create-invoice', component: CreateInvoiceComponent },
  { path: 'account/:userId/:invoiceId', component: InvoiceIdComponent },
  { path: 'account/create-invoice/invoice-created/:userId/:invoiceId/success', component: InvoiceCreatedComponent },
  { path: 'account/edit-invoice/:userId/:invoiceId', component: EditInvoiceComponent },
  { path: '**', redirectTo: '' }, // Fallback route for unknown paths
];
