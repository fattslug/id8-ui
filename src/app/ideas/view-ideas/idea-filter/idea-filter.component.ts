import { IdeaService, IdeaFilter } from './../../idea.service';
import { BusinessArea } from './../../idea';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'idea-filter',
  templateUrl: './idea-filter.component.html',
  styleUrls: ['./idea-filter.component.scss']
})
export class IdeaFilterComponent implements OnInit, OnDestroy {

  public filterForm: FormGroup;
  public businessAreaForm: FormGroup;

  @ViewChild('submittedSection') private submittedSection: ElementRef;
  @ViewChild('businesSection') private businesSection: ElementRef;
  public isSubmittedOpen = false;
  public isBusinessOpen = false;

  public dateOptions = [
    {
      label: 'Past 24 hours',
      value: '24hours'
    }, {
      label: 'Past week',
      value: 'week'
    }, {
      label: 'Past month',
      value: 'month'
    }, {
      label: 'Past year',
      value: 'year'
    }, {
      label: 'All time',
      value: 'all'
    }
  ];
  public dateLabel: string;

  public businessAreaOptions: BusinessArea[];
  private selectedBusinessAreas: string[] = [];

  // Subscriptions
  private filter$: Subscription;
  private business$: Subscription;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.submittedSection.nativeElement.contains(event.target)) {
      this.isSubmittedOpen = false;
    }
    if (!this.businesSection.nativeElement.contains(event.target)) {
      this.isBusinessOpen = false;
    }
  }

  constructor(
    public formBuilder: FormBuilder,
    public ideaService: IdeaService
  ) {
    this.businessAreaForm = this.formBuilder.group({});
    this.filterForm = this.formBuilder.group({
      dateSubmitted: ['all'],
      businessAreas: [this.businessAreaForm]
    });
    this.dateLabel = 'All time';
  }

  async ngOnInit() {
    this.businessAreaOptions = await this.ideaService.getBusinessAreas();
    this.businessAreaOptions.forEach((businessArea: BusinessArea) => {
      this.businessAreaForm.addControl(businessArea._id, this.formBuilder.control(false));
    });

    this.subscribeToFilterForm();
  }

  public toggleSubmittedOpen(): void {
    this.isSubmittedOpen = !this.isSubmittedOpen;
  }
  public toggleBusinessOpen(): void {
    this.isBusinessOpen = !this.isBusinessOpen;
  }

  private subscribeToFilterForm(): void {
    this.subscribeToBusinessFilter();
    this.filter$ = this.filterForm.valueChanges.subscribe((values) => {

      this.dateLabel = this.dateOptions.find(option => option.value === values.dateSubmitted).label;
      const filter: IdeaFilter = {
        businessAreas: this.selectedBusinessAreas,
        quickDate: values.dateSubmitted
      };

      this.ideaService.getIdeas(filter);
      this.isSubmittedOpen = false;
    });
  }

  private subscribeToBusinessFilter(): void {
    this.business$ = this.businessAreaForm.valueChanges.subscribe((values) => {
      this.selectedBusinessAreas = Object.keys(values).reduce((accumulator, currentValue) => {
        if (values[currentValue] === true) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);
      this.filterForm.updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    this.filter$.unsubscribe();
    this.business$.unsubscribe();
  }

}
