import { VariationDetail } from '../schemes/product-variation.scheme';
import { ProductAtribute, ProductVariation } from '../types/product.type';

export class UpdateProductDto {
  productId?: string;
  productName?: string;
  productCategory?: number[];
  productBrandId?: number;
  productAttributes?: ProductAtribute[];
  productVariationList?: ProductVariation[];
  productImage?: Express.Multer.File[];
  modelList?: VariationDetail[];
}
