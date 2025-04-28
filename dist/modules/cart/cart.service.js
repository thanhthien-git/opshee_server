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
var CartService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cart_entity_1 = require("./entities/cart.entity");
const typeorm_2 = require("typeorm");
const util_1 = require("../../utils/util");
const redis_service_1 = require("../redis/redis/redis.service");
const cart_item_entity_1 = require("./entities/cart-item.entity");
let CartService = CartService_1 = class CartService {
    constructor(cartRepository, cartItemRepitory, redisService) {
        this.cartRepository = cartRepository;
        this.cartItemRepitory = cartItemRepitory;
        this.redisService = redisService;
        this.logger = new common_1.Logger(CartService_1.name);
        this.CART_CACHE_KEY = (key) => `cartId:${key}`;
    }
    async createCart(userId) {
        try {
            const id = util_1.Utils.generateBigInt();
            return await this.cartRepository.insert({
                id: id,
                user_id: userId,
                update_at: new Date(),
            });
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.BadRequestException(err);
        }
    }
    async getCart(userId, cartId) {
        try {
            let key = userId ? userId : cartId;
            let query = userId ? { user_id: userId } : { id: cartId };
            const cacheKey = this.CART_CACHE_KEY(String(key));
            return this.redisService.checkCacheMemo(cacheKey, async () => {
                return await this.cartRepository.findOne({
                    where: query,
                    relations: ['cart_item'],
                });
            });
        }
        catch (err) {
            this.logger.debug(err);
            throw new common_1.BadRequestException(err);
        }
    }
    isExistInCart(cartItems, checkItem) {
        const item = cartItems.find((item) => item.product_variation_id === checkItem);
        return item;
    }
    async updateCartQuantity(cartId, quantity) {
        return await this.cartRepository.update({ id: cartId }, {
            item_count: quantity,
        });
    }
    async addToCart(dto, userId) {
        try {
            const { productId, productVaritionId, quantity } = dto;
            let currentCart = await this.getCart(userId);
            let { id, item_count } = currentCart;
            item_count += quantity;
            let cartItem = this.isExistInCart(currentCart.cart_items, String(productVaritionId));
            if (cartItem) {
                cartItem.quantity += quantity;
                await Promise.all([
                    this.updateCartItem(cartItem),
                    this.updateCartQuantity(id, item_count),
                ]);
                return common_1.HttpStatus.ACCEPTED;
            }
            cartItem = {
                cart_id: id,
                product_id: productId,
                product_variation_id: productVaritionId,
                quantity: quantity,
                item_create_at: new Date(),
                item_update_at: new Date(),
                id: util_1.Utils.generateBigInt(),
            };
            await Promise.all([
                this.addCartItem(cartItem),
                this.updateCartQuantity(id, item_count),
            ]);
            return common_1.HttpStatus.ACCEPTED;
        }
        catch (err) {
            this.logger.error(`error when add to cart : ${err}`);
            throw new common_1.BadRequestException(err);
        }
    }
    async removeCartItem(ids, cartId) {
        try {
            let cart = await this.getCart(null, cartId);
            for (const item of cart.cart_items) {
                if (ids.includes(item.cart_id)) {
                    cart.item_count -= item.quantity;
                }
            }
            await Promise.all([
                this.cartItemRepitory.delete({
                    id: (0, typeorm_2.In)(ids),
                }),
                this.updateCartQuantity(cartId, cart.item_count),
            ]);
            return common_1.HttpStatus.ACCEPTED;
        }
        catch (err) {
            this.logger.error(`Error while remove product from cart`);
            throw new common_1.BadRequestException(err);
        }
    }
    async addCartItem(item) {
        try {
            return await this.cartItemRepitory.insert(item);
        }
        catch (err) {
            this.logger.error(`error while add cart item : ${err}`);
            throw new common_1.BadRequestException(err);
        }
    }
    async updateCartItem(cartItem) {
        return await this.cartItemRepitory.update({ id: cartItem.id }, { quantity: cartItem.quantity });
    }
    async getCartItem(cartItemId) {
        return await this.cartItemRepitory.findOne({
            where: { id: cartItemId },
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = CartService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        redis_service_1.RedisService])
], CartService);
