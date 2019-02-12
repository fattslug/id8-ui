import { Idea } from './idea';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(
    private http: HttpClient
  ) { }

  public async addIdea(idea: Idea): Promise<any> {
    return this.http.post('http://localhost:3001/ideas/', {
      idea: idea
    }).toPromise().then((result: Idea) => {
      console.log('Submitted idea:', result);
      return Promise.resolve(result);
    });
    return Promise.reject(false);
  }

  public getBusinessAreas() {
    this.http.get('http://localhost:3001/businessareas/').toPromise().then((result => {

    }));
  }
}

export interface HttpResponse {
  success: boolean;
  body?: any;
  message?: string;
}
