import { Idea, BusinessArea } from './idea';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperatorFunction, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(
    private http: HttpClient
  ) { }

  public addIdea(idea: Idea): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post<Idea>('http://localhost:3001/ideas/', {
        idea: idea
      }).pipe(
        map(savedIdea => savedIdea._id),
        catchError(this.handleError)
      ).subscribe((ideaID) => {
        resolve(ideaID);
      });
    });
  }

  public getIdeas(filter: IdeaFilter) {
    this.buildFilterParams(filter);
    // return this.http.get('http://localhost:3001/ideas/')
  }

  private buildFilterParams(filter: IdeaFilter): string {
    let filterString = '?';
    Object.keys(filter).forEach((prop, index) => {
      if (index !== 0) {
        filterString += '?';
      }
      filterString += `${prop}=${filter[prop]}`;
    });
    console.log(filterString);
    return filterString;
  }

  public getBusinessAreas(): Promise<BusinessArea[]> {
    return new Promise((resolve, reject) => {
      this.http.get<BusinessArea[]>('http://localhost:3001/businessareas/')
      .pipe(
        catchError(this.handleError)
      ).toPromise().then((result => {
        resolve(result);
      }));
    });
  }

  private handleError(handleError: any): OperatorFunction<string, any> {
    throw new Error(handleError.error.message);
  }
}

export class IdeaFilter {
  public startDate?: Date;
  public endDate?: Date;
  public title?: string;
  public businessAreas?: BusinessArea[];
}
