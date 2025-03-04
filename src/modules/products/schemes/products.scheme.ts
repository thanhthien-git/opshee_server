import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductAtribute, ProductVariation } from '../types/product.type';

@Schema({ collection: 'products' }) // Chỉ định tên collection là 'products'
export class Product {

  @Prop({ required: true })
  product_name: string;

  @Prop({ type: [Number], required: true })
  product_category: number[];

  @Prop({ required: true })
  product_brand_id: number;

  @Prop({
    required: true,
  })
  product_attributes: ProductAtribute[];

  @Prop({ type: [String], required: true })
  product_images: string[];

  @Prop({
    required: true,
  })
  product_variation_list: ProductVariation[];

  @Prop({ required: true })
  product_condition: boolean;

  @Prop({ required: true })
  product_updated_at: Date;

  @Prop({ required: true })
  product_created_at: Date;

  @Prop({ required: true })
  shop_id: number;
}

export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
