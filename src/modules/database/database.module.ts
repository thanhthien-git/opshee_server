import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG, CONFIG_DATABASE } from '../../config/config';
import { ShopEntity } from '../../models/entities/shop.entity';
import { UserEntity } from '../../models/entities/user.entity';

const ENTITIES = [UserEntity, ShopEntity];
@Global()
@Module({
  imports: [
    //connect database
    CONFIG_DATABASE.load_env,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: CONFIG.database.postgres,
      entities: [...ENTITIES],
      autoLoadEntities: true,
      ssl: { rejectUnauthorized: false },
    }),
    MongooseModule.forRoot(CONFIG.database.mongo),
  ],
})
export class DatabaseModule {}
