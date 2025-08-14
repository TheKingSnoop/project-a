import { Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private _isOpen = signal(true);
  
  isOpen = this._isOpen.asReadonly();
  
  toggle(): void {
    this._isOpen.set(!this._isOpen());
  }
}

