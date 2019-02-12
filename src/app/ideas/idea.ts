export class Idea {
  public _id?: string;
  public title: string;
  public businessAreas: BusinessArea[];
  public problemDescription: string;
  public solutionDescription: string;
  public dateSubmitted?: Date;
  public dateEdited?: Date;
}

export class BusinessArea {
  public _id?: string;
  public name: string;
}
