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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const shop_entity_1 = require("../../../models/entities/shop.entity");
const typeorm_1 = require("typeorm");
const message_1 = require("../../../constants/message");
const brcypt_service_1 = require("../../../modules/bcrypt/brcypt.service");
const role_1 = require("../../../constants/role");
const typeorm_2 = require("@nestjs/typeorm");
const token_service_1 = require("../../../modules/token/token.service");
const shop_type_enum_1 = require("../../../enum/shop-type.enum");
let ShopService = class ShopService {
    constructor(shopRepository, tokenService) {
        this.shopRepository = shopRepository;
        this.tokenService = tokenService;
    }
    async findByPhone(phone) {
        return await this.shopRepository.findOne({
            where: {
                is_Deleted: false,
                shop_phone: phone,
            },
        });
    }
    async register(data) {
        const { shop_name, shop_password, shop_phone, shop_email } = data;
        const hashedPassword = await brcypt_service_1.BcryptService.encryptString(shop_password);
        const current = {
            shop_name: shop_name,
            shop_email: shop_email,
            shop_password: hashedPassword,
            shop_type: shop_type_enum_1.SHOP_TYPE.NONE,
            is_Deleted: false,
            is_favourite: false,
            shop_phone: shop_phone,
            shop_create_at: new Date(),
            shop_update_at: new Date(),
        };
        try {
            const request = this.shopRepository.create(current);
            await this.shopRepository.save(request);
            return true;
        }
        catch (err) {
            if (err instanceof typeorm_1.QueryFailedError && err.driverError.code === '23505') {
                throw new common_1.ConflictException(message_1.ERROR_AUTH.EXISTED('Tài khoản'));
            }
            throw err;
        }
    }
    async login(data) {
        const { shop_phone, shop_password } = data;
        const shop = await this.shopRepository.findOne({
            where: { shop_phone: shop_phone },
            select: ['shop_id', 'shop_password', 'shop_name'],
        });
        if (!shop) {
            throw new common_1.BadRequestException({ message: message_1.ERROR_MESSAGE.USER_NOT_FOUND });
        }
        const isMatch = await brcypt_service_1.BcryptService.comparePassword(shop_password, shop.shop_password);
        if (!isMatch) {
            throw new common_1.BadRequestException({ message: message_1.ERROR_MESSAGE.WRONG_PASSWORD });
        }
        const payload = {
            userId: shop.shop_id,
            userEmail: shop.shop_name,
            role: role_1.ROLE.SHOP,
        };
        return this.tokenService.generateToken(payload);
    }
    async getShopByName(name, page = 1, pageSize = 10) {
        try {
            const [shops, totalItem] = await this.shopRepository.findAndCount({
                where: {
                    is_Deleted: false,
                    shop_name: (0, typeorm_1.Like)(`%${name}`),
                },
                skip: page * pageSize - 1,
                take: pageSize,
            });
            return {
                data: shops,
                pagination: {
                    page: page,
                    pageSize: pageSize,
                    hasNextPage: totalItem > page * pageSize,
                    hasPreviousPage: page > 1,
                    totalItems: totalItem,
                    totalPages: Math.ceil(totalItem / pageSize),
                },
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.BadRequestException('Something wrong when fetching shops');
        }
    }
    async update(dto) {
        const { shopEmail, shopName, shopPhone, shopId } = dto;
        const updateData = {
            ...(shopEmail !== undefined && { shop_email: shopEmail }),
            ...(shopName !== undefined && { shop_name: shopName }),
            ...(shopPhone !== undefined && { shop_phone: shopPhone }),
        };
        return await this.shopRepository.update(shopId, updateData);
    }
};
exports.ShopService = ShopService;
exports.ShopService = ShopService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(shop_entity_1.ShopEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        token_service_1.TokenService])
], ShopService);
