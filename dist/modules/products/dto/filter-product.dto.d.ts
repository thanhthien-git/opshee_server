export declare class FitlerDto {
    page: number;
    pageSize: number;
    productName?: string;
    productBrand?: string;
    productLowestPrice?: number;
    productHighestPrice?: number;
    validate(): Promise<void>;
}
