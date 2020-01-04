import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login() {

  }

  register(user: User) {
   return this.http.post(environment.api+'create', user)
  }

  logout() {

  }

  getAuth() {

  }

}
