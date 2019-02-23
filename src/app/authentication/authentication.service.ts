import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public login(creds: Credentials): Promise<boolean> {
    console.log('AuthService Logging In...');
    const encodedCreds = btoa(`${creds.username}:${creds.password}`);
    let headers = new HttpHeaders({'Authorization': 'Basic ' + encodedCreds});
    console.log(headers);

    return this.http.post('http://localhost:3001/user/login', {}, {
      headers: headers
    }).toPromise().then(result => {
      return true;
    }).catch((e) => {
      console.log(e);
      return Promise.reject(false);
    }); 
  }

}

export interface Credentials {
  username: string;
  password: string;
}
