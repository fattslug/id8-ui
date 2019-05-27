import { Component, Input, HostBinding, forwardRef, Output, EventEmitter, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'iconpicker',
  templateUrl: './iconpicker.component.html',
  styleUrls: ['./iconpicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IconpickerComponent),
      multi: true
    }
  ],
  animations: [
    trigger('swipeFromLeft', [
      transition(':enter', [
        style({
          transform: 'translateX(-100px)',
          opacity: 0
        }),
        animate('100ms 100ms', style({
          transform: 'translateX(0px)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1
        }),
        animate(200, style({
          transform: 'translateX(-100px)',
          opacity: 0
        }))
      ])
    ]),
    trigger('swipeFromRight', [
      transition(':enter', [
        style({
          transform: 'translateX(100px)',
          opacity: 0
        }),
        animate('100ms 100ms', style({
          transform: 'translateX(0px)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1
        }),
        animate(200, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class IconpickerComponent implements OnInit, ControlValueAccessor {

  @Input()
  disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  @Output() setDefault = new EventEmitter();

  get value(): IdeaIcon {
    return this.icon;
  }

  public screen = 'icons';

  // Icon props
  // public iconRoot = '../../id8/assets/images/icons/functional/';
  public iconRoot = '/assets/images/icons/functional/';
  public icons = {
    bot: 'bot',
    calculator: 'calculator',
    camera: 'camera',
    cogForward: 'cog_forward',
    complexity: 'complexity',
    diagram: 'diagram',
    fastforward: 'fastforward',
    heart: 'heart',
    idea: 'idea',
    laptop: 'laptop',
    location: 'location',
    loop: 'loop',
    multitask: 'multitask',
    networksChecked: 'networks_checked',
    networksCustomer: 'networks_customer',
    networks: 'networks',
    phone: 'phone',
    repair: 'repair',
    scale: 'scale',
    test: 'test',
    warning: 'warning'
  };
  public iconArray = Object.keys(this.icons).map(e => this.icons[e]);

  // Color props
  public colors = {
    darkGrey: '#413E45',
    lightBlue: '#1A61BD',
    green: '#4F9F31',
    darkGreen: '#0E573F',
    red: '#BD2624',
    orange: '#FFA000',
    purple: '#87378E',
    darkPurple: '#421B67',
    pink: '#C01B83',
    teal: '#009AB1',
  };
  public colorArray = Object.keys(this.colors).map(e => this.colors[e]);

  public icon: IdeaIcon = {
    icon: this.iconArray[this.randomNum(this.iconArray.length - 1)],
    color: this.colorArray[this.randomNum(this.colorArray.length - 1)]
  };

  public onChange = (ideaIcon: IdeaIcon) => {};
  public onTouched = () => {};

  ngOnInit() {
    this.setDefault.emit(this.icon);
  }

  constructor() {
  }

  public updateIcon() {
    this.writeValue(this.icon);
  }

  public writeValue(ideaIcon: IdeaIcon) {
    this.icon.icon = ideaIcon.icon || this.icon.icon;
    this.icon.color = ideaIcon.color || this.icon.color;
    this.onChange(this.value);
  }

  public registerOnChange(fn: (selected: IdeaIcon) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private randomNum(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}

export interface IdeaIcon {
  color: string;
  icon: string;
}
