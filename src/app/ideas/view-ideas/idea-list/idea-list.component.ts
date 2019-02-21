import { IdeaService } from './../../idea.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Idea } from '../../idea';
import { Subscription } from 'rxjs';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { map } from 'rxjs/internal/operators/map';
import { MatDialog } from '@angular/material/dialog';
import { IdeaDetailsComponent } from '../idea-details/idea-details.component';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(200, [
            animate('500ms {{ delay }}ms', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ], { params: { delay: 100 } })
    ])
  ]
})
export class IdeaListComponent implements OnInit, OnDestroy {
  public ideasGrid: IdeaColumns;
  public iconRoot = '../../../../assets/images/icons/functional/';

  private ideas: Idea[];
  private ideaSubscription: Subscription;

  @HostListener('window:resize', ['$event'])
  setGridCols() {
    this.ideasGrid = { columns: this.formatGrid(this.ideas) };
  }

  constructor(
    private ideaService: IdeaService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.ideaSubscription = this.ideaService.$ideas.pipe(
      map((ideas) => {
        this.ideas = ideas;
        return this.formatGrid(ideas);
      })
    ).subscribe((columns: any) => {
      this.ideasGrid = { columns: columns };
    });
  }

  ngOnInit() {
    console.log('OnInit');
    this.ideaService.getIdeas();
  }

  public openIdeaModal(idea: Idea) {
    const dialogRef = this.dialog.open(IdeaDetailsComponent, {
      maxHeight: '95%',
      minHeight: '50vh',
      maxWidth: '95%',
      data: idea
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edit') {
        this.router.navigateByUrl(`/ideas/edit/${idea._id}`);
      }
    });
  }

  private formatGrid(ideas: Idea[]) {
    let index = 0;
    const initialValue = [];
    for (let i = 0; i < this.getGridCols(); i++) {
      initialValue.push([]);
    }

    return ideas.reduce((accumulator, idea) => {
      index = index > (this.getGridCols() - 1) ? 0 : index;
      accumulator[index].push(idea);
      index++;
      return accumulator;
    }, initialValue);
  }

  private getGridCols(): number {
    const windowWidth = window.innerWidth;
    let gridCols: number;

    if (windowWidth > 1025) {
      gridCols = 4;
    }
    if (windowWidth <= 1024) {
      gridCols = 3;
    }
    if (windowWidth <= 768) {
      gridCols = 2;
    }
    if (windowWidth <= 425) {
      gridCols = 1;
    }
    return gridCols;
  }

  ngOnDestroy() {
    this.ideaSubscription.unsubscribe();
  }

}

export class IdeaColumns {
  public columns: Array<Array<Idea>>;
}
