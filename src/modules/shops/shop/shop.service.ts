import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginatedResponse } from 'src/interface/paginated-response';
import { ShopEntity } from 'src/models/entities/shop.entity';
import { Like, Repository, UpdateResult } from 'typeorm';
import { ShopUpdateDto } from '../dto/update.dto';

@Injectable()
export class ShopService {
  constructor(private shopRepository: Repository<ShopEntity>) {}

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
