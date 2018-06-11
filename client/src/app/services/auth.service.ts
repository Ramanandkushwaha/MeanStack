import { Injectable } from '@angular/core';
import { Http,  Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://169.62.133.41:8080"

  constructor(
    private http: Http
  ) { }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }
}
