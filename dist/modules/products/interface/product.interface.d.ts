import { IBase } from 'src/interface/base.interface';
import { ProductAtribute, VariationList } from '../types/product.type';
export interface IProduct extends IBase {
    productName: string;
    productCategory: number[];
    productBrandId: number;
    productAttributes: ProductAtribute[];
    productImages: string[];
    producVariationList: VariationList;
    productCreateAt?: Date;
    productUpdateAt?: Date;
    shopId: number;
}
