import { ProductAtribute, ProductVariation } from '../types/product.type';
export declare class CreateProductDto {
    productName: string;
    productCategory: number[];
    productBrandId: number;
    productAttributes: ProductAtribute[];
    productImages: Express.Multer.File[];
    producVariationList: ProductVariation[];
}
