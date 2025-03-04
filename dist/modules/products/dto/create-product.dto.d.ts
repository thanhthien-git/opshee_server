import { ModelItem } from '../schemes/product-variation.scheme';
import { ProductAtribute, ProductVariation } from '../types/product.type';
export declare class ProductAttributeDto {
    productId?: string;
    productName: string;
    productCategory: number[];
    productBrandId: number;
    productAttributes: ProductAtribute[];
    productVariationList: ProductVariation[];
    variation: ModelItem[];
}
export declare class CreateProductDto extends ProductAttributeDto {
    productImages: Express.Multer.File[];
}
