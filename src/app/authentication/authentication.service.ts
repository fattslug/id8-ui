import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Idea } from '../ideas/idea';

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

  public login(creds: Credentials): Promise<boolean> {
    const encodedCreds = btoa(`${creds.username}:${creds.password}`);
    const headers = new HttpHeaders({'Authorization': 'Basic ' + encodedCreds});

    return this.http.post('http://localhost:3001/user/login', {}, {
      headers: headers,
      withCredentials: true
    }).toPromise().then((result: User) => {
      localStorage.setItem('displayName', result.displayName);
      localStorage.setItem('token', encodedCreds);
      this.isAuthenticated = true;
      return true;
    }).catch((e) => {
      console.log(e);
      return Promise.reject(false);
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
        return result;
      } else {
        localStorage.clear();
        throw(result);
      }
    });
  }

  public async openLoginModal(): Promise<string | boolean> {
    const dialogRef = this.dialog.open(LoginModalComponent);

    return dialogRef.afterClosed().toPromise().then((result: Credentials) => {
      return this.login(result).then(async () => {

        const authToken = environment.authToken || localStorage.getItem('token');
        console.log('AuthToken:', authToken);
        if (authToken) {
          return await this.verifyToken(authToken).then(() => {
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
        return false;
      });
    });
  }

  public async isAuthorized(idea: Idea): Promise<boolean> {
    const headers = new HttpHeaders({'Authorization': 'Basic ' + localStorage.getItem('token')});

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
    });
  }

}

export interface Credentials {
  username: string;
  password: string;
}

export class User {
  public token: string;
  public displayName: string;
}
