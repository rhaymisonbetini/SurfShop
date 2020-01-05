import { Injectable } from '@angular/core';

const KEY = 'authToken';
const USER = 'userId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  hasToken() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  setToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  getToken() {
    return localStorage.getItem(KEY);
  }

  setUserId(id: string): void {
    localStorage.setItem(USER, id);
  }

  getUserIdToken() {
    return localStorage.getItem(USER);
  }

  clearToken(): void {
    localStorage.clear();
  }

}

