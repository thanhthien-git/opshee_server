import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Product,
  ProductDocument,
} from 'src/modules/products/schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import {
  ProductModel,
  ProductModelDocument,
} from './schemes/product-variation.scheme';
import { UpdateProductDto } from './dto/update-product.dto';
import { url } from 'inspector';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductModel.name)
    private productItem: Model<ProductModelDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async getProductById(id: string): Promise<void> {
    return await this.productModel.findById(id);
  }

  async create(createProductDto: CreateProductDto, shopId: string) {
    const {
      productVariationList,
      productAttributes,
      productBrandId,
      productCategory,
      productName,
      variation,
      productImages,
    } = createProductDto;

    try {
      //STEP 1: create product first
      //---upload image--- : upload to storage -> assign to productImage using a string[]
      let imageUrls: Array<string> = [];
      if (productImages.length === 1) {
        imageUrls[0] = await this.cloudinaryService.uploadFile(
          productImages[0],
        );
      } else {
        imageUrls = await this.cloudinaryService.uploadFiles(productImages);
      } // WORK
      if (variation.length !== 0) {
        const product = await this.productModel.create({
          product_name: productName,
          product_category: productCategory,
          product_brand_id: productBrandId,
          product_images: imageUrls,
          product_attributes: productAttributes,
          product_variation_list: productVariationList,
          product_created_at: new Date(),
          product_updated_at: new Date(),
          product_condition: true,
          shop_id: shopId,
        }); // WORK

        //STEP 2: CREATE VARIATION
        const productModelData = {
          product_id: product._id,
          model_list: variation,
        };

        //---define product data include its id---
        const productItemRequest =
          await this.productItem.create(productModelData);
        //STEP 3: return the respone
        return {
          product: product,
          variation: productItemRequest,
        };
      } else
        throw new BadRequestException({
          message: 'Vui lòng nhập ít nhất 1 phân loại hàng',
        });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException({
        message: 'Failed to create product',
      });
    }
  }

  async updateProduct(updateDto: UpdateProductDto) {
    const {
      productId,
      modelList,
      productImage,
      productAttributes,
      productBrandId,
      productCategory,
      productVariationList,
      productName,
    } = updateDto;

    let product = await this.productModel.findById(productId);
    let imageUrls: string[] = [];
    if (productImage) {
      imageUrls = await this.cloudinaryService.uploadFiles(productImage);
      imageUrls = [...imageUrls, ...product.product_images];
    }

    Object.assign(product, {
      product_attributes: productAttributes,
      product_brand_id: productBrandId,
      product_category: productCategory,
      product_name: productName,
      product_updated_at: new Date(),
      product_created_at: new Date(),
      product_variation_list: productVariationList,
    });
    const updateOperations = [product.save()];

    if (Array.isArray(modelList) && modelList.length > 0) {
      updateOperations.push(
        this.productItem.findOneAndUpdate(
          { product_id: productId },
          { $set: { model_list: modelList } },
          { new: true, upsert: true },
        ),
      );
    }

    const [updatedProduct, updatedProductItem] =
      await Promise.all(updateOperations);

    return { updatedProduct, updatedProductItem };
  }
}
