import { Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  collapsedSideMenu = signal(false);
}

