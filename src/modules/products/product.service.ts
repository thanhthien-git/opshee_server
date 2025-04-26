import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemes/products.scheme';
import { CreateProductDto } from './dto/create-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import {
  VariationDetail,
  ProductVariation,
  ProductVariationDocument,
} from './schemes/product-variation.scheme';
import { UpdateProductDto } from './dto/update-product.dto';
import { FitlerDto } from './dto/filter-product.dto';
import { PaginatedResponse } from '../../interface/paginated-response';
import { ObjectId } from 'mongodb';
import { RedisService } from '../redis/redis/redis.service';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductVariation.name)
    private productVariation: Model<ProductVariationDocument>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly redisService: RedisService,
  ) {}

  async getProductById(id: string) {
    try {
      const cacheKey = `product:${id}`;
      const product = await this.redisService.checkCacheMemo(
        cacheKey,
        async () => {
          return await this.productModel.findById(new ObjectId(id));
        },
        null,
      );
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  private stringToObjects(ids: string[]) {
    return ids.map((id) => new ObjectId(id));
  }

  async getProductVariation(ids: string[]) {
    try {
      const objIds = this.stringToObjects(ids);
      const variations = await this.productVariation.find({
        _id: { $in: objIds },
      });

      //avoid blocking
      void Promise.all(
        variations.map((variation) =>
          this.redisService
            .set(`product:variation:${variation._id}`, variation).then(() => {console.log(`set to the redis value ${variation._id}`);
            })
            .catch((err) => console.error('Cache error:', err)),
        ),
      );

      return variations;
    } catch (err) {
      throw new Error(err);
    }
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
      const productId = new mongoose.Types.ObjectId();
      //STEP 1: CREATE VARIATION
      const variations: ProductVariation[] = variation.map((item) => {
        return {
          _id: new mongoose.Types.ObjectId(),
          product_id: productId,
          variation_details: item,
        };
      });
      //---define product data include its id---
      const productVariationRequest =
        await this.productVariation.insertMany(variations);

      //STEP 2: create product first
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
        const { highest, lowest } = this.getProductPriceRange(variation);
        const product = await this.productModel.create({
          _id: productId,
          product_name: productName,
          product_category: productCategory,
          product_brand_id: productBrandId,
          product_images: imageUrls,
          product_attributes: productAttributes,
          product_variation_list: productVariationList,
          product_created_at: new Date(),
          product_updated_at: new Date(),
          product_condition: true,
          product_highest_price: Number(highest),
          product_lowest_price: Number(lowest),
          shop_id: shopId,
        }); // WORK

        //STEP 3: return the respone
        return {
          product: product,
          variation: productVariationRequest,
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

  async update(updateDto: UpdateProductDto) {
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

    if (Array.isArray(productImage))
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
        this.productVariation.findOneAndUpdate(
          { product_id: productId },
          { $set: { model_list: modelList } },
          { new: true, upsert: true },
        ),
      );
    }

    const [updatedProduct, updatedproductVariation] =
      await Promise.all(updateOperations);

    return { updatedProduct, updatedproductVariation };
  }

  async delete(
    productId: string,
    shopId: string,
  ): Promise<{ variationsRemoved: boolean; productDeleted: number }> {
    try {
      const result: { isAuthorized?: boolean }[] =
        await this.productModel.aggregate([
          {
            $match: {
              _id: new Types.ObjectId(productId),
            },
          },
          {
            $project: {
              isAuthorized: {
                $eq: ['$shop_id', shopId],
              },
            },
          },
        ]);

      if (!result[0]?.isAuthorized) {
        throw new UnauthorizedException({ message: 'Bạn không có quyền này' });
      }

      const [variationsResult, deleteResult] = await Promise.all([
        this.removeVariations(productId),
        this.productModel.deleteOne({ _id: productId }),
      ]);

      return {
        variationsRemoved: variationsResult !== null,
        productDeleted: deleteResult.deletedCount,
      };
    } catch (err) {
      console.error('Delete product error:', err);
      throw new BadRequestException({ message: 'Delete product fail' });
    }
  }

  async removeVariations(productId: string): Promise<Document> {
    return await this.productVariation.findOneAndDelete({
      product_id: productId,
    });
  }

  private getProductPriceRange(variations: VariationDetail[]) {
    if (!variations.length) return null;

    const prices = variations.map((v) => Number(v.price));
    return {
      lowest: Math.min(...prices),
      highest: Math.max(...prices),
    };
  }

  async search(filter: FitlerDto): Promise<PaginatedResponse<Product>> {
    const {
      productBrand,
      productName,
      productHighestPrice,
      productLowestPrice,
      page = 1,
      pageSize = 10,
    } = filter;

    const option = [];

    //add aggregation
    if (productName) {
      option.push({
        product_name: { $regex: productName, $options: 'i' },
      });
    }
    if (productBrand) {
      option.push({
        product_brand_id: {
          $match: productBrand,
        },
      });
    }
    if (productLowestPrice && productHighestPrice) {
      option.push({
        product_lowest_price: {
          $gte: productLowestPrice,
          $lte: productHighestPrice,
        },
        productHighestPrice: {
          $lte: productHighestPrice,
        },
      });
    }

    //pagination pipeline
    option.push({ $skip: (page - 1) * pageSize }, { $limit: pageSize });
    const totalPromise = this.productModel.countDocuments();
    const dataPromise = this.productModel.aggregate(option);
    const [total, products] = await Promise.all([totalPromise, dataPromise]);

    return {
      data: products,
      pagination: {
        page,
        pageSize,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
        hasNextPage: page * pageSize < total,
        hasPreviousPage: page > 1,
      },
    };
  }
}
