export declare class FitlerDto {
    productName?: string;
    productBrand?: string;
    productLowestPrice?: number;
    productHighestPrice?: number;
    validate(): Promise<void>;
}
