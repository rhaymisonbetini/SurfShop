import { Injectable } from '@angular/core';

const KEY = 'authToken'

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

  clearToken(): void {
    localStorage.clear();
  }

}

