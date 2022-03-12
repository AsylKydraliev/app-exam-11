export class Product {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public description: string,
    public image: string,
    public category: string,
    public user: {
      _id: string,
      name: string,
    }
  ) {}
}

export interface ProductData {
  [key: string]: any;
  title: string;
  price: number;
  description: string;
  image: File | null;
  category: string
  user: string
  token: string
}

export interface ApiProductData {
  _id: string,
  title: string,
  price: number,
  description: string,
  image: string,
  category: string,
  user: {
    _id: string,
    name: string,
  }
}
