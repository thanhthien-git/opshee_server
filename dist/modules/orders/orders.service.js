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
var OrdersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
const typeorm_2 = require("typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
const message_1 = require("../../constants/message");
const stocks_service_1 = require("../stocks/stocks.service");
const util_1 = require("../../utils/util");
const order_context_service_1 = require("./context/order-context.service");
const order_status_enum_1 = require("./enums/order-status.enum");
const redis_service_1 = require("../redis/redis/redis.service");
const product_service_1 = require("../products/product.service");
let OrdersService = OrdersService_1 = class OrdersService {
    constructor(orderReposity, orderItemRepository, stockService, productService, context, redisService) {
        this.orderReposity = orderReposity;
        this.orderItemRepository = orderItemRepository;
        this.stockService = stockService;
        this.productService = productService;
        this.context = context;
        this.redisService = redisService;
        this.logger = new common_1.Logger(OrdersService_1.name);
        this.ORDER_CACHE_KEY = (key) => `order:${key}`;
    }
    async validateItem(orderItem) {
        const itemInStock = await this.stockService.getStock(orderItem.productId);
        if (itemInStock < 0 || itemInStock < orderItem.quantity) {
            throw new common_1.BadRequestException({
                message: `out of stock : ${orderItem.productName}`,
            });
        }
        return itemInStock;
    }
    async createOrderDetails(dto, userId) {
        try {
            let orderItems = [];
            let totalPrice = 0;
            const orderId = this.context.getOrderId();
            const { products } = dto;
            const ids = products.map((product) => product.productId);
            const variations = await this.productService.getProductVariation(ids);
            for (let i = 0; i < products.length; i++) {
                let inStock = await this.validateItem(products[i]);
                const { productId, productName, quantity, shopId } = products[i];
                const { tier_index, price } = variations[i].variation_details;
                let itemPrice = price * quantity;
                let item = {
                    order_item_id: util_1.Utils.generateBigInt(),
                    order_item_price: itemPrice,
                    order_item_quantity: inStock,
                    product_name: `${productName}_${tier_index}`,
                    product_id: productId,
                    shop_id: Number(shopId),
                    order_id: orderId,
                };
                orderItems.push(item);
                totalPrice += itemPrice;
            }
            const order = {
                order_id: orderId,
                order_discount: 0,
                order_price: totalPrice,
                order_status: order_status_enum_1.ORDER_STATUS.PENDING,
                user_id: userId,
                order_create_at: new Date(),
                order_update_at: new Date(),
            };
            return { order, orderItems };
        }
        catch (err) {
            throw new common_1.BadRequestException(err);
        }
    }
    async create(dto, userId) {
        try {
            const { products, expressType, userAddress, paidType } = dto;
            let orderId = util_1.Utils.generateBigInt();
            this.context.setOrderId(orderId);
            const { order, orderItems } = await this.createOrderDetails(dto, userId);
            console.log(`the order : ${order}`);
            console.log(`the order items: ${orderItems}`);
        }
        catch (err) {
            throw new common_1.BadRequestException({ message: message_1.ORDER_MESSAGE.CREATE.FAILED });
        }
    }
    async getById(orderId) {
        try {
            const cacheKey = this.ORDER_CACHE_KEY(orderId);
            const id = BigInt(orderId);
            const order = await this.redisService.checkCacheMemo(cacheKey, async () => {
                return await this.orderReposity.findOne({
                    where: { order_id: id },
                    relations: ['order_items'],
                });
            }, new order_entity_1.Order());
            return order;
        }
        catch (err) {
            this.logger.error(`Error when querying order id : ${orderId}`);
            throw new Error(err);
        }
    }
    async getOrderByUser(userId) {
        try {
            const cacheKey = this.ORDER_CACHE_KEY(`userId:${String(userId)}`);
            const orders = await this.redisService.checkCacheMemo(cacheKey, async () => {
                return await this.orderReposity.find({
                    where: { user_id: userId },
                });
            }, [new order_entity_1.Order()]);
            return orders;
        }
        catch (err) {
            this.logger.error(`Error when querying user's order history : ${userId}`);
            throw new Error(err);
        }
    }
    async getOrderByShop(shopId) {
        try {
            const cacheKey = this.ORDER_CACHE_KEY(`shopId:${String(shopId)}`);
            const orders = await this.redisService.checkCacheMemo(cacheKey, async () => {
                return await this.orderItemRepository.find({
                    where: { shop_id: Number(shopId) },
                });
            }, null);
            return orders;
        }
        catch (err) {
            this.logger.error(`Error when querying user's order history : ${shopId}`);
            throw new Error(err);
        }
    }
    async updateOrderStatus(orderId, status) {
        try {
            return this.orderReposity.update({
                order_id: BigInt(orderId),
            }, {
                order_status: status,
            });
        }
        catch (err) {
            this.logger.error(`Error while changing status of order: ${orderId}`);
            throw new Error(err);
        }
    }
    async cancelOrder(orderId) {
        try {
            return await this.orderReposity.update({
                order_id: BigInt(orderId),
            }, {
                order_status: order_status_enum_1.ORDER_STATUS.CANCEL,
            });
        }
        catch (err) {
            this.logger.error(`Error while cancel orderId: ${orderId}`);
            throw new Error(err);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = OrdersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        stocks_service_1.StocksService,
        product_service_1.ProductService,
        order_context_service_1.OrderContextService,
        redis_service_1.RedisService])
], OrdersService);
