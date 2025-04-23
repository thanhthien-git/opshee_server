"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ProductService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const products_scheme_1 = require("./schemes/products.scheme");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const product_variation_scheme_1 = require("./schemes/product-variation.scheme");
const mongodb_1 = require("mongodb");
const redis_service_1 = require("../redis/redis/redis.service");
let ProductService = ProductService_1 = class ProductService {
    constructor(productModel, productItem, cloudinaryService, redisService) {
        this.productModel = productModel;
        this.productItem = productItem;
        this.cloudinaryService = cloudinaryService;
        this.redisService = redisService;
        this.logger = new common_1.Logger(ProductService_1.name);
    }
    async getProductById(id) {
        try {
            const cacheKey = `product:${id}`;
            const product = await this.redisService.checkCacheMemo(cacheKey, async () => {
                return await this.productModel.findById(new mongodb_1.ObjectId(id));
            }, null);
            return product;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    stringToObjects(ids) {
        return ids.map((id) => new mongodb_1.ObjectId(id));
    }
    async getProductVariation(ids) {
        try {
            const objIds = this.stringToObjects(ids);
            const variations = await this.productItem.find({
                _id: { $in: objIds },
                isDeleted: false,
            });
            void Promise.all(variations.map((variation) => this.redisService
                .set(`product:variation:${variation._id}`, variation)
                .catch((err) => console.error('Cache error:', err))));
            return variations;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async create(createProductDto, shopId) {
        const { productVariationList, productAttributes, productBrandId, productCategory, productName, variation, productImages, } = createProductDto;
        try {
            const productId = new mongoose_2.default.Types.ObjectId();
            const variations = variation.map((item) => {
                if (!item.tier_index || Number.isFinite(item.stock)) {
                    throw new common_1.BadRequestException('Invalid variation data');
                }
                return {
                    _id: new mongoose_2.default.Types.ObjectId(),
                    product_id: productId,
                    variation_details: item,
                };
            });
            const productItemRequest = await this.productItem.insertMany(variations);
            let imageUrls = [];
            if (productImages.length === 1) {
                imageUrls[0] = await this.cloudinaryService.uploadFile(productImages[0]);
            }
            else {
                imageUrls = await this.cloudinaryService.uploadFiles(productImages);
            }
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
                    product_highest_price: highest,
                    product_lowest_price: lowest,
                    shop_id: shopId,
                });
                return {
                    product: product,
                    variation: productItemRequest,
                };
            }
            else
                throw new common_1.BadRequestException({
                    message: 'Vui lòng nhập ít nhất 1 phân loại hàng',
                });
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException({
                message: 'Failed to create product',
            });
        }
    }
    async update(updateDto) {
        const { productId, modelList, productImage, productAttributes, productBrandId, productCategory, productVariationList, productName, } = updateDto;
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
            updateOperations.push(this.productItem.findOneAndUpdate({ product_id: productId }, { $set: { model_list: modelList } }, { new: true, upsert: true }));
        }
        const [updatedProduct, updatedProductItem] = await Promise.all(updateOperations);
        return { updatedProduct, updatedProductItem };
    }
    async delete(productId, shopId) {
        try {
            const result = await this.productModel.aggregate([
                {
                    $match: {
                        _id: new mongoose_2.Types.ObjectId(productId),
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
                throw new common_1.UnauthorizedException({ message: 'Bạn không có quyền này' });
            }
            const [variationsResult, deleteResult] = await Promise.all([
                this.removeVariations(productId),
                this.productModel.deleteOne({ _id: productId }),
            ]);
            return {
                variationsRemoved: variationsResult !== null,
                productDeleted: deleteResult.deletedCount,
            };
        }
        catch (err) {
            console.error('Delete product error:', err);
            throw new common_1.BadRequestException({ message: 'Delete product fail' });
        }
    }
    async removeVariations(productId) {
        return await this.productItem.findOneAndDelete({
            product_id: productId,
        });
    }
    getProductPriceRange(variations) {
        if (!variations.length)
            return null;
        const prices = variations.map((v) => v.price);
        return {
            lowest: Math.min(...prices),
            highest: Math.max(...prices),
        };
    }
    async search(filter) {
        const { productBrand, productName, productHighestPrice, productLowestPrice, page = 1, pageSize = 10, } = filter;
        const option = [];
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
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = ProductService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_scheme_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_variation_scheme_1.ProductModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService,
        redis_service_1.RedisService])
], ProductService);
