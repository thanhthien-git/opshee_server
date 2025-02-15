import { IBase } from "./base.interface";
export interface IProduct extends IBase {
    product_name: string;
    product_category: number[];
    product_brand_id: number;
    product_attributes: {
        name: string[];
        value: string[];
    };
    product_images: string[];
    product_variation_list: {
        custom_value: string;
        value_list: {
            custom_value: string;
        }[];
    }[];
    product_condition: boolean;
    product_updated_at: Date;
    product_created_at: Date;
    shop_id: number;
}
