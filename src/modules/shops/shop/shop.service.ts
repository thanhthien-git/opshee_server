import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PaginatedResponse } from '../../../interface/paginated-response';
import { ShopEntity } from '../../../models/entities/shop.entity';
import { Like, QueryFailedError, Repository, UpdateResult } from 'typeorm';
import { ShopUpdateDto } from '../dto/update.dto';
import { ERROR_AUTH, ERROR_MESSAGE } from '../../../constants/message';
import { BcryptService } from '../../../modules/bcrypt/brcypt.service';
import { JwtPayload } from '../../../interface/jwt-payload';
import { ROLE } from '../../../constants/role';
import { ShopLoginDTO } from '../dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from '../../../modules/token/token.service';
import { SHOP_TYPE } from '../../../enum/shop-type.enum';
import { ShopRegisterDto } from '../dto/sign-up.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async findByPhone(phone: string) {
    return await this.shopRepository.findOne({
      where: {
        is_Deleted: false,
        shop_phone: phone,
      },
    });
  }

  async register(data: ShopRegisterDto): Promise<boolean> {
    const { shop_name, shop_password, shop_phone, shop_email } = data;
    const hashedPassword = await BcryptService.encryptString(shop_password);
    const current: ShopEntity = {
      shop_name: shop_name,
      shop_email: shop_email,
      shop_password: hashedPassword,
      shop_type: SHOP_TYPE.NONE,
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
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code === '23505') {
        throw new ConflictException(ERROR_AUTH.EXISTED('Tài khoản'));
      }
      throw err;
    }
  }

  async login(data: ShopLoginDTO): Promise<string> {
    const { shop_phone, shop_password } = data;

    const shop = await this.shopRepository.findOne({
      where: { shop_phone: shop_phone },
      select: ['shop_id', 'shop_password', 'shop_name'],
    });

    if (!shop) {
      throw new BadRequestException({ message: ERROR_MESSAGE.USER_NOT_FOUND });
    }
    const isMatch = await BcryptService.comparePassword(
      shop_password,
      shop.shop_password,
    );

    if (!isMatch) {
      throw new BadRequestException({ message: ERROR_MESSAGE.WRONG_PASSWORD });
    }

    const payload: JwtPayload = {
      userId: shop.shop_id,
      userEmail: shop.shop_name,
      role: ROLE.SHOP,
    };
    return this.tokenService.generateToken(payload);
  }

  async getShopByName(
    name: string,
    page = 1,
    pageSize = 10,
  ): Promise<PaginatedResponse<ShopEntity>> {
    try {
      const [shops, totalItem] = await this.shopRepository.findAndCount({
        where: {
          is_Deleted: false,
          shop_name: Like(`%${name}`),
        },
        skip: page * pageSize - 1,
        take: pageSize, // maximum entities taken
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
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Something wrong when fetching shops');
    }
  }

  async update(dto: ShopUpdateDto): Promise<UpdateResult> {
    const { shopEmail, shopName, shopPhone, shopId } = dto;

    const updateData = {
      ...(shopEmail !== undefined && { shop_email: shopEmail }),
      ...(shopName !== undefined && { shop_name: shopName }),
      ...(shopPhone !== undefined && { shop_phone: shopPhone }),
    };

    return await this.shopRepository.update(shopId, updateData);
  }
}
