import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { RolesGuard } from '../../guards/role/role.guard';
import { ROLE } from '../../enum/role.enum';
import { Roles } from '../../decorators/role.decorators';
import {
  CreateProductDto,
  ProductAttributeDto,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductOwnerShipGuard } from './guard/product_owner.guard';
import { ProductService } from './product.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly storageService: CloudinaryService,
  ) {}

  @ApiQuery({
    name: 'id',
    required: true,
    description: 'The ID of the product',
  })
  @Get()
  async getProductById(@Query('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Get()
  async getDailyDiscover(@Req() req) {
    return await req;
  }

  @UseGuards(RolesGuard)
  @Roles(ROLE.SHOP)
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('data') data: string,
    @Req() req,
  ) {
    let parsedData: ProductAttributeDto = JSON.parse(data);

    const requestData: CreateProductDto = {
      productImages: files,
      ...parsedData,
    };

    const userId = req.user.userId;
    return await this.productService.create(requestData, userId);
  }

  @UseGuards(RolesGuard)
  @UseGuards(ProductOwnerShipGuard)
  @Roles(ROLE.SHOP)
  @Patch('update')
  @UseInterceptors(FilesInterceptor('files'))
  async update(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('data') data: string,
  ) {
    let parsedData: ProductAttributeDto = JSON.parse(data);

    let requestData: UpdateProductDto = {
      modelList: parsedData.variation,
      productId: parsedData.productId,
      productImage: files,
      ...parsedData,
    };

    return await this.productService.update(requestData);
  }

  @UseGuards(RolesGuard)
  @UseGuards(ProductOwnerShipGuard)
  @Roles(ROLE.SHOP)
  @Delete('delete')
  async delete(@Body('productId') productId: string, @Req() req) {
    const shopId = req.user.userId;
    return await this.productService.delete(productId, shopId);
  }
}
