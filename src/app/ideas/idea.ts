import { User } from './../authentication/authentication.service';

export class Idea {
  public _id?: string;
  public title: string;
  public businessAreas: BusinessArea[];
  public description: string;
  public icon: string;
  public color: string;
  public dateSubmitted?: Date;
  public dateEdited?: Date;
  public author?: User;
}

export class BusinessArea {
  public _id?: string;
  public name: string;
}
