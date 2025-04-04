import { Type } from 'class-transformer';
import { IsOptional, ValidateIf, validateOrReject } from 'class-validator';

export class FitlerDto {
  @Type(() => Number)
  page: number;

  @Type(() => Number)
  pageSize: number;

  productName?: string;
  productBrand?: string;

  @Type(() => Number)
  productLowestPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @ValidateIf((o) => o.productHighestPrice > o.productLowestPrice, {
    message: 'productHighestPrice must be greater than productLowestPrice',
  })
  productHighestPrice?: number;
  async validate() {
    await validateOrReject(this);
  }
}
