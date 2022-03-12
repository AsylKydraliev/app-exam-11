export class Category {
  constructor(
    public _id: string,
    public title: string,
  ) {
  }
}

export interface CategoryApi{
  _id: string,
  title: string
}
