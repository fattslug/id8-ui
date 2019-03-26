import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Idea } from '../ideas/idea';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isAuthenticated: boolean;
  public displayName = localStorage.getItem('displayName');
  public authToken = localStorage.getItem('token');

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    if (this.authToken) {
      this.verifyToken(this.authToken).then(() => {
        this.isAuthenticated = true;
      }).catch((e) => {
        console.log('Error verifying token:', e);
      });
    }
  }

  public async login(creds: Credentials): Promise<string> {
    const encodedCreds = btoa(`${creds.username}:${creds.password}`);
    const headers = new HttpHeaders({'Authorization': 'Basic ' + encodedCreds});

    return this.http.post(`${environment.serviceUrl}/user/login`, {}, {
      headers: headers,
      withCredentials: true
    }).toPromise().then((user: User) => {
      localStorage.setItem('displayName', user.displayName);
      localStorage.setItem('token', user.authToken);
      this.isAuthenticated = true;
      return user.authToken;
    }).catch((e) => {
      console.log(e);
      return Promise.reject('Unable to login');
    });
  }

  public async verifyToken(authToken: string): Promise<boolean> {
    return this.http.post(`${environment.serviceUrl}/user/verify`, {
      token: authToken
    }, {
      withCredentials: true
    }).toPromise().then((result: boolean) => {
      this.isAuthenticated = result;
      if (result) {
        return result;
      }
    }).catch((e) => {
      console.log('Clearing localStorage...');
      localStorage.clear();
      throw(e);
    });
  }

  public async openLoginModal(): Promise<string | boolean> {
    const dialogRef = this.dialog.open(LoginModalComponent);

    return dialogRef.afterClosed().toPromise().then((result: Credentials) => {
      return this.login(result).then(async (authToken) => {

        if (authToken) {
            this.displayName = localStorage.getItem('displayName');
            this.authToken = authToken;
            this.snackBar.open('Successfully logged in', 'Dismiss', {
              duration: 2000,
              panelClass: 'success'
            });
            return authToken;
        }
        return false;

      }).catch(e => {
        console.log('LOGIN FAILED', e);
        this.snackBar.open('Error logging in', 'Dismiss', {
          duration: 2000,
          panelClass: 'error'
        });
        return false;
      });
    });
  }

  public async isAuthorized(idea: Idea): Promise<boolean> {
    const headers = new HttpHeaders({'Authorization': 'Basic ' + localStorage.getItem('token')});

    return this.http.post<boolean>(`${environment.serviceUrl}/user/authorized`, {
      idea: idea
    }, {
      headers: headers,
      withCredentials: true
    }).toPromise().then((result: boolean) => {
      return result;
    }).catch((e) => {
      console.log('Error checking authorization', e);
      return false;
    });
  }

  public async verifyToken(authToken: string): Promise<boolean> {
    return this.http.post('http://localhost:3001/user/verify', {
      token: authToken
    }, {
      withCredentials: true
    }).toPromise().then((result: boolean) => {
      this.isAuthenticated = result;
      if (result) {
        return result
      } else {
        localStorage.clear();
        throw(result);
      }
    })
  }

  public async openLoginModal(): Promise<string | boolean> {
    const dialogRef = this.dialog.open(LoginModalComponent);

    return dialogRef.afterClosed().toPromise().then((result: Credentials) => {
      return this.login(result).then(async () => {

        const authToken = localStorage.getItem('token');
        if (authToken) {
          return await this.verifyToken(authToken).then((result: boolean) => {
            this.displayName = localStorage.getItem('displayName');
            this.authToken = authToken;
            this.snackBar.open('Successfully logged in', 'Dismiss', {
              duration: 2000,
              panelClass: 'success'
            });
            return authToken;
          }).catch((e) => {
            this.snackBar.open('Error verifying user token', 'Dismiss', {
              duration: 2000,
              panelClass: 'error'
            });
            return false;
          });
        }
        return false;

      }).catch(e => {
        console.log('LOGIN FAILED', e);
        this.snackBar.open('Error logging in', 'Dismiss', {
          duration: 2000,
          panelClass: 'error'
        });
        return false;e
      })
    });
  }

  public async isAuthorized(idea: Idea): Promise<boolean> {
    let headers = new HttpHeaders({'Authorization': 'Basic ' + localStorage.getItem('token')});

    return this.http.post<boolean>('http://localhost:3001/user/authorized', {
      idea: idea
    }, {
      headers: headers,
      withCredentials: true
    }).toPromise().then((result: boolean) => {
      return result;
    }).catch((e) => {
      console.log('Error checking authorization', e);
      return false;
    })
  }

}

export interface Credentials {
  username: string;
  password: string;
}

export class User {
  public _id?: string;
  public username?: string;
  public displayName?: string;
  public authToken?: string;
}
