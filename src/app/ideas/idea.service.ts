import { Idea, BusinessArea } from './idea';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperatorFunction, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideas: BehaviorSubject<Idea[]> = new BehaviorSubject([]);
  public $ideas: Observable<Idea[]> = this.ideas.asObservable();

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
      ).toPromise().then((ideaID) => {
        resolve(ideaID);
      });
    });
  }

  public getIdeas(filter?: IdeaFilter): void {
    let filterParams = '';
    if (filter) {
      filterParams = this.buildFilterParams(filter);
    }

    this.http.get<Idea[]>(`http://localhost:3001/ideas${filterParams}`).pipe(
      catchError(this.handleError)
    ).toPromise().then((ideas: Idea[]) => {
      this.ideas.next(ideas);
    });
  }

  private buildFilterParams(filter: IdeaFilter): string {
    let filterString = '?';
    Object.keys(filter).forEach((prop, index) => {
      if (index !== 0) {
        filterString += '?';
      }
      filterString += `${prop}=${filter[prop]}`;
    });
    return filterString;
  }

  public getIdeaByID(ideaID: string): Promise<Idea> {
    return this.http.get<Idea>(`http://localhost:3001/ideas/${ideaID}`).pipe(
      catchError(this.handleError)
    ).toPromise().then((idea: Idea) => {
      return idea;
    });
  }

  public updateIdeaByID(ideaID: string, idea: Idea): Promise<Idea> {
    return this.http.put<Idea>(`http://localhost:3001/ideas/${ideaID}`, {
      idea: idea
    }).pipe(
      catchError(this.handleError)
    ).toPromise().then((updatedIdea: Idea) => {
      return idea;
    });
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
