export interface IProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
}

export enum StateType {
  add = 1,
  edit = 2,
  delete
}