import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtClient } from '../models/jwtclient';
import { User } from '../models/user';
import { Userdto } from '../models/userdto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl : string = "http://localhost:8085/api/v1/security"

  constructor(
    private httpClient : HttpClient
  ) {}

  login(userdto : Userdto){
    return this.httpClient.post<JwtClient>(this.apiUrl+ "/login", userdto)
  }

  register(user:User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl+ "/register", user)
  }
}
