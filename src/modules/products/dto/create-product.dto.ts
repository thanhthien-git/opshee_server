import { VariationDetail } from '../schemes/product-variation.scheme';
import { ProductAtribute, ProductVariation } from '../types/product.type';

export class ProductAttributeDto {
  productId?: string;
  productName: string;
  productCategory: number[];
  productBrandId: number;
  productAttributes: ProductAtribute[];
  productVariationList: ProductVariation[];
  variation: VariationDetail[];
}

export class CreateProductDto extends ProductAttributeDto {
  productImages: Express.Multer.File[];
}
