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
const product_repository_1 = require("../products/product.repository");
const order_context_service_1 = require("./context/order-context.service");
const order_status_enum_1 = require("./enums/order-status.enum");
let OrdersService = class OrdersService {
    constructor(orderReposity, orderItemRepository, stockService, productService, context) {
        this.orderReposity = orderReposity;
        this.orderItemRepository = orderItemRepository;
        this.stockService = stockService;
        this.productService = productService;
        this.context = context;
    }
    async validateItem(orderItem) {
        const itemInStock = await this.stockService.getStock(orderItem.productId);
        const itemPrice = await this.productService.getVaritionPrice(orderItem.productId);
        if (itemInStock < 0 || itemInStock < orderItem.quantity) {
            throw new common_1.BadRequestException({
                message: `out of stock : ${orderItem.productName}`,
            });
        }
        const item = {
            order_item_id: util_1.Utils.generateBigInt(),
            order_id: this.context.getOrderId(),
            order_item_price: itemPrice,
            order_item_quantity: orderItem.quantity,
            product_id: orderItem.productId,
            product_name: orderItem.productName,
        };
        const price = item.order_item_quantity * item.order_item_price;
        return { item, price };
    }
    async createOrderItem(dto) {
        try {
            let orderItems = [];
            let orderPrice = 0;
            const { products } = dto;
            for (const product of products) {
                const { item, price } = await this.validateItem(product);
                orderItems.push(item);
                orderPrice += price;
            }
            return { orderItems, orderPrice };
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
            const { orderPrice, orderItems } = await this.createOrderItem(dto);
            console.log(`the orderItems : ${orderItems}`);
            console.log(`the order price: ${orderPrice}`);
            const order = {
                order_id: orderId,
                order_discount: 0,
                order_price: orderPrice,
                order_status: order_status_enum_1.ORDER_STATUS.PENDING,
                user_id: userId,
                order_create_at: new Date(),
                order_update_at: new Date(),
            };
            console.log(`the total order is :${order}`);
        }
        catch (err) {
            throw new common_1.BadRequestException({ message: message_1.ORDER_MESSAGE.CREATE.FAILED });
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItemEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        stocks_service_1.StocksService,
        product_repository_1.ProductRepository,
        order_context_service_1.OrderContextService])
], OrdersService);
