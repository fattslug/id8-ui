import { Component, OnInit, Input, Output, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ]
})
export class MultiselectComponent implements OnInit, ControlValueAccessor {

  public selected: DropdownOption[] = [];

  @Input()
  disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  @Input()
  set options(options: DropdownOption[]) {
    if (this.selected && this.selected.length) {
      this._options = options.map((option: DropdownOption) => {
        option.selected = this.selected.filter((selection) => selection._id === option._id).length ? true : false;
        return option;
      });
      this.updateSelected();
    } else {
      this._options = options;
    }
  }
  public _options: DropdownOption[];

  @Input()
  set label(label: string) {
    this.originalLabel = label;
    this._label = label;
  }
  public _label: string;
  private originalLabel: string;

  get value(): DropdownOption[] {
    return this.selected;
  }

  public onChange = (selections: DropdownOption[]) => {};
  public onTouched = () => {};


  constructor() { }

  ngOnInit() {
  }

  public updateSelected() {
    if (!this.disabled) {
      this._label = '<b>';
      const selected: DropdownOption[] = [];

      this._options.forEach((business) => {
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

      this.writeValue(selected);
    }
  }

  public writeValue(selected: DropdownOption[]) {
    this.selected = selected;
    this.onChange(this.value);
  }

  public registerOnChange(fn: (selected: DropdownOption[]) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

export interface DropdownOption {
  _id: string;
  name: string;
  selected: boolean;
}
