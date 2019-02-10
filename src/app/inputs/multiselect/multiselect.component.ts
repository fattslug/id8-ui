import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  @Input()
  options: DropdownOptions[];

  @Input()
  set label(label: string) {
    this.originalLabel = label;
    this._label = label;
  }
  public _label: string;
  private originalLabel: string;

  @Output()
  selected: EventEmitter<DropdownOptions[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public updateSelections() {
    this._label = '<b>';
    const selected = [];

    this.options.forEach((business) => {
      if (business.selected) {
        selected.push(business);
        if (this._label === '<b>') {
          this._label += business.name;
        } else {
          this._label += ', ' + business.name;
        }
      }
    });

    if (this._label === '<b>') {
      this._label = this.originalLabel;
    } else {
      this._label += '</b>';
    }

    this.selected.emit(selected);
  }

}

interface DropdownOptions {
  id: number;
  name: string;
  selected: boolean;
}
