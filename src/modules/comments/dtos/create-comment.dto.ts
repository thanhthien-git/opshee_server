import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PostCommentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  point: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  @Transform(({ value }) => new Types.ObjectId(value), { toClassOnly: true })
  productId: Types.ObjectId;
}
