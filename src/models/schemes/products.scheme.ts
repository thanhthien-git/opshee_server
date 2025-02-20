import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IBase } from 'src/interface/base.interface';

@Schema({ collection: 'products' }) // Chỉ định tên collection là 'products'
export class Product {
  @Prop({ required: true })
  product_name: string;

  @Prop({ type: [Number], required: true })
  product_category: number[];

  @Prop({ required: true })
  product_brand_id: number;

  @Prop({
    type: {
      name: { type: [String], required: true },
      value: { type: [String], required: true },
    },
    required: true,
  })
  product_attributes: {
    name: string[];
    value: string[];
  };

  @Prop({ type: [String], required: true })
  product_images: string[];

  @Prop({
    type: [
      {
        custom_value: { type: String, required: true },
        value_list: [{ custom_value: { type: String, required: true } }],
      },
    ],
    required: true,
  })
  product_variation_list: {
    custom_value: string;
    value_list: { custom_value: string }[];
  }[];

  @Prop({ required: true })
  product_condition: boolean;

  @Prop({ required: true })
  product_updated_at: Date;

  @Prop({ required: true })
  product_created_at: Date;

  @Prop({ required: true })
  shop_id: number;
}

export interface IProduct extends IBase {
  product_name: string;
  product_category: number[];
  product_brand_id: number;
  product_attributes: { name: string[]; value: string[] };
  product_images: string[];
  product_variation_list: {
    custom_value: string;
    value_list: { custom_value: string }[];
  }[];
  product_condition: boolean;
  product_updated_at: Date;
  product_created_at: Date;
  shop_id: number;
}
export type ProductDocument = HydratedDocument<Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);
