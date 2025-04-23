import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ collection: 'productmodels' })
export class ProductModel {
  @Prop({ type: Types.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  product_id: Types.ObjectId;

  @Prop({ type: Object })
  variation_details: ModelItem;
}

export type ModelItem = {
  tier_index: number[];
  isDefault: boolean;
  price: number;
  stock: number;
  image?: string;
};

export type ProductModelDocument = HydratedDocument<ProductModel>;
export const ProductModelSchema = SchemaFactory.createForClass(ProductModel);
