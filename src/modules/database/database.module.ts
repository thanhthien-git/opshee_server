import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONFIG_DATABASE } from 'src/config/config';

@Global()
@Module({
  imports: [
    //connect database
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: { rejectUnauthorized: false },
    }),
    CONFIG_DATABASE.load_env,
    MongooseModule.forRoot(process.env.MONGODB_URL),
  ],
})
export class DatabaseModule {}
