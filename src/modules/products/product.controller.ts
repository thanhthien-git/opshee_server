import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RedisProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { RolesGuard } from 'src/guards/role/role.guard';
import { ROLE } from 'src/enum/role.enum';
import { Roles } from 'src/decorators/role.decorators';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly redisProductService: RedisProductService,
    private readonly storageService: CloudinaryService,
  ) {}

  @Get()
  async getProductById(@Query('id') id: string) {
    return await this.redisProductService.getProductById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(ROLE.SHOP)
  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async create(@Body() data: CreateProductDto, @Req() req) {
    const userId = req.user.userId;
    return await this.redisProductService.create(data, userId);
  }
}
