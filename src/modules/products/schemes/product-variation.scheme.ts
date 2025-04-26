import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ collection: 'productvariations' })
export class ProductVariation {
  @Prop({ type: Types.ObjectId })
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  product_id?: Types.ObjectId;

  @Prop({ type: Object })
  variation_details: VariationDetail;
}

export type VariationDetail = {
  tier_index: number[];
  isDefault: boolean;
  price: number;
  stock: number;
  image?: string;
};

export type ProductVariationDocument = HydratedDocument<ProductVariation>;
export const ProductVariationSchema =
  SchemaFactory.createForClass(ProductVariation);
