import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn: boolean;
  sessionKey = 'session';

  constructor(
  ) {
    this.isLoggedIn = !!localStorage.getItem(this.sessionKey);
  }

  removeSession(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.sessionKey);
  }

  saveSession(token: string): void {
    this.isLoggedIn = true;
    localStorage.setItem(this.sessionKey, token);
  }


}
