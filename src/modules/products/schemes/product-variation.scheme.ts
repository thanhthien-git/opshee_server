import { ObjectId } from 'mongoose';

export class ProductModelScheme {
  _id: ObjectId;
  productId: ObjectId;
  modelList: ModelItem[];
}

type ModelItem = {
  tierIndex: [number, number];
  isDefault: boolean;
  price: number;
  stock: number;
  image: string;
};
